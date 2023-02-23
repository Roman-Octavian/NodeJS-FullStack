const express = require("express");
const app = express();

app.use(express.json());

const mockBirds = [];
const BIRD_TEMPLATE = {
    id: 0, // Auto Insert
    name: "", // Required
    color: "",
    size: 0,
    habitat: "",
    conservation_status: ""
};
let lastInsertID = 0;

for (let i = 1; i <= 5; i++) {
    lastInsertID++;
    mockBirds.push(
        {
            id: lastInsertID,
            name: "Bird name " + i, 
            color: "Bird color " + i,
            size: i * 10, // cm
            habitat: "Varied",
            conservation_status: "Least Concern",
        }
    );
}

app.get("/", (req, res) => {
    res.send({data: mockBirds});
});

app.get("/birds", (req, res) => {
    res.send({data: mockBirds});
});

app.get("/birds/:id", (req, res) => {
    res.send(
        mockBirds.find(bird => 
            bird.id === Number(req.params.id)
        ));
});

app.post("/birds", (req, res) =>  {
    const newBird = req.body;
    let validObject = true; // boolean to stop execution if newBird is assessed invalid at any point
    lastInsertID++; // Increment last insert ID to simulate actual database auto insert
    newBird.id = lastInsertID; // Assign or overwrite ID property

    // Stop execution of post method if object does not have required property
    if (!newBird.hasOwnProperty("name")) {
        res.send({ message: "Missing required property on bird object" });
        lastInsertID--;
        return;
    }

    // Check if newBird has properties that are not defined in the bird object template
    for (const prop of Object.keys(newBird)) {
        if (!Object.hasOwn(BIRD_TEMPLATE, prop)) {
            validObject = false;
        }
    }

    // Stop execution of post method if object was deemed invalid
    if (!validObject) {
        res.send({ message: "Invalid properties on bird object" });
        lastInsertID--;
        return;
    }

    // Check for and create missing properties
    for (const prop of Object.keys(BIRD_TEMPLATE)) {
        if (!newBird.hasOwnProperty(prop)) {
            newBird[prop] = null;
        }
    }
    mockBirds.push(newBird);
    res.send({ message: newBird });

});

app.put("/birds/:id", (req, res) => {
    const modifiedBird = mockBirds.find(bird => bird.id === Number(req.params.id));
    let validObject = true;

    if (!modifiedBird) {
        res.send({ message: "Bird with provided ID was not found" });
        return;
    }

    req.body.id = modifiedBird.id; // Overwrite ID for scenario where PUT request tries to change it

    for (const prop of Object.keys(req.body)) {
        if (!Object.hasOwn(BIRD_TEMPLATE, prop)) {
            validObject = false;
        }
    }
    
    if (!validObject) {
        res.send({ message: "Invalid properties on modification request" });
        return;
    }

    Object.assign(modifiedBird, req.body);
    res.send({ message: modifiedBird });
});

app.delete("/birds/:id", (req, res) => {
    const deletedBirdIndex = mockBirds.findIndex(bird => bird.id === Number(req.params.id));

    if (deletedBirdIndex === -1) {
        res.send({ message: "Bird with provided ID was not found" });
        return;
    }
    mockBirds.splice(deletedBirdIndex, 1);
    res.send({ message: "Bird has been deleted"});
});

app.listen(8080, () => {
    console.log("Server is running on port", 8080);
});