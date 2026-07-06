import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

export const messagesRouter = Router();
messagesRouter.use(requireAuth);

function mapMessage(row) {
  return {
    id: row.id,
    appointment_id: row.appointment_id,
    sender_id: row.sender_id,
    receiver_id: row.receiver_id,
    content: row.content,
    file_url: row.file_url,
    read: !!row.read,
    created_at: row.created_at,
    sender: {
      id: row.sender_id,
      name: row.sender_name,
      email: row.sender_email,
      phone: row.sender_phone,
      avatar_url: row.sender_avatar_url,
      role: row.sender_role,
      created_at: row.sender_created_at,
      updated_at: row.sender_updated_at,
    },
  };
}

const SELECT_WITH_SENDER = `
  SELECT m.*, u.name AS sender_name, u.email AS sender_email, u.phone AS sender_phone,
         u.avatar_url AS sender_avatar_url, u.role AS sender_role,
         u.created_at AS sender_created_at, u.updated_at AS sender_updated_at
  FROM messages m
  JOIN users u ON u.id = m.sender_id
`;

messagesRouter.get('/conversations', async (req, res) => {
  const [consultantRows] = await pool.query('SELECT id FROM consultants WHERE user_id = ?', [req.userId]);
  const consultantId = consultantRows[0]?.id;

  const clauses = consultantId ? 'a.client_id = ? OR a.consultant_id = ?' : 'a.client_id = ?';
  const params = consultantId ? [req.userId, consultantId] : [req.userId];

  const [appointments] = await pool.query(
    `SELECT
      a.*,
      cu.name AS client_name, cu.email AS client_email, cu.phone AS client_phone,
      cu.avatar_url AS client_avatar_url, cu.role AS client_role,
      cu.created_at AS client_created_at, cu.updated_at AS client_updated_at,
      c.id AS c_id, c.user_id AS c_user_id, c.specialization AS c_specialization, c.bio AS c_bio,
      c.experience_years AS c_experience_years, c.rating AS c_rating, c.hourly_rate AS c_hourly_rate,
      c.availability AS c_availability, c.verified AS c_verified, c.created_at AS c_created_at,
      conu.name AS consultant_user_name, conu.email AS consultant_user_email,
      conu.phone AS consultant_user_phone, conu.avatar_url AS consultant_user_avatar_url,
      conu.role AS consultant_user_role, conu.created_at AS consultant_user_created_at,
      conu.updated_at AS consultant_user_updated_at,
      s.id AS s_id, s.title AS s_title, s.description AS s_description, s.category AS s_category,
      s.price AS s_price, s.icon AS s_icon, s.duration_minutes AS s_duration_minutes,
      s.active AS s_active, s.created_at AS s_created_at
    FROM appointments a
    JOIN users cu ON cu.id = a.client_id
    JOIN consultants c ON c.id = a.consultant_id
    JOIN users conu ON conu.id = c.user_id
    JOIN services s ON s.id = a.service_id
    WHERE ${clauses}
    ORDER BY a.created_at DESC`,
    params
  );

  const conversations = await Promise.all(
    appointments.map(async (row) => {
      const appointment = {
        id: row.id,
        client_id: row.client_id,
        consultant_id: row.consultant_id,
        service_id: row.service_id,
        scheduled_date: row.scheduled_date,
        scheduled_time: row.scheduled_time,
        status: row.status,
        notes: row.notes,
        meeting_link: row.meeting_link,
        created_at: row.created_at,
        updated_at: row.updated_at,
        client: {
          id: row.client_id, name: row.client_name, email: row.client_email, phone: row.client_phone,
          avatar_url: row.client_avatar_url, role: row.client_role,
          created_at: row.client_created_at, updated_at: row.client_updated_at,
        },
        consultant: {
          id: row.c_id, user_id: row.c_user_id, specialization: row.c_specialization, bio: row.c_bio,
          experience_years: row.c_experience_years, rating: Number(row.c_rating), hourly_rate: Number(row.c_hourly_rate),
          availability: typeof row.c_availability === 'string' ? JSON.parse(row.c_availability) : row.c_availability,
          verified: !!row.c_verified, created_at: row.c_created_at,
          user: {
            id: row.c_user_id, name: row.consultant_user_name, email: row.consultant_user_email,
            phone: row.consultant_user_phone, avatar_url: row.consultant_user_avatar_url,
            role: row.consultant_user_role, created_at: row.consultant_user_created_at,
            updated_at: row.consultant_user_updated_at,
          },
        },
        service: {
          id: row.s_id, title: row.s_title, description: row.s_description, category: row.s_category,
          price: Number(row.s_price), icon: row.s_icon, duration_minutes: row.s_duration_minutes,
          active: !!row.s_active, created_at: row.s_created_at,
        },
      };

      const [lastMsgRows] = await pool.query(
        `${SELECT_WITH_SENDER} WHERE m.appointment_id = ? ORDER BY m.created_at DESC LIMIT 1`,
        [appointment.id]
      );
      const [countRows] = await pool.query(
        'SELECT COUNT(*) AS cnt FROM messages WHERE appointment_id = ? AND receiver_id = ? AND `read` = false',
        [appointment.id, req.userId]
      );

      return {
        appointment,
        lastMessage: lastMsgRows[0] ? mapMessage(lastMsgRows[0]) : undefined,
        unreadCount: countRows[0]?.cnt || 0,
      };
    })
  );

  res.json({ data: conversations });
});

messagesRouter.get('/:appointmentId', async (req, res) => {
  const [rows] = await pool.query(
    `${SELECT_WITH_SENDER} WHERE m.appointment_id = ? ORDER BY m.created_at ASC`,
    [req.params.appointmentId]
  );

  await pool.query(
    'UPDATE messages SET `read` = true WHERE appointment_id = ? AND receiver_id = ? AND `read` = false',
    [req.params.appointmentId, req.userId]
  );

  res.json({ data: rows.map(mapMessage) });
});

messagesRouter.post('/', async (req, res) => {
  const { appointment_id, receiver_id, content } = req.body;
  if (!appointment_id || !receiver_id || !content) {
    return res.status(400).json({ error: 'appointment_id, receiver_id and content are required' });
  }

  const id = uuid();
  await pool.query(
    'INSERT INTO messages (id, appointment_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?, ?)',
    [id, appointment_id, req.userId, receiver_id, content]
  );

  await pool.query(
    'INSERT INTO notifications (id, user_id, type, title, content) VALUES (?, ?, ?, ?, ?)',
    [uuid(), receiver_id, 'message', 'New message', content.slice(0, 140)]
  );

  const [rows] = await pool.query(`${SELECT_WITH_SENDER} WHERE m.id = ?`, [id]);
  res.status(201).json({ data: mapMessage(rows[0]) });
});
