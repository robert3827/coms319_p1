var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.use("/images", express.static("images"));

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName ="assignment03_team37"
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/get", async (req, res) => {
    console.log("App Get Called");
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("fakestore")
        .find(query)
        .limit(100)
        .toArray();
    // console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/getById/:id", async (req, res) => {
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("fakestore")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });

app.post("/addProduct", async (req, res) => {
    console.log("Adding a product");
    await client.connect();
    const values = Object.values(req.body);
    const id = values[0]; //ID
    const title = values[1]; //TITLE
    const price = values[2];
    const description = values[3];
    const category = values[4];
    const image = values[5]; //Maybe change this to reference the locally stored image
    const rating = values[6]; //ratings object
    const ratingsValues = Object.values(rating);
    const rate = ratingsValues[0];
    const count = ratingsValues[1];

    const ratings = {
        "rate" : rate,
        "count" : count
    }

    const productFormat = {
        "id": id,
        "title": title,
        "price": price,
        "description": description,
        "category": category,
        "image": image,
        "rating": ratings
    }

    const results = await db.collection("fakestore").insertOne(productFormat);
    res.status(200);
    res.send(results);
});



app.put("/updateProduct", async (req, res) => {
    const values = Object.values(req.body);
    const productId = values[1];
    const title = values[2];
    const price = values[3];
    const description = values[4];
    const category = values[5];
    const image = values[6];
    const ratings = values[7];

    // const productUpdate = {
    //     "_id": generatedId,
    //     "id": productId,
    //     "title": title,
    //     "price": price,
    //     "description": description,
    //     "category": category,
    //     "image": image,
    //     "rating": {
    //         "rate" : ratings,  
    //     }
    // }
    const results = await db.collection("fakestore").updateOne(
        {"id" : productId},
        {$set: {
            "id": productId,
            "title": title,
            "price": price,
            "description": description,
            "category": category,
            "image": image,
            "rating": {
                "rate" : ratings,  
            }
        }},
        {upsert: false}
    );

    console.log(results);
    res.status(200);
    res.send(results);
});


app.delete("/deleteProduct/:id", async (req, res) => {
    const id = req.params.id;
    console.log("ID: " + id)
    const query = {
        "id" : id
    }
    const results = await db.collection("fakestore").deleteOne(query);
    console.log(results);

    res.status(200);
    res.send(results);
});
    