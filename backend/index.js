const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors');
const app = express();
const port=5000;


app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'custdb',
  password: 'asma99',
  port: 5432
});

app.get('/allemp', async (req, res)=>{
  try{
    const result=await pool.query('select * from employee');
   // res.json({status:"200",employeeList:result.rows});
    res.json(result.rows);
  }catch(err){
    console.error(err.message);
    res.status(500).send('server Error');
  }
});



// Register new user and hash the password
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into the database
    const result = await pool.query(
      'INSERT INTO user_login (username,email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    res.json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login and compare password
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM user_login WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Login failed. Check your credentials.' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Login failed. Check your credentials.' });
    }

    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.use(bodyParser.json());
app.post("/api/feedback/add", async (req, res) => {
  console.log("Request body:", req.body); // Debugging line
  const { feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ message: "Feedback text is required." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO feedback (feedback_text) VALUES ($1) RETURNING *",
      [feedback]
    );
    res.json({ message: "Feedback added successfully!", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.put("/api/feedback/edit", async (req, res) => {
  console.log("Request body:", req.body); // Debugging line
  const { id, feedback } = req.body;
  if (!id || !feedback) {
    return res.status(400).json({ message: "ID and Feedback are required." });
  }
  try {
    const result = await pool.query(
      "UPDATE feedback SET feedback_text = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [feedback, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.json({ message: "Feedback updated successfully!", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.delete("/api/feedback/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM feedback WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    res.json({ message: "Feedback deleted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
