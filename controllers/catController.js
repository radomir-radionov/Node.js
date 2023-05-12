const fs = require("fs");
const Cat = require("../models/cat.js");

exports.getCats = async (req, res) => {
  const cats = await Cat.getCats();

  console.log(cats);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end();
};

exports.addCat = (req, res) => {
  req.on("data", async (chunk) => {
    let body = "";
    let cats = await Cat.getCats();

    body += chunk.toString();
    cats.push(JSON.parse(body));

    const jsonData = JSON.stringify(cats);

    fs.writeFile("data.json", jsonData, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
  req.on("end", () => {
    res.end("Data has been added");
  });
};

exports.deleteCat = async (req, res, dataId) => {
  const cats = await Cat.getCats();
  const filtredCats = cats.filter((cat) => cat.id !== +dataId);

  fs.writeFile("data.json", JSON.stringify(filtredCats), (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

  res.end("The data has been deleted");
};

exports.updateCat = (req, res, dataId) => {
  req.on("data", async (chunk) => {
    let cats = await Cat.getCats();
    const reqData = JSON.parse(chunk.toString());
    console.log(reqData.name);

    const objectToUpdate = cats.find((obj) => obj.id === +dataId);
    if (objectToUpdate && reqData.name?.length) {
      objectToUpdate.name = reqData.name;
    }
    if (objectToUpdate && reqData.image?.length) {
      objectToUpdate.image = reqData.image;
    }

    console.log(cats);

    const jsonData = JSON.stringify(cats);

    fs.writeFile("data.json", jsonData, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
  req.on("end", () => {
    res.end("The data has been updated");
  });
};

exports.methodError = (req, res) => {
  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method not allowed");
};

exports.unexpectedError = (req, res) => {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Unexpected not allowed");
};
