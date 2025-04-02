import type { RequestHandler } from "express";

// Import access to data
import vinRepository from "./vinRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const vins = await vinRepository.readAll();

    // Respond with the items in JSON format
    res.json(vins);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const vinId = Number(req.params.id);
    const vin = await vinRepository.read(vinId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (vin == null) {
      res.sendStatus(404);
    } else {
      res.json(vin);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const vin = {
      type: req.body.type,
      appellation: req.body.appellation,
      nom: req.body.nom,
      millesime: req.body.millesime,
      alcoometrie: req.body.alcoometrie,
      description: req.body.description || null,
      prix: req.body.prix,
      accordMet: req.body.accordMet || null,
      temperatureDegustation: req.body.temperatureDegustation || null,
      elevage: req.body.elevage || null,
    };

    // Create the item
    const insertId = await vinRepository.create(vin);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const vin = {
      id: Number(req.params.id),
      type: req.body.type,
      appellation: req.body.appellation,
      nom: req.body.nom,
      millesime: req.body.millesime,
      alcoometrie: req.body.alcoometrie,
      description: req.body.description || null,
      prix: req.body.prix,
      accordMet: req.body.accordMet || null,
      temperatureDegustation: req.body.temperatureDegustation || null,
      elevage: req.body.elevage || null,
    };
    const affectedRows = await vinRepository.update(vin);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const vinId = Number(req.params.id);
    await vinRepository.delete(vinId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
