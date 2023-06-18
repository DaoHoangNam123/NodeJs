const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";

const mongoClient = new MongoClient(uri);
var returnData = {};

async function updateOneDoc(productToBeUpdated) {
  try {
    var client = await mongoClient.connect();
    console.log("Connected successfully to the client");
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var filterDoc = { productId: productToBeUpdated.productId };
    var updateDoc = { $set: { price: productToBeUpdated.price } };
    var result = await collName
      .updateOne(filterDoc, updateDoc)
      .then((result) => {
        if (result.matchedCount == 0 && result.modifiedCount == 0) {
          returnData = {
            statusCode: 200,
            msg: "No matching documents according to the filter condition",
          };
          return returnData;
        }
        if (result.matchedCount == 1 && result.modifiedCount == 0) {
          returnData = {
            statusCode: 200,
            msg: "Matched document found and was already updated",
          };
          return returnData;
        }
        if (result.matchedCount == 1 && result.modifiedCount == 1) {
          returnData = {
            statusCode: 200,
            msg: "Document updated successfully",
          };
          return returnData;
        }
        mongoClient.close();
      })
      .catch((err) => {
        console.log("Error in Update One", err);
        returnData = { statusCode: 400, msg: err };
        mongoClient.close();
        return returnData;
      });
    return result;
  } catch (err) {
    console.log(`Error : ${err})`);
    returnData = { statusCode: 400, msg: err };
    return returnData;
  }
}

async function deleteOneDoc(docIdToBeDeleted) {
  try {
    var client = await mongoClient.connect();
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var filterDoc = { productId: docIdToBeDeleted };
    var result = await collName
      .deleteOne(filterDoc)
      .then((res) => {
        if (res.deletedCount == 1) {
          returnData = {
            statusCode: 200,
            msg: "Deletion is successfull!!",
          };
          return returnData;
        } else {
          returnData = {
            statusCode: 400,
            msg: "No matching record found to be delete",
          };
          return returnData;
        }
      })
      .catch((err) => {
        console.log(err);
        returnData = {
          statusCode: 400,
          msg: "No matching record found to be delete",
        };
        return returnData;
      });
    mongoClient.close();
    return result;
  } catch (err) {
    console.log(`Error : ${err})`);
    mongoClient.close();
  }
}

async function findProductsById(productId) {
  try {
    var client = await mongoClient.connect();
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var filterDoc = { productId: productId };
    var projectionDoc = { _id: 0 };
    var cursor = collName.find(filterDoc, { projection: projectionDoc });
    var productsArr = await cursor.toArray();
    returnData = {
      statusCode: 200,
      msg: `product list: ${JSON.stringify(productsArr)}`,
    };
    mongoClient.close();
    return returnData;
  } catch (err) {
    console.log(`Error : ${err})`);
    mongoClient.close();
  }
}

// insertA single doc
async function insertOneDoc(docsToBeInserted) {
  try {
    var client = await mongoClient.connect();
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var result = await collName
      .insertOne(docsToBeInserted)
      .then((res) => {
        if (res.insertedId) {
          returnData = {
            statusCode: 200,
            msg: "Insert doc successfully",
          };
          return returnData;
        }
      })
      .catch((err) => {
        returnData = {
          statusCode: 400,
          msg: "Invalid data",
        };
        return returnData;
      });
    mongoClient.close();
    return result;
  } catch (err) {
    console.log(`Error : ${err})`);
    mongoClient.close();
  }
}

async function findAllDocs() {
  try {
    var client = await mongoClient.connect();
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var projectionDoc = { _id: 0 };
    var cursor = collName.find({}, { projection: projectionDoc }); // return all the docs
    var productsArr = await cursor.toArray();
    returnData = {
      statusCode: 200,
      msg: productsArr,
    };
    mongoClient.close();
    return returnData;
  } catch (err) {
    console.log(`Error : ${err})`);
    mongoClient.close();
  }
}

async function insertManyDocs(docsToBeInserted) {
  try {
    var client = await mongoClient.connect();
    var dbName = client.db("dxcDb");
    var collName = dbName.collection("products");
    var result = await collName
      .insertMany(docsToBeInserted)
      .then((res) => {
        returnData = {
          statusCode: 200,
          msg: `Insert docs successfully, Number of docs inserted: ${res.insertedCount}`,
        };
        return returnData;
      })
      .catch((err) => {
        returnData = {
          statusCode: 400,
          msg: "Invalid data",
        };
        return returnData;
      });
    mongoClient.close();
    return result;
  } catch (err) {
    console.log(`Error : ${err})`);
  }
}

module.exports = {
  updateOneDoc,
  insertOneDoc,
  insertManyDocs,
  findAllDocs,
  findProductsById,
  deleteOneDoc,
};
