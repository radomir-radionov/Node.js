const { Router } = require('express')
const userController = require('../../controllers/user-controller')

const router = new Router()

const todoAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Error('Unauthorized'))
  }
  next()
}

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns list of users
 *     description: Returns list of users with some data.
 *     operationId: getUsers
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Max count of users
 *         required: false
 *         schema:
 *           type: number
 *       - name: offset
 *         in: query
 *         description: Max count of users
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successful request with list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - user_id
 *                   - name
 *                   - status
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 */
router.get('/', userController.getUsers)
router.post('/', todoAuth, userController.createUser)

module.exports = router
