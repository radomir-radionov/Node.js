const employees = [
    {
        id: '1',
        email: 'abcd@abcd.com',
        firstName: 'Valentina',
        lastName: 'Hello',
    },
    {
        id: '2',
        email: 'xyz@xyz.com',
        firstName: 'Rostislav',
        lastName: 'Hello',
    },
    {
        id: '3',
        email: 'temp@temp.com',
        firstName: 'Nikita',
        lastName: 'Hello',
    },
    {
        id: '4',
        email: 'temp@temp.com',
        firstName: 'Alina',
        lastName: 'Hello',
    },
]

exports.paySalary = (call, cb) => {
    const employeeIdList = call.request.employeeIdList

    const employeesResult = employees.filter(employee => {
        const intId = parseInt(employee.id)
        return employeeIdList.includes(intId)
    })

    cb(null, { employees: employeesResult })
}
