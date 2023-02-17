const express = require("express");
const app = express();

app.use(express.json());

const mockBirds = [];
for (let i = 1; i <= 10; i++) {
    mockBirds.push(
        {
            id: i,
            name: "Bird name " + i,
            color: "Bird color " + i,
            size: i * 10, // cm
            habitat: "Varied",
            conservation_status: "Least Concern",
        }
    );
}

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Birds API</title>
                <link rel="icon" href="#">
            </head>
            <body>
                <h1>Bird Page Index</h1>
                <h3>This is the index of the birds website</h3>
                <a href="/bird">Click here to visit the "bird" endpoint</a>
                <p>Once in the aforementioned endpoint, add an ID as path variable to get a specific bird object</p>
            </body>
        </html>
        
    `);
});

app.get("/birds", (req, res) => {
    res.send(mockBirds);
});

app.get("/birds/:id", (req, res) => {
    res.send(
        mockBirds.find(bird => 
            bird.id == req.params.id
        ));
});

app.listen(8080, () => {
    console.log("Server is running on port", 8080);
});