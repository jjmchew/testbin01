
// Mongo
const { MongoClient } = require('mongodb');
const uri = 'mongodb://admin:secretpw@host.docker.internal:27017/projdb?authSource=admin';
// const uri = 'mongodb://admin:secretpw@127.0.0.1:27017/projdb?authSource=admin';
const mongo = new MongoClient(uri);

const getMongo = async () => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  let list = await collection.find().toArray();
  console.log('mongo: ', JSON.stringify(list));
  return list;
}

const putMongo = async (newName) => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  await collection.insertOne({ name: newName });
  console.log(`inserted ${newName} into mongoDb`);
}


// PostgreSQL
const Pool = require('pg').Pool;
const postgres = new Pool({
  user: 'postgres',
  host: 'host.docker.internal',
  // host: 'localhost',
  database: 'proj',
  password: 'mypw',
  port: 3030,
});


const getPg = async () => {
  try {
    let data = await new Promise((res, rej) => {
      postgres.query('SELECT * from users', (error, results) => {
        if (error) rej(error);

        res(results.rows);
      });
    });

    return data;
  } catch (e) {
    console.log(e.message);
    return { data: "no data" };
  }
};


// app
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


const users = {
  'user1id': 'user1 name',
  'user2id': 'user2 name',
};

const mainFunc = (req, res, method) => {
  let user = req.params.user;

  console.log(user, req.body);
  if (users[user]) {
    res.send(`you hit mainFunc with a ${method} request for "${users[user]}" with ${JSON.stringify(req.body)}`);
  } else {
    res.send('sign up for features');
  }
}


app.get('/', (_req, res) => {
  res.send('live!');
});

app.get('/postgres', async (_, res) => {
  let data = await getPg();
  if (data) {
    res.status(200).json(data);
  } else res.status(200).send('something wrong with db');
});

app.get('/mongo', async (_, res) => {
  let data = await getMongo();
  console.log('data:', JSON.stringify(data));
  res.status(200).send(JSON.stringify(data));
});

app.get('/mongo/:newName', async (req, res) => {
  let newName = req.params.newName;
  console.log('app.get newName is ', newName);
  putMongo(newName);
  res.status(200).send(newName);
});


// app.get('/:user', (req, res) => mainFunc(req, res, 'get'));
// app.post('/:user', (req, res) => mainFunc(req, res, 'post'));
// app.delete('/:user', (req, res) => mainFunc(req, res, 'delete'));
// app.put('/:user', (req, res) => mainFunc(req, res, 'put'));
// app.patch('/:user', (req, res) => mainFunc(req, res, 'patch'));


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


