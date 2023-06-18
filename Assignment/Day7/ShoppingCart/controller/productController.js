var {
  updateOneDoc,
  insertOneDoc,
  insertManyDocs,
  findAllDocs,
  findProductsById,
  deleteOneDoc,
} = require("../model/productModel.js");

async function getAllProducts() {
  try {
    var res = await findAllDocs();
    return res;
  } catch (err) {
    console.log(err);
  }
}
async function updateProducts(productToBeUpdated) {
  try {
    var result = await updateOneDoc(productToBeUpdated);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function insertOneDoc(docsToBeInserted) {
  try {
    var result = await insertOneDoc(docsToBeInserted);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function insertManyDocs(docsToBeInserted) {
  try {
    var result = await insertManyDocs(docsToBeInserted);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function findProductsById(docIdToBeFound) {
  try {
    var result = await findProductsById(docIdToBeFound);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function deleteOneDoc(docIdToBeDeleted) {
  try {
    var result = await deleteOneDoc(docIdToBeDeleted);
    return result;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getAllProducts,
  updateProducts,
  insertOneDoc,
  insertManyDocs,
  findProductsById,
  deleteOneDoc,
};
