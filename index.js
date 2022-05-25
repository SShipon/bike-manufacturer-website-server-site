const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { response } = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());



   // test url link 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jgbqt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//  try finally function

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("Bike").collection("products");
     

    app.get('/product', async (req, res) => {
      const query = {}
      const cursor = productCollection.find(query)
      const products = await cursor.toArray()
      res.send(products)
    })
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const product = await productCollection.findOne(query)
      res.send(product)
    })

  } finally {

  }
}


run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running server site shipon form bangladesh");
});

app.listen(port, () => {
  console.log("server site running assignment-11", port);
});