import type { RequestHandler } from "express";

// Import access to data
import cepageRepository from "./cepageRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const cepages = await cepageRepository.readAll();

    // Respond with the items in JSON format
    res.json(cepages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const cepageId = Number(req.params.id);
    const cepage = await cepageRepository.read(cepageId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (cepage == null) {
      res.sendStatus(404);
    } else {
      res.json(cepage);
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
    const cepage = {
      nom: req.body.nom,
    };

    // Create the item
    const insertId = await cepageRepository.create(cepage);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const cepage = {
      id: Number(req.params.id),
      nom: req.body.nom,
    };
    const affectedRows = await cepageRepository.update(cepage);
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
    const cepageId = Number(req.params.id);
    await cepageRepository.delete(cepageId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
