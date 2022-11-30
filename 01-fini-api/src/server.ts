import express from "express";

const app = express();

app.get("/", (req, res) => {});

app.listen(3333, () => console.log("Listening on port 3333"));
