import type { RequestHandler } from "express";

// Import access to data
import degustationRepository from "./degustationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const degustations = await degustationRepository.readAll();

    // Respond with the items in JSON format
    res.json(degustations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const degustationId = Number(req.params.id);
    const degustation = await degustationRepository.read(degustationId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (degustation == null) {
      res.sendStatus(404);
    } else {
      res.json(degustation);
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
    const degustation = {
      description: req.body.description,
      prix: req.body.prix,
    };

    // Create the item
    const insertId = await degustationRepository.create(degustation);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const degustation = {
      id: Number(req.params.id),
      description: req.body.description,
      prix: req.body.prix,
    };
    const affectedRows = await degustationRepository.update(degustation);
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
    const degustationId = Number(req.params.id);
    await degustationRepository.delete(degustationId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
