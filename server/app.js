const express = require('express')
const ejs = require('ejs')
const app = express()
const session = require('express-session');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Profile = require('./models/profileModel.js')
const QuizDB = require('./models/quizModel.js')
const cors = require('cors')



app.use(
    cors({
        origin:'http://localhost:3000',
        credentials: true
    })
)

app.use(express.json())

app.use(session({
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false ,
    cookie: {   secure: false,
                path:'/', 
            },
        }));

app.post('/login',async (req,res)=>{
    const currInstancefromDB = await Profile.findOne({email : req.body.username})
    req.session.isLoggedIn = false
    if (currInstancefromDB){
        if (await bcrypt.compare(req.body.password,currInstancefromDB.password)){
            req.session.isLoggedIn = true
            req.session.name = currInstancefromDB.name
            req.session.email = currInstancefromDB.email
            req.session.userid = currInstancefromDB._id.toString()
            req.session.quizAttempted = currInstancefromDB.quizAttempted
            return res.send({message : 'Login Successful' ,msg_type : 'success'})
        }
        else{
            return res.send({message : 'Password Incorrect' ,msg_type : 'error'})
        }
    }
        else{
            return res.send({message : 'No user with that Email' ,msg_type : 'error'})
    }
    })

app.post('/register',async (req,res)=>{
    const currInstancefromDB = await Profile.findOne({email : req.body.username})
    if (currInstancefromDB){
        res.send({message : 'Email id  already Taken' ,msg_type : 'error'})
    }
    else{
        const data = new Profile({
                name : req.body.name,
                email : req.body.username,
                password : await bcrypt.hash(req.body.password , 10)
            })
        data.save()
            .then((result)=>{
                res.send({message : 'Registration Successful' ,msg_type : 'success'})
            })
            .catch(err =>console.log(err));
        }
    })
    
app.use((req,res,next)=>{
        if(req.session){
            if(req.session.isLoggedIn){next()}
            else{res.send('error')}
        }else{res.send('error')
    }  
})

app.get('/profile',async (req,res)=>{
    res.send({name : req.session.name, email : req.session.email, id : req.session.userid})
})
const dbURI = 'mongodb+srv://clashonkavin:test1234@rocket.j9vwrao.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI)
.then(()=>{ console.log('Connected to database')})
.catch((err)=>{console.log(err)})

app.set('view-engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
    await Profile.find().then((data)=>res.send(JSON.stringify(data)))
})

app.get('/feed',async (req,res)=>{
    await QuizDB.find().then((data)=>res.send(JSON.stringify(data)))
})

app.get('/feed/:id',async (req,res)=>{
    await QuizDB.find({creatorsId : req.params.id}).then((data)=>res.send(JSON.stringify(data)))
})


app.get('/history',async (req,res)=>{
    const currInstancefromDB = await Profile.findOne({email : req.session.email})
    req.session.quizAttempted = currInstancefromDB.quizAttempted
    res.send({name : req.session.name, email : req.session.email, id : req.session.userid, quizAttempted : req.session.quizAttempted})
})

app.get('/users/:id',async (req,res)=>{
    const userdetails = await Profile.findOne({_id : req.params.id})
    res.send(userdetails)
})

app.get('/quizes/:id',async (req,res)=>{
    const quizdetails = await QuizDB.findOne({_id : req.params.id})
    res.send(quizdetails)
})


app.post('/quizes/:id',async (req,res)=>{
    let historyarray = []
    let numbertaken = 0
    let usersAttempted = []
    let username = ''
    const { score , qName ,total } = req.body
    const qid = req.params.id
    await Profile.findOne({_id : req.session.userid}).then((data) => {
        historyarray = data.quizAttempted
        username = data.name
    }).then(()=>historyarray.push([qName,qid,score,total])).catch((err)=>console.log(err))
    await Profile.updateOne({ _id : req.session.userid}, { $set: { quizAttempted: historyarray } }).then(console.log('profileupdate')).catch((err)=>console.log(err))
    await QuizDB.findOne({ _id : qid }).then((data) => {
        numbertaken = data.numberoftimestaken
        usersAttempted = data.takenby
    }).then(() => {
        numbertaken = numbertaken + 1
        usersAttempted.push([req.session.userid,username,score])
    }).catch((err)=>console.log(err))
    await QuizDB.updateOne({_id : qid }, { $set: { numberoftimestaken: numbertaken, takenby: usersAttempted } }).then(console.log('quizupdate')).catch((err)=>console.log(err))
})

app.get('/quizeswithuserdetails/:id',async (req,res)=>{
    const quizdetails = await QuizDB.findOne({_id : req.params.id})
    res.send([req.session.userid,quizdetails])
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
})



app.post('/createQuiz',async (req,res)=>{
    const info = req.body.quizinfo
    const data = new QuizDB({
        quizname : info[0],
        descp : info[1],
        creatorsId : info[2],
        questions : info[3]
    })
    data.save()
        .then((result)=>{console.log(result)})
        .catch(err =>console.log(err));
})
            
app.listen(5000,()=>console.log('Port Connected to 5000'))