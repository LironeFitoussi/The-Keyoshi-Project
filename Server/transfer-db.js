// transfer-db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://lironefit:nfrCkw6H4NBgtVLz@cluster0.cqjeagn.mongodb.net/?retryWrites=true&w=majority";
const sourceDb = "test";
const targetDb = "keyoshi";

async function transfer() {
  const client = new MongoClient(uri);
  await client.connect();

  const source = client.db(sourceDb);
  const target = client.db(targetDb);
  const collections = await source.listCollections().toArray();

  for (const { name } of collections) {
    const sourceCol = source.collection(name);
    const targetCol = target.collection(name);

    const docs = await sourceCol.find().toArray();
    if (docs.length > 0) {
      await targetCol.insertMany(docs);
      console.log(`Copied ${docs.length} docs from ${sourceDb}.${name} to ${targetDb}.${name}`);
    }
  }

  await client.close();
}
transfer().catch(console.error);
