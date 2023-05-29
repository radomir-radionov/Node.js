const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const { PROTO_PATH } = require('./constants')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const paymentProto = grpc.loadPackageDefinition(packageDefinition).employee

const client = new paymentProto.Employee('127.0.0.1:4000', grpc.credentials.createInsecure())

client.paySalary({ employeeIdList: [1, 3] } , (err, response) => {
    if (err) {
        console.error(err)
        return
    }
    
    console.log(response)
})
