import { Router } from 'express';
import { pool } from '../db.js';

export const servicesRouter = Router();

function mapService(row) {
  return { ...row, price: Number(row.price), active: !!row.active };
}

servicesRouter.get('/', async (req, res) => {
  const { category, search, sort } = req.query;
  const clauses = ['active = true'];
  const params = [];

  if (category && category !== 'All') {
    clauses.push('category = ?');
    params.push(category);
  }
  if (search) {
    clauses.push('(title LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  let orderBy = 'title ASC';
  if (sort === 'price_asc') orderBy = 'price ASC';
  else if (sort === 'price_desc') orderBy = 'price DESC';

  const [rows] = await pool.query(
    `SELECT * FROM services WHERE ${clauses.join(' AND ')} ORDER BY ${orderBy}`,
    params
  );
  res.json({ data: rows.map(mapService) });
});

servicesRouter.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
  res.json({ data: rows[0] ? mapService(rows[0]) : null });
});
