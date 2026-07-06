import { Router } from 'express';
import { pool } from '../db.js';

export const reviewsRouter = Router();

reviewsRouter.get('/', async (req, res) => {
  const { consultant_id } = req.query;
  if (!consultant_id) {
    return res.status(400).json({ error: 'consultant_id is required' });
  }

  const [rows] = await pool.query(
    `SELECT r.*, u.name AS client_name, u.avatar_url AS client_avatar_url
     FROM reviews r
     JOIN users u ON u.id = r.client_id
     WHERE r.consultant_id = ?
     ORDER BY r.created_at DESC
     LIMIT 5`,
    [consultant_id]
  );

  res.json({
    data: rows.map((row) => ({
      id: row.id,
      appointment_id: row.appointment_id,
      client_id: row.client_id,
      consultant_id: row.consultant_id,
      rating: row.rating,
      comment: row.comment,
      created_at: row.created_at,
      client: { name: row.client_name, avatar_url: row.client_avatar_url },
    })),
  });
});
