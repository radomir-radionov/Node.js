const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getList = async ({ limit = 50 }) => {
  return prisma.product.findMany({
    take: limit,
  })
}

exports.addProduct = async (data) => {
  return prisma.product.create({
    data,
  })
}
