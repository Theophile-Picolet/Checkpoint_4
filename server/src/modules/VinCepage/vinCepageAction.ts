import type { RequestHandler } from "express";

// Import access to data
import vinCepageRepository from "./vinCepageRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const vinCepage = {
      vin_id: req.body.vin_id,
      cepage_id: req.body.cepage_id,
      proportion: req.body.proportion,
    };

    const insertId = await vinCepageRepository.create(vinCepage);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export const getCepagesVin: RequestHandler = async (req, res, next) => {
  try {
    const vin_id = Number(req.params.id);
    const cepages = await vinCepageRepository.getCepagesForVin(vin_id);

    res.status(200).json(cepages);
  } catch (err) {
    next(err);
  }
};

export const editProportion: RequestHandler = async (req, res, next) => {
  try {
    const vinCepage = {
      vin_id: req.body.vin_id,
      cepage_id: req.body.cepage_id,
      proportion: req.body.proportion,
    };

    const affectedRows = await vinCepageRepository.updateProportion(vinCepage);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Proportion mise à jour avec succès" });
    } else {
      res.status(404).json({ message: "Association vin-cépage non trouvée" });
    }
  } catch (err) {
    next(err);
  }
};

export const destroy: RequestHandler = async (req, res, next) => {
  try {
    const vinCepage = {
      vin_id: Number(req.params.id),
      cepage_id: req.body.cepage_id,
    };
    const affectedRows =
      await vinCepageRepository.removeCepageFromVin(vinCepage);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Cépage retiré du vin avec succès" });
    } else {
      res.status(404).json({ message: "Association vin-cépage non trouvée" });
    }
  } catch (err) {
    next(err);
  }
};

export default { add, getCepagesVin, editProportion, destroy };
