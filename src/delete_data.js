const getConnection = require('./connection')

async function main() {
  const connection = await getConnection()

  await connection.query(`
    DELETE FROM accounts
    WHERE username = 'Nikitos';
  `)
  await connection.end()
}

main()
