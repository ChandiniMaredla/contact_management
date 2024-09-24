const express = require("express");
const { createContact, updateContact } = require("../controllers/contactController");

const contactRoutes = express.Router();

contactRoutes.post("/addcontact", createContact);
contactRoutes.put("/updatecontact",updateContact);
module.exports = contactRoutes;
