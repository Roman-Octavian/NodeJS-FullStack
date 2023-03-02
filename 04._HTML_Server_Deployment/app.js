const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});