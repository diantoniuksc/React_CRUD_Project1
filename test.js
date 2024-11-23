
const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://ommetsynskaya:Sheridan2024@cluster0.kto5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://ommetsynskaya:Sheridan2024@cluster0.kto5g.mongodb.net/WorldCityUser";

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
     const db = client.db("WorldCityUser"); // Access the database
    const usersCollection = db.collection("users"); // Access the 'users' collection
    const users = await usersCollection.find().toArray(); // Fetch documents and convert to array
    console.log(users); // Display the user data
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
