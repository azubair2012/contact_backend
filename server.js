const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(errorHandler);

app.use("/", require("./routes/route"));
app.use("/user", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
