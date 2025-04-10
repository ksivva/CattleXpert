
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create tables if they don't exist
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS dairies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cattle_count INTEGER DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS animals (
        id SERIAL PRIMARY KEY,
        eid VARCHAR(255) NOT NULL,
        visual_tag VARCHAR(255),
        gender VARCHAR(50),
        dam_breed VARCHAR(100),
        sire_breed VARCHAR(100),
        colostrum BOOLEAN,
        dairy_id INTEGER REFERENCES dairies(id)
      );
    `);
  } finally {
    client.release();
  }
}

initDb().catch(console.error);

// Routes
app.get('/api/dairies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dairies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/animals/:dairyId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM animals WHERE dairy_id = $1',
      [req.params.dairyId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/animals', async (req, res) => {
  const { eid, visual_tag, gender, dam_breed, sire_breed, colostrum, dairy_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO animals (eid, visual_tag, gender, dam_breed, sire_breed, colostrum, dairy_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [eid, visual_tag, gender, dam_breed, sire_breed, colostrum, dairy_id]
    );
    await pool.query(
      'UPDATE dairies SET cattle_count = cattle_count + 1 WHERE id = $1',
      [dairy_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
