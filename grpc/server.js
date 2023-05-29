const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const { PROTO_PATH } = require('./constants')
const { paySalary } = require('./rpc/pay-salary')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const server = new grpc.Server()

const { Employee } = grpc.loadPackageDefinition(packageDefinition).employee

server.addService(Employee.service, {
    paySalary,
})

server.bindAsync('127.0.0.1:4000', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err)
    }
    server.start()
    console.log(`Server started on 127.0.0.1:${port}`)
})
