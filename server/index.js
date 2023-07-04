const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const client = new MongoClient(URI);

const app = express();
app.use(express.json());
app.use(cors());

//Login

app.post('/login', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').findOne(user);

    let message = '';

    if (data) {
      message = 'Sekmingai prisijungėte';
    } else {
      message = 'Klaida. Blogas slaptažodis ar vartotojo vardas.';
    }

    await con.close();
    res.send({ message });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get and Post Users

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get and Post Questions/Posts

app.get('/posts', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .aggregate([
        {
          $lookup: {
            from: 'comments', // kitos kolekcijos pavadinimas
            localField: '_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: 'postId', // kitos kolekcijos raktas per kurį susijungia
            as: 'comments', // naujo rakto pavadinimas
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/posts', async (req, res) => {
  try {
    const { dateCreated, text, edited, userId } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .insertOne({
        dateCreated,
        text,
        edited,
        usersId: new ObjectId(userId),
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get and Post Answers/Comments

app.get('/posts/:id/answers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('comments').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/posts/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateCreated, text, edited, usersId } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .insertOne({
        dateCreated,
        text,
        edited,
        usersId,
        postId: new ObjectId(id),
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
