const getConnection = require('./connection')

const shouldCheckUserId = true

async function main() {
  const connection = await getConnection()

  const result = await connection.query(`
    SELECT user_id, username, password, email  
    FROM accounts
    WHERE username = 'Nikita1' ${shouldCheckUserId ? 'AND user_id = 6' : ''} ;
  `)
  console.log(result.rows)
  await connection.end()
}

main()

// WHERE username = 'Nikita' AND email = 'nikita@email.com';
