import type { RequestHandler } from "express";

// Import access to data
import commandeRepository from "./commande.Repository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const commandes = await commandeRepository.readAll();

    // Respond with the items in JSON format
    res.json(commandes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const commandeId = Number(req.params.id);
    const commande = await commandeRepository.read(commandeId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (commande == null) {
      res.sendStatus(404);
    } else {
      res.json(commande);
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
    const commande = {
      statut: req.body.statut,
      user_id: req.user.id,
    };

    // Create the item
    const insertId = await commandeRepository.create(commande);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const commande = {
      id: Number(req.params.id),
      statut: req.body.statut,
      user_id: req.user.id,
    };
    const affectedRows = await commandeRepository.update(commande);
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
    const commandeId = Number(req.params.id);
    await commandeRepository.delete(commandeId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
