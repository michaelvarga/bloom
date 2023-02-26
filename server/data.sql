CREATE DATABASE bloom;

-- orders and plants have a many to many relationship
-- orders and users have a one to many relationship
-- many to one relationship between cart_item and order, cart_item and plant, cart_item and user

-- todos table
CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300)
);

-- users table
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255),
  isAdmin BOOLEAN DEFAULT false,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
)

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
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  plantId VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  userId VARCHAR(255) NOT NULL,
  date DATE,
  total INTEGER,
  isComplete BOOLEAN,
  FOREIGN KEY (plantId) REFERENCES plants(id),
  FOREIGN KEY (userId) REFERENCES users(email)
);

-- order details table
CREATE TABLE order_details (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL,
  plantId VARCHAR(255) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (plantId) REFERENCES plants(id)
);


-- cart items table
CREATE TABLE cart_items (
  id VARCHAR(255) PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  purchaseStatus VARCHAR(10) NOT NULL CHECK (purchaseStatus IN ('cart', 'favorite', 'later', 'purchased')),
  purchaseDate DATE DEFAULT NULL,
  purchasePrice INTEGER DEFAULT NULL,
  orderId VARCHAR(255),
  plantId VARCHAR(255),
  userId VARCHAR(255),
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (plantId) REFERENCES plants(id),
  FOREIGN KEY (userId) REFERENCES users(email)
);
