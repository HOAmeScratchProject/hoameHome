CREATE TABLE IF NOT users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street_address VARCHAR(100) NOT NULL,
    phone_number INTEGER UNIQUE,
    role VARCHAR (50),
    email VARCHAR(100) UNIQUE NOT NULL,
     );

      CREATE TABLE IF NOT user_type (
    id SERIAL PRIMARY KEY,
    admin BOOLEAN DEFAULT FALSE,
    owner BOOLEAN DEFAULT FALSE,
    board BOOLEAN DEFAULT FALSE,
    arc BOOLEAN DEFAULT FALSE,
    roads BOOLEAN DEFAULT FALSE,
     );

     CREATE TABLE IF NOT files (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(100) NOT NULL,
    file_date BYTEA  NOT NULL, 
    file_size INTEGER NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     