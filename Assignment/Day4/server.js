const http = require("http");
const fs = require("fs");
const { checkDir } = require("./checkDir");
const PORT = 3000;
const app = http.createServer(function (req, res) {
  if (req.method === "GET") {
    if (req.url === "/login") {
      const rSteam = fs.createReadStream("public/login.html");
      rSteam.pipe(res);
    }
    if (req.url === "/") {
      const isDirExist = checkDir("./public");
      if (isDirExist) {
        fs.readFile("public/homePage.html", (err, data) => {
          if (err) {
            res.statusCode = 404;
            res.end("Error Page");
            return;
          } else {
            res.end(data);
            return;
          }
        });
      }
    }
  } else {
    res.write("hello client");
    res.end();
  }
});
app.listen(PORT, () => {
  console.log("server running");
});
