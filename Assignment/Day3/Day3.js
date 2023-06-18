const fs = require("fs");

const copyContent = (fromFile, toFile) => {
  fs.copyFile(fromFile, toFile, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("text.txt was copied to text2.txt");
  });
};

copyContent("text.txt", "text2.txt");

const createLogFile = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const directoryName = "log" + day + month + year;
  const fileName = "dailyLog.log";
  const content = `${day}/${month}/${year}`;
  fs.mkdir(directoryName, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
    fs.writeFile(`${directoryName}/${fileName}`, content, function (err) {
      if (err) throw err;
      console.log("Log file created!");
    });
  });
};

createLogFile();
