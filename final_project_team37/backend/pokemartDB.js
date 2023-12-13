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
    const cost20=[1,4,7,10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,60,63,66,69,72,74,77,79,81,84,86,88,90,92,96,98,100,102,104,109,111,116,118,120,129,133,138,140,147];
    const cost50=[2,5,8,11,14,17,20,22,24,26,28,30,33,36,38,40,42,44,47,49,51,53,55,57,59,61,64,67,70,73,75,78,80,82,83,85,87,89,91,93,95,97,99,101,103,105,106,107,108,110,112,113,114,115,117,119,121,122,123,124,125,126,127,128,132,137,139,141,148];
    const cost100=[3,6,9,12,15,18,31,34,45,62,65,68,71,76,94,130,131,134,135,136,142,143,149];
    const cost200=[144,145,146,150,151];
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const id = values[0]; // id
    const name = values[1]; // name
    const img = values[2]; // img
    const imgShiny = values[3]; // imgShiny
    const type1 = values[4]; // type1
    const type2 = values[5]; // type2
    var cost;
    //Find cost of pokemon
    //check cost20
    for(let i=0;i<cost20.length;i++){
        if(cost20[i] === id){
            cost=20;
        }
    }
    //check cost50
    for(let i=0;i<cost50.length;i++){
        if(cost50[i] === id){
            cost=50;
        }
    }
    //check cost100
    for(let i=0;i<cost100.length;i++){
        if(cost100[i] === id){
            cost=100;
        }
    }
    //check cost200
    for(let i=0;i<cost200.length;i++){
        if(cost200[i] === id){
            cost=200;
        }
    }
    const newDocument = {
        "id":id,
        "name":name,
        "img":img,
        "imgShiny":imgShiny,
        "type1":type1,
        "type2":type2,
        "cost": cost
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
    const coins = 100;

    const newUser = {
        "username" : username,
        "password" : password,
        "collection" : collection,
        "coins" : coins
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
app.put("/addPokemon/:username", async(req, res) => {
    //Retrieve user information
    const username = String(req.params.username);
    // console.log("Attempting to find: " + username);
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
    const id = values[1]; // id
    const name = values[2]; // name
    const img = values[3]; // img
    const imgShiny = values[4]; // imgShiny
    const type1 = values[5]; // type1
    const type2 = values[6]; // type2
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
        "coins" : userValues[4],
    }

    var collection = userValues[3];
    // console.log(collection);
    var updateCollection = collection.concat(pokemonToBeAdded);
    // console.log(updateCollection);
    const putResult = await db.collection("users").updateOne(
        {"username" : userValues[1]},
        {$set: {"collection" :updateCollection}}
    );

    if(!putResult){
        res.send("Not Found").status(404);
    }
    else{
        res.send(results).status(200);
    }
    
});

app.put("/incrementCoins/:username", async(req, res) =>{
    const username = String(req.params.username);
    await client.connect();
    const query = {"username" : username};
    // console.log("incrementCoins username: ", username);
    const results = await db.collection("users").findOne(query);
    const userValues = Object.values(results);
    const coins = userValues[4];
    // console.log("incrementCoins coin count: ", coins);

    const addCoins = await db.collection("users").updateOne(
        {"username" : username},
        {$set: {"coins" : parseInt(coins)+1}}
    );

    if(!addCoins){
        res.send("Not Found").status(404);
    }
    else{
        res.send(addCoins).status(200);
    }
});

app.put("/updateCoins/:username", async(req,res) => {
    const username = String(req.params.username);
    await client.connect();
    const query = {"username" : username};
    //Expecting this body format: {"coins":coinValue}
    const values = Object.values(req.body);
    const coinsToUpdate = parseInt(values[0]);
    const addCoins = await db.collection("users").updateOne(
        {"username" : username},
        {$set: {"coins" : coinsToUpdate}}
    );

    if(!addCoins){
        res.send("Not Found").status(404);
    }
    else{
        res.send(addCoins).status(200);
    }
})


app.put("/removePokemon/:username", async(req, res) =>{
    const username = String(req.params.username);
    await client.connect();
    const query = {"username" : username};
    // console.log("incrementCoins username: ", username);
    const results = await db.collection("users").findOne(query);
    const userValues = Object.values(results);

    var collection = userValues[3];

    //Expected body from frontend: {"id": idNum}
    const values = Object.values(req.body);
    const id = values[0];
    for(let i=0;i<collection.length;i++){
        if(collection[i].id === id){
            collection.splice(i, 1);
        }
    }

    const removePokemon = await db.collection("users").updateOne(
        {"username": username},
        {$set: {"collection": collection}}
    )

    if(!removePokemon){
        res.send("Not Found").status(404);
    }
    else{
        res.send(removePokemon).status(200);
    }
});
