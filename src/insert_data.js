const getConnection = require('./connection')

async function main() {
  const connection = await getConnection()

  await connection.query(`
    INSERT INTO     
        accounts (username, password, email)
        VALUES ('Valera1', 'secret_top_top', 'valera1@email.com');
    INSERT INTO     
        accounts (username, password, email)
        VALUES ('Nikita1', 'secret_top_pop', 'nikita1@email.com');
  `)

  await connection.end()
}

main()
