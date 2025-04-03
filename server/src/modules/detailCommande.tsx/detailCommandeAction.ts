import type { RequestHandler } from "express";

// Import access to data
import detailCommandeRepository from "./detailCommandeRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const detailCommande = {
      commande_id: req.body.commande_id,
      vin_id: req.body.vin_id,
      quantite: req.body.quantite,
    };

    const insertId = await detailCommandeRepository.create(detailCommande);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const browse: RequestHandler = async (req, res, next) => {
  try {
    const commandes = await detailCommandeRepository.readAll();

    res.json(commandes);
  } catch (err) {
    next(err);
  }
};
const getVins: RequestHandler = async (req, res, next) => {
  try {
    const commande_id = Number(req.params.id);
    const vins =
      await detailCommandeRepository.getVinsByCommandeId(commande_id);

    res.status(200).json(vins);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const detailCommande = {
      commande_id: req.body.commande_id,
      vin_id: req.body.vin_id,
      quantite: req.body.quantite,
    };

    const affectedRows =
      await detailCommandeRepository.updateVinQuantite(detailCommande);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Quantite mise à jour avec succès" });
    } else {
      res.status(404).json({ message: "detail de la commande non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const detailCommande = {
      commande_id: req.body.commande_id,
      vin_id: req.body.vin_id,
    };
    const affectedRows =
      await detailCommandeRepository.deleteVinFromCommande(detailCommande);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Vin(s) supprimé(s) de la commande" });
    } else {
      res.status(404).json({ message: " Vins non trouvés" });
    }
  } catch (err) {
    next(err);
  }
};

const getPrixTotal: RequestHandler = async (req, res, next) => {
  try {
    const commandeId = Number(req.params.id);
    const prixTotal =
      await detailCommandeRepository.getPrixTotalByCommandeId(commandeId);

    res.status(200).json({ commande_id: commandeId, prix_total: prixTotal });
  } catch (err) {
    next(err);
  }
};

export default { add, getVins, browse, getPrixTotal, edit, destroy };
