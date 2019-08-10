import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

const fs   = require('fs');
const jwt  = require('jsonwebtoken');
var passwordHash = require('password-hash');
// ... our other endpoints

const DigestFetch = require("digest-fetch");

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

const dbUrl = `mongodb://oguzhan:123456@127.0.0.1:27017/patirtiApi`;


const validate = data => {
  let errors = {};
  if (data.userName === '') errors.userName = "Can't be empty";
  if (data.password === '') errors.password = "Can't be empty";
  if (data.email === '') errors.email = "Can't be empty";
  if (data.address === '') errors.address = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
};



mongodb.MongoClient.connect(dbUrl, (err, db) =>  {
  
  if (err) {
    throw new Error(err);
  }
  //Token
  app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    res.send(token);
  })
  // Tüm kullanıcıları getirme
  app.get('/api/users', (req, res) => {
    db.collection('users').find({}).toArray((err, users) => {
      res.json({ users });
    });
  });
  //Kullanıcı Giriş
  app.post('/api/login', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
        db.collection('users').findOne({ email: req.body.email}, function(err, user) {
      //    console.log(passwordHash.verify( req.body.password, user.password));
        if(user === null){
          res.status(200).json({ login:1,message:"Email bulunmamaktadır." });
        }else if (user.email === req.body.email && passwordHash.verify(req.body.password, user.password)){

          const token = jwt.sign(
            { userId: user._id,
              phone: user.email,
              address: user.address
            }, "MySuperSecretPassPhrase", 
            { algorithm: 'HS256'});
          return res.status(200).json({
          //  res.json({ user });
            login:0,
            user: user,
            message: "Giriş Başarılı",
            token: token
          });
      } else if(!passwordHash.verify(req.body.password, user.password)){
        res.status(200).json({ login:2,message:"Parola yanlıştır" });
      }
      });
    
    } else {
      res.status(400).json({ errors });
    }
  });

  //Kullanıcı kayıt
  app.post('/api/users', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { userName, password, email, address } = req.body;
      var password = passwordHash.generate(password);

        db.collection('users').findOne({ email: req.body.email}, function(err, user) {
        if(user === null){
          db.collection('users').insert({ userName, password, email, address }, (err, result) => {
            if (err) {
              res.status(500).json({ errors: { global: "Soaaaamething went wrong" }});
            } else {
              res.json({ users: result.ops[0],message:"Üye kaydı başarıyla gerçekleşti." });
            }
          });
        } else {
          res.status(400).json({ message:"Bu E-mail kullanılmaktadır." });
      }
      });
    } else {
      res.status(400).json({ errors });
    }

  });

  //Kullanıcı güncelleme
  app.put('/api/user/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      req.body.password=passwordHash.generate(req.body.password);
      db.collection('users').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: req.body },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }
          res.json({ users: result.value });
        }
      );
    
    } else {
      res.status(400).json({ errors });
    }
  });

  //Kullanıcı id ye göre çekma
  app.get('/api/user/:_id', (req, res) => {
    db.collection('users').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, user) => {
      res.json({ user });
    })
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it. Please try again later when we implement it."
      }
    });
  });




  

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
