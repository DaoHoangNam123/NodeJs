//imports
var express = require("express");
var fs = require("fs");
var path = require("path");
var morgan = require("morgan");

var empRouter = require("./routes/empRoutes.js");
var productRouter = require("./routes/productRoutes.js");

// initialisations
const PORT = 3002;

var app = express();

// configuration set up
app.set("port", PORT);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use(morgan("dev")); // for logging purpose

console.log("Hello");
// endpoints or routes
app.use("/employee", empRouter);
app.use("/product", productRouter);

//app.use("/login",empRouter);

app.get("/", (request, response) => {
  // return the home page
  var filePath = path.join(__dirnamee, "public", "index.html");
  response.sendFile(filePath);
});

// boot up server
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running at port : ${PORT}`);
  } else {
    console.log(err);
  }
});

/*
Monday's Assignment:
1. Create a server using express
Todo obj : description, data, status(complete/pending),todoId
Create a todo app:
1. Add a new task to the to do list  -- post
2. Marking a task as complete -- put
3. Remove a task -- delete
4. List the various tasks -- get-- return the entire array
5. List the tasks which are complete -- get request with params; /todo/complete -- return the records for which status is complete

*/
