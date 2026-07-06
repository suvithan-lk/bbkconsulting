import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import { signToken, requireAuth } from '../auth.js';

export const authRouter = Router();

const DEFAULT_AVAILABILITY = {
  monday: { start: '09:00', end: '17:00', available: true },
  tuesday: { start: '09:00', end: '17:00', available: true },
  wednesday: { start: '09:00', end: '17:00', available: true },
  thursday: { start: '09:00', end: '17:00', available: true },
  friday: { start: '09:00', end: '17:00', available: true },
  saturday: { available: false },
  sunday: { available: false },
};

function publicUser(row) {
  if (!row) return null;
  const { password_hash, ...rest } = row;
  return rest;
}

authRouter.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const id = uuid();
  const passwordHash = await bcrypt.hash(password, 10);
  const finalRole = role === 'consultant' ? 'consultant' : 'client';

  await pool.query(
    'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    [id, name, email, passwordHash, finalRole]
  );

  if (finalRole === 'consultant') {
    await pool.query(
      `INSERT INTO consultants (id, user_id, specialization, bio, hourly_rate, experience_years, availability, verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuid(), id, 'General Consulting', '', 100, 0, JSON.stringify(DEFAULT_AVAILABILITY), false]
    );
  }

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  const token = signToken(id);
  res.status(201).json({ token, user: publicUser(rows[0]) });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken(user.id);
  res.json({ token, user: publicUser(user) });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId]);
  if (!rows[0]) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: publicUser(rows[0]) });
});

authRouter.patch('/me', requireAuth, async (req, res) => {
  const allowed = ['name', 'phone', 'avatar_url'];
  const updates = [];
  const values = [];

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      updates.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(req.userId);
  await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId]);
  res.json({ user: publicUser(rows[0]) });
});
