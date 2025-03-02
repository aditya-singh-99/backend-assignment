import express from "express";
import "dotenv/config";
import { dbConnect } from "./db/connect.js";
import router from "./routers/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { res.send("hello") });
app.use("/", router);

app.listen(3000, () => {
    try {
        dbConnect();
        console.log("Server is running on port 3000");
    } catch (error) {
        console.error(error);
    }
});