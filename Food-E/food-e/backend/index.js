const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 5000;
const mongoose = require("mongoose");
const router = require("../backend/Routes/userRoutes");
const displayRouter = require("./Routes/itemDisplay");

const mongoURI = "mongodb+srv://gyanendra8159:Gyanu%40975@cluster0.vvameuw.mongodb.net/Food-E?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", router);
app.use("/item", displayRouter);




app.listen(PORT, () => {
    console.log(`Server is active now at ${PORT}`);
});
