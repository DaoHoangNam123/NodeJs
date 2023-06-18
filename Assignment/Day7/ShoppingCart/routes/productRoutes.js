var express = require("express");
var productRouter = express.Router();

var {
  getAllProducts,
  updateProducts,
  insertOneDoc,
  insertManyDocs,
  findProductsById,
  deleteOneDoc,
} = require("../controller/productController");

productRouter.get("/", async (request, response) => {
  var result = await getAllProducts();
  response.json(result.msg);
});
productRouter.get("/:pId", async (request, response) => {
  var productIdToBeFound = request.params.pId;
  if (productIdToBeFound) {
    var result = await findProductsById(productIdToBeFound);
    response.status(result.statusCode).send(result.msg);
  } else {
    response
      .status(400)
      .send("Product Id missing in the params, product could not be found");
  }
});

productRouter.post("/", async (request, response) => {
  var productToBeInserted = request.body;
  if (productToBeInserted) {
    var result = await insertManyDocs(productToBeInserted);
    response.status(result.statusCode).send(result.msg);
  } else {
    response.status(400).send("Product data invalid");
  }
});

productRouter.post("/:pId", async (request, response) => {
  var productIdToBeInserted = request.params.pId;
  var productToBeInserted = request.body;
  if (productIdToBeInserted) {
    if (productIdToBeInserted == productToBeInserted.productId) {
      var result = await insertOneDoc(productToBeInserted);
      response.status(result.statusCode).send(result.msg);
    } else {
      response
        .status(400)
        .send("ProductId in the params and the body section do not match");
    }
  } else {
    response
      .status(400)
      .send("Product Id missing in the params, product could not be inserted");
  }
});
productRouter.put("/:pId?", async (request, response) => {
  var productIdToBeUpdated = request.params.pId;
  var productToBeUpdated = request.body;
  if (productIdToBeUpdated) {
    if (productIdToBeUpdated == productToBeUpdated.productId) {
      var result = await updateProducts(productToBeUpdated);
      response.status(result.statusCode).send(result.msg);
    } else {
      response
        .status(400)
        .send("ProductId in the params and the body section do not match");
    }
  } else {
    response
      .status(400)
      .send("Product Id missing in the params, product could not be updated");
  }
});
productRouter.delete("/:pId", async (request, response) => {
  var productIdToBeDeleted = request.params.pId;
  if (productIdToBeDeleted) {
    var result = await deleteOneDoc(productIdToBeDeleted);
    response.status(result.statusCode).send(result.msg);
  } else {
    response
      .status(400)
      .send("Product Id missing in the params, product could not be deleted");
  }
});

module.exports = productRouter;
