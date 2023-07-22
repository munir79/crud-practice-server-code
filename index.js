const express=require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;
 // middle ware
app.use(cors());
app.use(express.json());



//userName:crudpract
//password:RZtzPIz2txpn3L5I


const uri = "mongodb+srv://crudpract:RZtzPIz2txpn3L5I@cluster0.9b6ho97.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const UserCollection=client.db("CrudPract").collection("users");

// recive data from clent side 
app.post('/users',async(req,res)=>{
    const user=req.body;
    console.log(user);
    const result=await UserCollection.insertOne(user)
    res.send(result);
    });

    // read data from database

    app.get('/users',async(req,res)=>{
      const query={};
      const cursor=UserCollection.find(query);
      const users=await cursor.toArray();
      res.send(users);
    });

    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
     // console.log('trying to delete:',id);
     const query={_id:new ObjectId(id)}
     const result=await UserCollection.deleteOne(query);
     console.log(result);
     res.send(result);
    })




  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);





























 app.get('/',(req,res)=>{
    res.send('hello from node mongo server ');
 })

 app.listen(port ,()=>{
    console.log(`listening to port ${port} `);
 })