const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./src/routes/userRoute");
const contactRoutes = require("./src/routes/contactRoutes");

const { verifyJwt } = require("./src/services/jwtAuthService"); // Destructure the verifyJwt function from jwtAuthService
const errorHandler = require("./src/services/errorHandler");


const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(bodyParser.json());
app.use('/', userRoutes);

app.use('/contact',verifyJwt,contactRoutes);
app.use(errorHandler);

mongoose.connect('mongodb+srv://ITCC:x3txwwBMqr1bQZnR@atlascluster.30o4fpw.mongodb.net/Contacts?retryWrites=true&w=majority&appName=AtlasCluster')
  .then(() => {
    console.log('DB Connected');
    app.listen(6000, () => {
      console.log('Server started on port 6000');
    });
  })
  .catch((e) => {
    console.log(e);
  });
