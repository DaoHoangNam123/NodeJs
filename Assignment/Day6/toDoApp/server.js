var express = require("express");
var path = require("path"); // core module
var app = express();
const PORT = 3002;
app.use(express.urlencoded());
app.use(express.json());
var taskArr = [
  { todoId: 1, description: "Test", data: "", status: "pending" },
  { todoId: 2, description: "Test 1", data: "", status: "complete" },
  { todoId: 3, description: "Test 2", data: "", status: "complete" },
];
app.get("/todo-list", (request, response) => {
  response.json(taskArr);
});
app.post("/addTask", (request, response) => {
  var taskTobeInserted = request.body;
  if (taskTobeInserted != {}) {
    if (taskTobeInserted.todoId) {
      var pos = taskArr.findIndex(
        (item) => item.todoId == taskTobeInserted.todoId
      );
      if (pos >= 0) {
        // record already exists;
        response.status(400);
        response.send("Task Id to be inserted already exists");
      } else {
        // insertion allowed
        taskArr.push(taskTobeInserted);
        response.json(taskArr);
      }
    } else {
      response.status(400).send("TodoId misssing");
    }
  }
});
app.put("/editTask", (request, response) => {
  var taskTobeEdited = request.body;
  if (taskTobeEdited != {}) {
    if (taskTobeEdited.todoId) {
      var pos = taskArr.findIndex(
        (item) => item.todoId == taskTobeEdited.todoId
      );
      if (pos >= 0) {
        taskArr[pos] = taskTobeEdited;
        console.log(JSON.stringify(taskArr));
        response.send(`Task list: ${JSON.stringify(taskArr)}`);
        response.send("Task is edited");
      } else {
        // not found
        response.send("Task is not found");
      }
    } else {
      response.status(400).send("TodoId misssing");
    }
  }
});
app.delete("/deleteTask", (request, response) => {
  var taskTobeDeleted = request.body;
  if (taskTobeDeleted != {}) {
    if (taskTobeDeleted.todoId) {
      var pos = taskArr.findIndex(
        (item) => item.todoId == taskTobeDeleted.todoId
      );
      if (pos >= 0) {
        taskArr.splice(pos, 1);
        response.send("Task list: ", JSON.stringify(taskArr));
        response.send("Task is deleted");
      } else {
        // not found
        response.send("Task is not found");
      }
    } else {
      response.status(400).send("TodoId misssing");
    }
  }
});
app.listen(PORT, (err) => {
  console.log(`Server is running at ${PORT}`);
});
