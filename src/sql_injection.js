const getConnection = require('./connection')

function escapeSQL(sql, args = []) {
  args.forEach((arg, index) => {
    const substitutionStr = `$${index + 1}` // $1

    if (sql.includes(substitutionStr)) {
      sql = sql.replace(substitutionStr, `'${arg}'`)
    }
  })
  return sql
}

async function main(userName, email) {
  const connection = await getConnection()
  const rawSql = `
    SELECT *  
    FROM accounts
    WHERE username = $1
    AND email = $2;
  `
  const substitutionArgs = [userName, email]
  const cleanSql = escapeSQL(rawSql, substitutionArgs)
  const result = await connection.query(cleanSql)
  console.log(result.rows)
  await connection.end()
}

// main(`'Alina' OR 1=1`)
main('Nikita1', 'nikita1@email.com')
