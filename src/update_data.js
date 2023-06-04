const getConnection = require('./connection')

async function main() {
  const connection = await getConnection()

  await connection.query(`
    UPDATE accounts  
    SET
        username = 'Nikitos',
        email = 'nikitos@gmail.com'
    WHERE username = 'Nikita' AND email = 'nikita@email.com';
  `)
  await connection.end()
}

main()
