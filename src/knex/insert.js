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

async function main(db) {
  const result = await db('accounts').insert({
    username: 'Great Gatsby',
    password: 'Secret Gatsby',
    email: 'hello@mail.com'
  })
  console.log(result)
  await db.destroy()
}

main(postgres)
