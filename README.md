DATABASE SCHEMA

CREATE TYPE user_role AS ENUM ('ADMIN', 'USER', 'STORE_OWNER');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  address VARCHAR(400),
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
  
);


CREATE TABLE stores(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(400) NOT NULL,
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  CONSTRAINT fk_store_owner
  FOREIGN KEY (owner_id)
  REFERENCES users(id)
  ON DELETE CASCADE
);


CREATE TABLE ratings(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  CONSTRAINT fk_rating_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_rating_store
        FOREIGN KEY (store_id)
        REFERENCES stores(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_store_rating
        UNIQUE (user_id, store_id)
);


run create-admin.js script on the backend first. Then login as admin

admin tasks:
1. Can add new user with any role. 
2. Can add new store
3. View all users with their details

normal user tasks:
1. Can signup, login
2. Rate the store
3. View all stores
4. Update the password

store owner tasks:
1. Can the store's details with total ratings and average rating 
2. Can update its password.


environment variables

PORT
DATABASE_URL
FRONTEND_URL
JWT_SECRET