//importing express
const express = require("express");
const app = express();

//importing environmental configuration
require("dotenv").config();

//cors
const cors = require("cors");

//importing JWT to check token
const jwt = require("jsonwebtoken");

//importing Routes
const postRoute = require("./routes/postsRoute");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");

//importing mongo
const mongo = require("./shared/mongo");

async function AppServer() {
  try {
    //connecting to mongo
    await mongo.connect();

    //cors
    app.use(cors());

    //Middelwares
    app.use(express.json());

//     app.use((req, res, next) => {
//       console.log("Allowed");
//       next();
//     });

    //Routes
    app.use("/auth", authRoute);

    //Checking token
       app.use((req, res, next) => {
      const header = req.headers["access-token"];
      try {
        if (typeof header !== "undefined") {
          const bearer = header.split(" ");
          const token = bearer[0];
          console.log(bearer);
          console.log("yes entered")
          const userid = jwt.verify(token, process.env.TOKEN_SECRET);
          console.log("verifoed")
          console.log(userid);
          return next();
        }
      } catch (error) {
        console.log(error);
        res.status(401).send("invalid token");
      }

      res.send("token is missing");
    });

    app.use("/posts", postRoute);
    app.use("/users", userRoute);

    //Starting App
    app.listen(process.env.PORT, () => {
      console.log("server app is running...");
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
AppServer();
