var express = require("express");
var router = express.Router();
const Categrories = require("../db/models/categories");
const Response = require("../lib/response");
const CustomError = require("../lib/error");
const Enum = require("../config/enum");

router.get("/", async (req, res, next) => {
  try {
    let categories = await Categrories.find({});
    res.json(Response.successResponse(categories));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
});

router.post("/add", async (req, res, next) => {
  let body = req.body;
  try {
    if (!body.name) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALIDATION_ERROR",
        "Name is required"
      );
    }

    let category = new Categrories({
      name: body.name,
      is_active: true,
      created_by: req.user?.id,
    });

    await category.save();
    res.json(Response.successResponse({ success: true }));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
});

router.post("/update", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALIDATION_ERROR",
        "ID is required"
      );
    }
    let update = {};
    if (body.name) {
      update.name = body.name;
    }
    if (typeof body.is_active === "boolean") {
      update.is_active = body.is_active;
    }

    await Categrories.updateOne({ _id: body._id }, update);
    res.json(Response.successResponse({ success: true }));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALIDATION_ERROR",
        "ID is required"
      );
    }

    await Categrories.deleteOne({ _id: body._id });
    res.json(Response.successResponse({ success: true }));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
});

module.exports = router;
