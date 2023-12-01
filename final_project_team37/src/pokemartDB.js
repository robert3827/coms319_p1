var express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "pokeMart";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.post("/addPokemon", async (req, res) => {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const id = values[0]; // id
    const name = values[1]; // name
    const img = values[2]; // img
    const imgShiny = values[3]; // imgShiny
    const type1 = values[4]; // type1
    const type2 = values[5]; // type2
    // console.log(id, name, price, description, imageUrl);
    const newDocument = {
        "id":id,
        "name":name,
        "img":img,
        "imgShiny":imgShiny,
        "type1":type1,
        "type2":type2
    };
    const results = await db.collection("pokemon").insertOne(newDocument);
    res.status(200);
    res.send(results);
});

app.get("/pokemon/:id", async (req, res) => {
    const pokemonid = Number(req.params.id);
    console.log("Pokemon to find :", pokemonid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": pokemonid };
    const results = await db.collection("pokemon")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});