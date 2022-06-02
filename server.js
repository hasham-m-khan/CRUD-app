import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
const connectionString = 'mongodb+srv://<username>:<password>@cluster0...'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')

  // CRUD - CREATE
  app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          // console.log(result);
          res.redirect('/')
        })
    })

  // CRUD - READ
  app.get('/', (req, res) => {
    const cursor = db.collection('quotes').find().toArray()
      .then(results => {
        // console.log(results)
        res.render('index.ejs', { quotes: results })
      })
      .catch(err => console.log(err))
  })

  // CRUD - UPDATE
  app.put('/quotes', (req, res) => {
    // console.log(req.body);
    quotesCollection.findOneAndUpdate(
      { name: 'Master Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
    .then(result => res.json('Success'))
    .catch(err => console.log(err))
  })

  // CRUD - DELETE
  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
      { name: req.body.name, quote: req.body.quote }
    )
    .then(result => 
      result.deletedCount == 0 ? res.json('No quote to delete') : res.json('Deleted Darth Vader\'s quote')
    )
    .catch(err => console.log(err))
  })
})
.catch(err => console.log(err))

app.listen(3000, _ => console.log('Listening on port 3000 ...'))
