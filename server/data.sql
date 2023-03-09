CREATE DATABASE bloom;

-- orders and plants have a many to many relationship
-- orders and users have a one to many relationship
-- many to one relationship between cart_item and order, cart_item and plant, cart_item and user

-- STATIC data
  -- plants table
  -- user table

-- SESSION data
  -- shopping_session table
  -- cart_item table

-- PROCESSED data
  -- order_details table
  -- order_items table

-- users table
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255),
  isAdmin BOOLEAN DEFAULT false,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);

-- plants table
CREATE TABLE plants (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) DEFAULT 'Outdoor' CHECK (location IN ('Outdoor', 'Indoor')),
  care VARCHAR(255) DEFAULT 'Moderate' CHECK (care IN ('Moderate', 'Easy', 'No-Fuss')),
  imgUrl VARCHAR(255) DEFAULT 'https://www.iconpacks.net/icons/2/free-plant-icon-1573-thumb.png',
  inventory INTEGER DEFAULT 0
);

-- orders table
-- CREATE TABLE orders (
--   id VARCHAR(255) PRIMARY KEY,
--   plantId VARCHAR(255) NOT NULL,
--   price INTEGER NOT NULL,
--   quantity INTEGER NOT NULL,
--   userId VARCHAR(255) NOT NULL,
--   date DATE,
--   total INTEGER,
--   isComplete BOOLEAN,
--   FOREIGN KEY (plantId) REFERENCES plants(id),
--   FOREIGN KEY (userId) REFERENCES users(email)
-- );

-- order details table
-- CREATE TABLE order_details (
--   id SERIAL PRIMARY KEY,
--   orderId VARCHAR(255) NOT NULL,
--   plantId VARCHAR(255) NOT NULL,
--   FOREIGN KEY (orderId) REFERENCES orders(id),
--   FOREIGN KEY (plantId) REFERENCES plants(id)
-- );


-- cart items table
CREATE TABLE cart_items (
  id VARCHAR(255) PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  purchaseStatus VARCHAR(10) NOT NULL CHECK (purchaseStatus IN ('cart', 'favorite', 'later', 'purchased')) DEFAULT 'cart',
  price INTEGER DEFAULT NULL,
  orderId VARCHAR(255),
  plantId VARCHAR(255),
  userId VARCHAR(255),
  sessionId INTEGER,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (plantId) REFERENCES plants(id),
  FOREIGN KEY (userId) REFERENCES users(email),
  FOREIGN KEY (sessionId) REFERENCES shopping_session(id)
);

-- shopping session table
CREATE TABLE shopping_session (
  id SERIAL PRIMARY KEY,
  userId VARCHAR(255),
  total DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(email),
  FOREIGN KEY (id) REFERENCES cart_items(sessionId)
);
