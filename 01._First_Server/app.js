// const app = require("express")();
const express = require("express");
const app = express();

app.use(express.json());

// route (entire thing)
//  HTTP method
//  |   endpoint   callback function
app.get("/", (req, res) => {
    res.send({ message: "Our first route" });
});

let bicycleSpins = 0;
app.get("/spinthebicycle", (req, res) => {
    bicycleSpins += 1;
    res.send({ message: `People have spun the bicycle wheel ${bicycleSpins} times` });
});

app.get("/about", (req, res) => {
    res.send(`
        <h1>About</h1>
        <h3>This is my about page.</h3>
    `);
});

// /bat?adjective=spooky
app.get("/bat", (req, res) => {
    console.log(req.query);

    res.send({ message: `The bat is ${req.query.adjective}.` });
});

// /bottle/large
app.get("/bottle/:bottleSize", (req, res) =>  {
    res.send({ bottleSize: req.params.bottleSize });
});

app.post("/package", (req, res) =>  {
    console.log(req.body);
    res.send({ message: req.body });
});



app.listen(8080);
