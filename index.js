var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')




const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb+srv://new:abcd1234@cluster.agojfic.mongodb.net/new?retryWrites=true&w=majority' , { useNewUrlParser : true , useUnifiedTopology : true})

var db = mongoose.connection;

db.on('error', () => console.log('error connecting'))
db.once('open' , ()=>console.log('connected to db'))

app.post('/sign_up', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password


    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password" : password
        
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log('successfull')
    })
    return res.redirect('signup_success.html')

})


app.get('/', (req, res) => {
    // res.set({
    //     'Allow-access-Allow-Origin' : '*'
    // })
    return res.redirect('index.html')
}).listen(3000)


console.log('listing to the port')


