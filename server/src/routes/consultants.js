import { Router } from 'express';
import { pool } from '../db.js';

export const consultantsRouter = Router();

function mapConsultantRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    specialization: row.specialization,
    bio: row.bio,
    experience_years: row.experience_years,
    rating: Number(row.rating),
    hourly_rate: Number(row.hourly_rate),
    availability: typeof row.availability === 'string' ? JSON.parse(row.availability) : row.availability,
    verified: !!row.verified,
    created_at: row.created_at,
    user: {
      id: row.user_id,
      name: row.user_name,
      email: row.user_email,
      phone: row.user_phone,
      avatar_url: row.user_avatar_url,
      role: row.user_role,
      created_at: row.user_created_at,
      updated_at: row.user_updated_at,
    },
  };
}

const SELECT_WITH_USER = `
  SELECT c.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
         u.avatar_url AS user_avatar_url, u.role AS user_role,
         u.created_at AS user_created_at, u.updated_at AS user_updated_at
  FROM consultants c
  JOIN users u ON u.id = c.user_id
`;

consultantsRouter.get('/', async (req, res) => {
  const { spec, search, sort, verified } = req.query;
  const clauses = [];
  const params = [];

  if (verified !== 'false') {
    clauses.push('c.verified = true');
  }
  if (spec && spec !== 'All') {
    clauses.push('c.specialization = ?');
    params.push(spec);
  }
  if (search) {
    clauses.push('(c.specialization LIKE ? OR c.bio LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  let orderBy = 'c.rating DESC';
  if (sort === 'experience') orderBy = 'c.experience_years DESC';
  else if (sort === 'price') orderBy = 'c.hourly_rate ASC';

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const [rows] = await pool.query(`${SELECT_WITH_USER} ${where} ORDER BY ${orderBy}`, params);
  res.json({ data: rows.map(mapConsultantRow) });
});

consultantsRouter.get('/:id', async (req, res) => {
  const [rows] = await pool.query(`${SELECT_WITH_USER} WHERE c.id = ?`, [req.params.id]);
  res.json({ data: rows[0] ? mapConsultantRow(rows[0]) : null });
});
