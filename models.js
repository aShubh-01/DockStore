const { ObjectId } = require("mongodb");
const { getCollection } = require("./config");

exports.insert = async (doc) => await getCollection().insertOne(doc);

exports.findById = async (id) => await getCollection().findOne({ _id: new ObjectId(id) });

exports.findByPath = async (path) => await getCollection().find({ path }).toArray();

exports.deleteById = async (id) => await getCollection().deleteOne({ _id: new ObjectId(id) });