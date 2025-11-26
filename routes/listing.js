const express = require("express");
const router = express.Router();
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utilis/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
      .get(wrapAsync(listingController.index))                  //index route
      .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));   //create route

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
      .get(wrapAsync(listingController.showListing))             //show route
      .put(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))   //update route
      .delete(isLoggedIn, wrapAsync(listingController.destroyListing));           //delete route


//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports = router;