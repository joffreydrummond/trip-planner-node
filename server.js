const express = require("express"),
    mongo = require("mongodb").MongoClient,
    app = express(),
    url = "mongodb://localhost:27017";
    // API = require("./API");

// app.use("./API.js", API)


app.use(express.json());

app.post('/api/trip', (req, res) => { 
    const name = req.body.name; 
    trips.insertOne({ name: name }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        console.log(result);
        res.status(200).json({ ok:true })
        
            })
})

app.get('/api/trips', (req, res) => { 
    trips.find().toArray((err, items) => {
if (err) {
    console.error(err);
    res.status(500).json({ err: err })
    return
}
res.status(200).json({ trips:items })
    })
})
 
app.post('/api/expense', (req, res) => { 
    expenses.insertOne({
        trip: req.body.trip,
        date: req.body.date,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description
    }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        console.log(result);
        res.status(200).json({ ok:true })
            
    })
 })
app.get('/api/expenses', (req, res) => { 
    expenses.find({ trip: req.body.trip }).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        res.status(200).json({ trips: items })
    })
 });

// let db, trips, expenses;

mongo.connect(url,
    (err, client) => {
    if (err) {
        console.error(err);
        return
        }
        db = client.db("tripcost");
        trips = db.collection("trips");
        expenses = db.collection("expenses")
})

app.listen(3000, () => console.log("🌎 ==> API server now live!"))