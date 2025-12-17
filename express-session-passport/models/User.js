const bcrypt = require('bcrypt');

const User = [
    {
        id: 1,
        name: "Demo",
        email: "demo@gmail.com",
        password: bcrypt.hashSync("12345",10)
    },
    {
        id: 2,
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456",10)
    }
];

module.exports = User;