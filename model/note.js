const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: '../database/database.splite'
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//test
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

var Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    star: {
        type: Sequelize.Number
    }
})
Note.sync().then(() => {
    // Table created
    return User.create({
      text: 'John',
      star: 3,
    });
  });
