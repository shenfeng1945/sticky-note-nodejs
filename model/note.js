const Sequelize = require('sequelize');
const path = require('path')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: path.join(__dirname,'../database/database.splite')
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
    star:{
        type:Sequelize.STRING
    }
})

// for(let i=0;i<5;i++){

// Note.sync().then(() => {
//     Note.create({ text: 'hello world',star:'4'})
// }).then(() => {
//     Note.findAll({raw:true}).then(res => {
//         console.log(res)
//     })
// })
// }
// Note.findAll({raw:true}).then(res=>{
//     console.log(res)
// })

// Note.destroy({raw:true,where:{id:2}}).then(res=>{
//     console.log(res)
// })
module.exports = Note;