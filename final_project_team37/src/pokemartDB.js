var express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { connect } = require("http2");
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


/**
 * POKEMON api methods
 */
//This should be run once, for all 151 pokemon to populate the database.
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

//This will be used for retrieving Pokemon data.
app.get("/pokemon/:id", async (req, res) => {
    const pokemonid = Number(req.params.id);
    console.log("Pokemon to find :", pokemonid);
    await client.connect();
    const query = {"id": pokemonid };
    const results = await db.collection("pokemon").findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

//Retrieving all pokemon on DB
app.get("/pokemon", async(req, res)=> {
    console.log("Retrieving all pokemon");
    await client.connect();
    const query = {};
    const results = await db
        .collection("pokemon")
        .find(query)
        .limit(151)
        .toArray();
    res.status(200);
    res.send(results);
});

/**
 * USER api methods
 * 
 * User db
 *      -username
 *      -password
 *      -collection
 *          -pokemon
 *      -currency
 */

/**
 * New user creation
 * Json format expected:
 * {
 *  username : username,
 *  password : password
 * }
 * 
 * Pokemon will start off as null. They will be added later
 * Currency will start off at 100.
 */
app.post("/users", async(req, res)=> {
    await client.connect();
    const values = Object.values(req.body);
    const username = values[0];
    console.log("Creating new user for: " + username);
    const password = values[1];
    const collection = [];
    const currency = 100;

    const newUser = {
        "username" : username,
        "password" : password,
        "collection" : collection,
        "currency" : currency
    };

    const results = await db.collection("users").insertOne(newUser);
    res.status(200);
    res.send(results);
});

//Get a user from the DB based on username
app.get("/users/:username", async(req, res) => {
    const username = String(req.params.username);
    console.log("Attempting to find: " + username);
    await client.connect();
    const query = {"username" : username};
    const results = await db.collection("users").findOne(query);

    if(!results){
        res.send("Not Found").status(404);
    }
    else{
        res.send(results).status(200);
    }
});

//Add Pokemon to user object
app.post("/addPokemon/:username", async(req, res) => {
    //Retrieve user information
    const username = String(req.params.username);
    console.log("Attempting to find: " + username);
    await client.connect();
    const query = {"username" : username};
    const results = await db.collection("users").findOne(query);
    const userValues = Object.values(results);
    console.log("userValues: "+userValues);

    if(!results){
        res.send("Not Found").status(404);
    }

    //Retrieve pokemon to be added to user collection
    const values = Object.values(req.body);
    const id = values[0]; // id
    const name = values[1]; // name
    const img = values[2]; // img
    const imgShiny = values[3]; // imgShiny
    const type1 = values[4]; // type1
    const type2 = values[5]; // type2
    const pokemonToBeAdded = {
        "id":id,
        "name":name,
        "img":img,
        "imgShiny":imgShiny,
        "type1":type1,
        "type2":type2
    };


    const updatedUser = {
        "_id" : userValues[0],
        "username" : userValues[1],
        "password" : userValues[2],
        "collection" : userValues[3],//.push(pokemonToBeAdded), //pokemonToBeAdded needs to be added to this list of objects
        "currency" : userValues[4],
    }

    console.log(updatedUser);
    const putResult = await db.collection("users").updateOne(updatedUser);
    // const putResult = await db.collection("users").insertOne(updatedUser);

    if(!putResult){
        res.send("Not Found").status(404);
    }
    else{
        res.send(results).status(200);
    }
    
});

