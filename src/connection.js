const { Client } = require('pg')

const client = new Client({
  user: 'tms',
  database: 'tms_db',
  password: 'secret',
  host: 'localhost',
  port: 5432
})

module.exports = async () => {
  await client.connect()
  const res = await client.query('SELECT $1::text as message', [
    'Database connected'
  ])
  console.log(res.rows[0].message) // Hello world!

  return client
}
