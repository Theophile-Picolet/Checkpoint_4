import type { RequestHandler } from "express";

// Import access to data
import reservationRepository from "./reservationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const reservations = await reservationRepository.readAll();

    // Respond with the items in JSON format
    res.json(reservations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const reservationId = Number(req.params.id);
    const reservation = await reservationRepository.read(reservationId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.json(reservation);
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
    const reservation = {
      type: req.body.type,
      user_id: req.body.user_id,
      visite_id: req.body.visite_id || null,
      degustation_id: req.body.degustation_id || null,
    };

    // Create the item
    const insertId = await reservationRepository.create(reservation);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const reservation = {
      id: Number(req.params.id),
      type: req.body.type,
      user_id: req.body.user_id,
      visite_id: req.body.visite_id || null,
      degustation_id: req.body.degustation_id || null,
    };
    const affectedRows = await reservationRepository.update(reservation);
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
    const reservationId = Number(req.params.id);
    await reservationRepository.delete(reservationId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
