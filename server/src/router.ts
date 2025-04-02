import express from "express";
import auth from "./middlewares/auth";

const router = express.Router();

/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/user/userActions";

router.get("/api/user", auth.verify, auth.checkIfAdmin, userActions.browse);
router.get("/api/user/:id", auth.verify, userActions.read);
router.post("/api/user", auth.hashPassword, userActions.add);
router.post("/api/login", auth.login);
router.put("/api/user/:id", auth.verify, auth.checkIfAdmin, userActions.edit);
router.delete(
  "/api/user/:id",
  auth.verify,
  auth.checkIfAdmin,
  userActions.destroy,
);
/* ************************************************************************* */
import degustationAction from "./modules/degustation/degustationAction";

router.get("/api/degustation", degustationAction.browse);
router.get("/api/degustation/:id", degustationAction.read);
router.post(
  "/api/degustation",
  auth.verify,
  auth.checkIfAdmin,
  degustationAction.add,
);
router.put(
  "/api/degustation/:id",
  auth.verify,
  auth.checkIfAdmin,
  degustationAction.edit,
);
router.delete(
  "/api/degustation/:id",
  auth.verify,
  auth.checkIfAdmin,
  degustationAction.destroy,
);

/* ************************************************************************* */
import visiteAction from "./modules/visite/visiteAction";

router.get("/api/visite", visiteAction.browse);
router.get("/api/visite/:id", visiteAction.read);
router.post("/api/visite", auth.verify, auth.checkIfAdmin, visiteAction.add);
router.put(
  "/api/visite/:id",
  auth.verify,
  auth.checkIfAdmin,
  visiteAction.edit,
);
router.delete(
  "/api/visite/:id",
  auth.verify,
  auth.checkIfAdmin,
  visiteAction.destroy,
);

/* ************************************************************************* */
import reservationAction from "./modules/reservation/reservationAction";

router.get(
  "/api/reservation",
  auth.verify,
  auth.checkIfAdminOrUser,
  reservationAction.browse,
);
router.get(
  "/api/reservation/:id",
  auth.verify,
  auth.checkIfAdminOrUser,
  reservationAction.read,
);
router.post(
  "/api/reservation",
  auth.verify,
  auth.checkIfAdminOrUser,
  reservationAction.add,
);
router.put(
  "/api/reservation/:id",
  auth.verify,
  auth.checkIfAdmin,
  reservationAction.edit,
);
router.delete(
  "/api/reservation/:id",
  auth.verify,
  auth.checkIfAdmin,
  reservationAction.destroy,
);
/* ************************************************************************* */

import vinAction from "./modules/vin/vinAction";

router.get("/api/vin", vinAction.browse);
router.get("/api/vin/:id", vinAction.read);
router.post("/api/vin", auth.verify, auth.checkIfAdmin, vinAction.add);
router.put("/api/vin/:id", auth.verify, auth.checkIfAdmin, vinAction.edit);
router.delete(
  "/api/vin/:id",
  auth.verify,
  auth.checkIfAdmin,
  vinAction.destroy,
);

/* ************************************************************************* */
import cepageAction from "./modules/cepage/cepageAction";
router.get("/api/cepage", cepageAction.browse);
router.get("/api/cepage/:id", cepageAction.read);
router.post("/api/cepage", auth.verify, auth.checkIfAdmin, cepageAction.add);
router.put(
  "/api/cepage/:id",
  auth.verify,
  auth.checkIfAdmin,
  cepageAction.edit,
);
router.delete(
  "/api/cepage/:id",
  auth.verify,
  auth.checkIfAdmin,
  cepageAction.destroy,
);

/* ************************************************************************* */
import commandeAction from "./modules/commande/commande.Action";

router.get(
  "/api/commande",
  auth.verify,
  auth.checkIfAdminOrUser,
  commandeAction.browse,
);
router.get(
  "/api/commande/:id",
  auth.verify,
  auth.checkIfAdminOrUser,
  commandeAction.read,
);
router.post(
  "/api/commande",
  auth.verify,
  auth.checkIfAdminOrUser,
  commandeAction.add,
);
router.put(
  "/api/commande/:id",
  auth.verify,
  auth.checkIfAdmin,
  commandeAction.edit,
);
router.delete(
  "/api/commande/:id",
  auth.verify,
  auth.checkIfAdmin,
  commandeAction.destroy,
);

/* ************************************************************************* */
export default router;
