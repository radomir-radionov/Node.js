const { get } = require('lodash')
const { Pet, User, sequelize } = require('../services/db')

exports.createPet = async (req, res) => {
  const { owner_id, ...params } = req.body
  const user = await User.findOne({
    where: { id: owner_id }
  })

  console.log(user)
  const pet = await Pet.create(params)
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

  const transaction = await sequelize.transaction()

  try {
    buyer.balance -= pet.price
    await buyer.save({ transaction })

    seller.balance += pet.price
    await seller.save({ transaction })

    await buyer.removePet(pet, { transaction })
    await buyer.addPet(pet, { transaction })
    // await buyer.addBar(pet, { transaction }) - error code example
    await transaction.commit()
    res.send(pet)
  } catch (err) {
    await transaction.rollback()
    console.error(err)
    res.send({
      error: 'Произошла ошибка, транзакция отказана'
    })
  }
}
