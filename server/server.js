const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// ----------------------PLANTS-------------------------->>
// GET all plants
app.get('/plants', async (req, res) => {
  try {
    const plants = await pool.query('SELECT * FROM plants')
    res.json(plants.rows)
  } catch (err) {
    console.error(err)
  }
});

// GET a single plant
app.get('/plants/:plantId', async (req, res) => {
  const { plantId } = req.params
  try {
    const plants = await pool.query('SELECT * FROM plants WHERE id = $1', [plantId])
    res.json(plants.rows)
  } catch (err) {
    console.error(err)
  }
});

// CREATE a plant
app.post('/plants', async(req, res) => {
  const { name, price, description, location, care, imgurl, inventory } = req.body
  const id = uuidv4()
  try {
    const newPlant = await pool.query(`INSERT INTO plants(id, name, price, description, location, care, imgurl, inventory) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, name, price, description, location, care, imgurl, inventory])
    res.json(newPlant)
  } catch (err) {
    console.error(err)
  }
});

// UPDATE a plant
app.put('/plants/:plantId', async (req, res) => {
  const { plantId } = req.params
  const { name, price, description, location, care, imgurl, inventory } = req.body
  try {
    const editPlant =
      await pool.query('UPDATE plants SET name = $1, price = $2, description = $3, location = $4, care = $5, imgurl = $6, inventory = $7 WHERE id = $8;',
      [name, price, description, location, care, imgurl, inventory, plantId])
    res.json(editPlant)
  } catch (err) {
    console.error(err)
  }
});

// DELETE a plant
app.delete('/plants/:plantId', async (req, res) => {
  const { plantId } = req.params
  try {
    const deletePlant = await pool.query('DELETE FROM plants WHERE id = $1;', [plantId])
    res.json(deletePlant)
  } catch (err) {
    console.error(err)
  }
});

// ----------------------ORDERS-------------------------->>
// GET all orders for a user
app.get('/orders/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail
  try {
    const orders = await pool.query('SELECT * FROM orders WHERE userid = $1', [userEmail])
    res.json(orders.rows)
  } catch (err) {
    console.error(err)
  }
});

// GET a single order
app.get('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId
  try {
    const orders = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId])
    res.json(orders.rows)
  } catch (err) {
    console.error(err)
  }
});

// CREATE an order
app.post('/orders', async(req, res) => {
  const { plantid, price, quantity, userid, date, total, iscomplete } = req.body
  const id = uuidv4()
  try {
    const newOrder = await pool.query(`INSERT INTO todos(id, plantid, price, quantity, userid, date, total, iscomplete) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, plantid, price, quantity, userid, date, total, iscomplete])
    res.json(newOrder)
  } catch (err) {
    console.error(err)
  }
})

// ----------------SHOPPING SESSION--------------------->>
// display all shopping sessions
app.get('/sessions', async(req, res) => {
  try {
    const sessions = await pool.query('SELECT * FROM shopping_session')
    res.json(sessions.rows)
  } catch (err) {
    console.error(err)
  }
})

// GET a session from userEmail
app.get('/sessions/auth/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const session = await pool.query('SELECT * FROM shopping_session WHERE userId = $1', [userId])
    res.json(session.rows)
  } catch (err) {
    console.error(err)
  }
});

// GET a session from cookie
app.get('/sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params
  try {
    const session = await pool.query('SELECT * FROM shopping_session WHERE id = $1', [sessionId])
    res.json(session.rows)
  } catch (err) {
    console.error(err)
  }
});

// CREATE a shopping session
app.post('/sessions', async(req, res) => {
  const { userId, total } = req.body
  try {
    const newSession = await pool.query(`INSERT INTO shopping_session(userId, total) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, total])
    res.json(newSession)
  } catch (err) {
    console.error(err)
  }
});




// ----------------------CARTS-------------------------->>
// display cart (all cart_items belonging to :userId)
app.get('/cart/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail
  try {
    const orders = await pool.query('SELECT * FROM cart_items WHERE userid = $1', [userEmail])
    res.json(orders.rows)
  } catch (err) {
    console.error(err)
  }
});





















// ------------------------------------------------------------------------->>>

// GET all todos
app.get('/todos/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    res.json(todos.rows)
  } catch (err) {
    console.error(err)
  }
})

// create a todo
app.post('/todos', async(req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuidv4()
  try {
    const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date])
    res.json(newToDo)
  } catch (err) {
    console.error(err)
  }
})

// edit a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { user_email, title, progress, date } = req.body
  try {
    const editToDo =
      await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
      [user_email, title, progress, date, id])
    res.json(editToDo)
  } catch (err) {
    console.error(err)
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
    res.json(deleteToDo)
  } catch (err) {
    console.error(err)
  }
})

// signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword])

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

    res.json({ email, token })
  } catch (err) {
    console.error(err)
    if (err) {
      res.json({ detail: err.detail})
    }
  }
})


// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!users.rows.length) return res.json({ detail: 'User does not exist!' })

    const success = await bcrypt.compare(password, users.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

    if (success) {
      res.json({ 'email' : users.rows[0].email, token})
    } else {
      res.json({ detail: "Login failed"})
    }
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))
