const http = require("http");
const fs = require("fs");
const PORT = 3003;
const bookArr = [
  { bookId: 1, bookName: "Book A" },
  { bookId: 2, bookName: "Book B" },
  { bookId: 3, bookName: "Book C" },
  { bookId: 4, bookName: "Book D" },
  { bookId: 5, bookName: "Book E" },
  { bookId: 6, bookName: "Book F" },
  { bookId: 7, bookName: "Book G" },
  { bookId: 8, bookName: "Book H" },
  { bookId: 9, bookName: "I" },
  { bookId: 10, bookName: "J" },
];

const app = http.createServer(function (req, res) {
  console.log("starting...");
  if (req.method === "GET") {
    if (req.url === "/bookDetails") {
      fs.readFile("./books.json", "utf8", (err, data) => {
        var books = "";
        if (err) return res.end(err);
        books += data.toString();
        res.end(books);
      });
    }
  } else if (req.method === "PUT") {
    if (req.url === "/editBook") {
      var books = "";
      var bookTobeUpdated = "";
      req.on("data", (chunk) => {
        bookTobeUpdated += chunk.toString();
      });
      req.on("end", () => {
        bookTobeUpdated = JSON.parse(bookTobeUpdated);
        fs.readFile("./books.json", "utf8", (err, data) => {
          if (err) return res.end(err);
          books = JSON.parse(data);
          const pos = books.findIndex(
            (item) => item.bookId === bookTobeUpdated.bookId
          );
          if (pos >= 0) {
            books[pos] = bookTobeUpdated;
            fs.writeFile("./books.json", JSON.stringify(books), (err, data) => {
              if (err) res.end(err);
              res.end(JSON.stringify(books));
            });
          } else {
            res.end("Book is not found");
          }
        });
      });
    }
  } else if (req.method === "POST") {
    if (req.url === "/addBook") {
      var books = "";
      var bookTobeAdded = "";
      req.on("data", (chunk) => {
        bookTobeAdded += chunk.toString();
      });
      req.on("end", () => {
        bookTobeAdded = JSON.parse(bookTobeAdded);
        fs.readFile("./books.json", "utf8", (err, data) => {
          if (err) return res.end(err);
          books = JSON.parse(data);
          const pos = books.findIndex(
            (item) => item.bookId === bookTobeAdded.bookId
          );
          if (pos >= 0) {
            res.end("Can not add book");
          } else {
            books.push(bookTobeAdded);
            fs.writeFile("./books.json", JSON.stringify(books), (err, data) => {
              if (err) res.end(err);
              res.end(JSON.stringify(books));
            });
            res.end("Add book successfully");
          }
        });
      });
    }
  } else if (req.method === "DELETE") {
    if (req.url === "/deleteBook") {
      var books = "";
      var bookTobeDeleted = "";
      req.on("data", (chunk) => {
        bookTobeDeleted += chunk.toString();
      });
      req.on("end", () => {
        bookTobeDeleted = JSON.parse(bookTobeDeleted);
        fs.readFile("./books.json", "utf8", (err, data) => {
          if (err) return res.end(err);
          books = JSON.parse(data);
          const pos = books.findIndex(
            (item) => item.bookId === bookTobeDeleted.bookId
          );
          if (pos >= 0) {
            books.splice(pos, 1);
            fs.writeFile("./books.json", JSON.stringify(books), (err, data) => {
              if (err) res.end(err);
              res.end(JSON.stringify(books));
            });
            res.end("Delete book successfully");
          } else {
            res.end("Book can not found");
          }
        });
      });
    }
  }
});
app.listen(PORT, () => {
  console.log("server running");
});
