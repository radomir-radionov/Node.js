const amqplib = require('amqplib')
const { Buffer } = require('buffer')

module.exports = async () => {
  // const retryOptions = {
  //   retries: 10,
  //   delay: 1000 // milliseconds
  // }

  try {
    const queue = 'tasks'
    // const conn = await connectWithRetry('amqp://message_broker:5672', retryOptions)
    const conn = await amqplib.connect('amqp://message_broker:5672')

    const channel = await conn.createChannel()
    await channel.assertQueue(queue)

    // Listener
    channel.consume(queue, (msg) => {
      if (msg) {
        const rawData = msg.content.toString('utf-8')
        console.log(JSON.parse(rawData))
        channel.ack(msg)
      } else {
        console.log('Consumer cancelled by server')
      }
    })
  } catch (e) {
    console.log(e)
  }
}

// solve: rabbitmq run before gateway
// async function connectWithRetry(url, options) {
//   let retries = options.retries
//   let delay = options.delay
//   let lastError

//   while (retries > 0) {
//     try {
//       const conn = await amqplib.connect(url)
//       return conn
//     } catch (error) {
//       lastError = error
//       console.log(`Connection failed. Retries left: ${retries}`)
//       await sleep(delay)
//       retries--
//     }
//   }

//   throw lastError
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }
