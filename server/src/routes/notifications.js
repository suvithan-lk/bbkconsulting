import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

export const notificationsRouter = Router();
notificationsRouter.use(requireAuth);

function mapNotification(row) {
  return {
    ...row,
    read: !!row.read,
    data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
  };
}

notificationsRouter.get('/', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [req.userId]
  );
  res.json({ data: rows.map(mapNotification) });
});

notificationsRouter.patch('/:id/read', async (req, res) => {
  await pool.query('UPDATE notifications SET `read` = true WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ ok: true });
});

notificationsRouter.patch('/read-all', async (req, res) => {
  await pool.query('UPDATE notifications SET `read` = true WHERE user_id = ? AND `read` = false', [req.userId]);
  res.json({ ok: true });
});
