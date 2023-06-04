const knex = require('knex')

const postgres = knex({
  client: 'pg',
  version: '14.3',
  debug: true,
  connection: {
    user: 'tms',
    database: 'tms_db',
    password: 'secret',
    host: 'localhost',
    port: 5432
  }
})

const shouldCheckUserId = false

async function main(db) {
  const query = db
    .select('user_id', 'username', 'password')
    .from('accounts')
    .where('username', 'Valera')
    .andWhere('user_id', 1)

  const users = await query
  console.log(users)
  await db.destroy()
}

main(postgres)
