module.exports = {
    getProfile({ username }) {
        console.log('username: ', username)
        return {
            username,
            age: 32,
            status: 'married',
        }
    },
    updateProfile({ username }) {
        console.log('updateProfile: ', username)
    },
}