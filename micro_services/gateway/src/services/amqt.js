const amqplib = require('amqplib')
const { Buffer } = require('buffer')

module.exports = async () => {
  try {
    const queue = 'tasks'
    const conn = await amqplib.connect('amqp://message_broker:5672')

    // Sender
    const channel = await conn.createChannel()

    setInterval(() => {
      const data = {
        type: 'hello',
        payload: {
          name: 'Nikita',
          date: new Date().toISOString()
        }
      }

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
    }, 1000)
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
