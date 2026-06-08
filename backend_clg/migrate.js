const { MongoClient } = require('mongodb');

async function migrate() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  try {
    await client.connect();
    const sourceDb = client.db('petstore');
    const targetDb = client.db('clg_management');

    const collections = await sourceDb.listCollections().toArray();
    for (let coll of collections) {
      const colName = coll.name;
      const docs = await sourceDb.collection(colName).find().toArray();
      if (docs.length > 0) {
        // avoid duplicate keys if data already exists in clg_management
        try {
          await targetDb.collection(colName).insertMany(docs, { ordered: false });
        } catch (e) {
          console.log(`Some duplicates ignored in ${colName}`);
        }
      }
    }
    await sourceDb.dropDatabase();
    console.log('Migration and drop complete');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

migrate();
