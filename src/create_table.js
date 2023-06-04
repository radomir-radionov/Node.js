const getConnection = require('./connection')

async function main() {
  const connection = await getConnection()

  await connection.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
  );`)

  await connection.end()
}

main()
