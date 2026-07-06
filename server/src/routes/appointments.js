import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

export const appointmentsRouter = Router();
appointmentsRouter.use(requireAuth);

const SELECT_FULL = `
  SELECT
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
`;

function mapRow(row) {
  return {
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
      id: row.client_id,
      name: row.client_name,
      email: row.client_email,
      phone: row.client_phone,
      avatar_url: row.client_avatar_url,
      role: row.client_role,
      created_at: row.client_created_at,
      updated_at: row.client_updated_at,
    },
    consultant: {
      id: row.c_id,
      user_id: row.c_user_id,
      specialization: row.c_specialization,
      bio: row.c_bio,
      experience_years: row.c_experience_years,
      rating: Number(row.c_rating),
      hourly_rate: Number(row.c_hourly_rate),
      availability: typeof row.c_availability === 'string' ? JSON.parse(row.c_availability) : row.c_availability,
      verified: !!row.c_verified,
      created_at: row.c_created_at,
      user: {
        id: row.c_user_id,
        name: row.consultant_user_name,
        email: row.consultant_user_email,
        phone: row.consultant_user_phone,
        avatar_url: row.consultant_user_avatar_url,
        role: row.consultant_user_role,
        created_at: row.consultant_user_created_at,
        updated_at: row.consultant_user_updated_at,
      },
    },
    service: {
      id: row.s_id,
      title: row.s_title,
      description: row.s_description,
      category: row.s_category,
      price: Number(row.s_price),
      icon: row.s_icon,
      duration_minutes: row.s_duration_minutes,
      active: !!row.s_active,
      created_at: row.s_created_at,
    },
  };
}

appointmentsRouter.get('/', async (req, res) => {
  const [consultantRows] = await pool.query('SELECT id FROM consultants WHERE user_id = ?', [req.userId]);
  const consultantId = consultantRows[0]?.id;

  const clauses = consultantId
    ? 'a.client_id = ? OR a.consultant_id = ?'
    : 'a.client_id = ?';
  const params = consultantId ? [req.userId, consultantId] : [req.userId];

  const [rows] = await pool.query(
    `${SELECT_FULL} WHERE ${clauses} ORDER BY a.scheduled_date DESC, a.scheduled_time DESC`,
    params
  );
  res.json({ data: rows.map(mapRow) });
});

appointmentsRouter.post('/', async (req, res) => {
  const { consultant_id, service_id, scheduled_date, scheduled_time, notes } = req.body;

  if (!consultant_id || !service_id || !scheduled_date || !scheduled_time) {
    return res.status(400).json({ error: 'consultant_id, service_id, scheduled_date and scheduled_time are required' });
  }

  const id = uuid();
  await pool.query(
    `INSERT INTO appointments (id, client_id, consultant_id, service_id, scheduled_date, scheduled_time, notes, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [id, req.userId, consultant_id, service_id, scheduled_date, scheduled_time, notes || null]
  );

  const [rows] = await pool.query(`${SELECT_FULL} WHERE a.id = ?`, [id]);
  res.status(201).json({ data: mapRow(rows[0]) });
});

appointmentsRouter.patch('/:id', async (req, res) => {
  const [existingRows] = await pool.query(
    'SELECT client_id, consultant_id FROM appointments WHERE id = ?',
    [req.params.id]
  );
  const appointment = existingRows[0];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  const [consultantRows] = await pool.query('SELECT id FROM consultants WHERE user_id = ?', [req.userId]);
  const consultantId = consultantRows[0]?.id;
  const isOwner = appointment.client_id === req.userId || appointment.consultant_id === consultantId;
  if (!isOwner) {
    return res.status(403).json({ error: 'You do not have access to this appointment' });
  }

  const allowed = ['status', 'notes', 'meeting_link', 'scheduled_date', 'scheduled_time'];
  const updates = [];
  const values = [];

  for (const key of allowed) {
    if (req.body[key] !== undefined && req.body[key] !== null) {
      updates.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(req.params.id);
  await pool.query(`UPDATE appointments SET ${updates.join(', ')} WHERE id = ?`, values);

  const [rows] = await pool.query(`${SELECT_FULL} WHERE a.id = ?`, [req.params.id]);
  res.json({ data: rows[0] ? mapRow(rows[0]) : null });
});
