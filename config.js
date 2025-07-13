const { MongoClient } = require("mongodb");

const DB_NAME = "dock_store";
const COLLECTION = "objects";

let db, collection;

async function initMongo(MONGO_URI) {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
        collection = db.collection(COLLECTION);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
        throw new Error("Unable to connect MongoDB", err)
    }
}

function getCollection() {
  if (!collection) throw new Error("Mongo not initialized. Call initMongo() first.");
  return collection;
}

module.exports = { initMongo, getCollection }