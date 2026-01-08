import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all records
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// GET single record by id
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Record not found");
    else res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// POST new record
router.post("/", async (req, res) => {
  try {
    const collection = db.collection("records");
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result.ops[0]); // return the created document
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// PATCH (update) a record by id
router.patch("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    const result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// DELETE a record
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
