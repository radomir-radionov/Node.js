const { get } = require('lodash')
const { Sequelize } = require('sequelize')
const { Pets, User, sequelize } = require('../services/db/models')

exports.createPet = async (req, res) => {
  const { owner_id, ...params } = req.body
  const user = await User.findOne({
    attributes: ['id', 'firstName'],
    where: { id: owner_id }
  })
  console.log('user', user)
  const pet = await Pets.create(params)
  console.log('pet', pet)
  await user.addPet(pet)
  res.send(pet)
}

exports.sellPet = async (req, res) => {
  const { seller_id, buyer_id, pet_name } = req.body
  const [seller, buyer] = await Promise.all([
    User.findOne({
      where: {
        id: seller_id
      },
      include: {
        model: Pet,
        where: {
          name: pet_name
        }
      }
    }),
    User.findOne({
      where: {
        id: buyer_id
      }
    })
  ])
  const pet = get(seller, 'Pets[0]', null)
  if (!pet) {
    return res.send({
      error: 'Петомец не найден'
    })
  }

  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE
  })

  try {
    buyer.balance = buyer.balance - pet.price
    await buyer.save({ transaction })
    await buyer.addPet(pet, { transaction })
    seller.balance = seller.balance + pet.price
    await seller.save({ transaction })
    await seller.removePet(pet, { transaction })
    // SEND EMAIL ->
    await transaction.commit()
    res.send(pet)
  } catch (err) {
    await transaction.rollback()
    console.error(err)
    res.send({
      error: 'Произошла ошибка, транзакция откачена.'
    })
  }
}
