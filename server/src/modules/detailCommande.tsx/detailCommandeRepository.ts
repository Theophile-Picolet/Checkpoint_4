import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type DetailCommande = {
  commande_id: number;
  vin_id: number;
  quantite: number;
};

class DetailCommandeRepository {
  async create(detailCommande: DetailCommande) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO DetailCommande (commande_id, vin_id, quantite) VALUES (?, ?, ?)",
      [
        detailCommande.commande_id,
        detailCommande.vin_id,
        detailCommande.quantite,
      ],
    );
    return result.affectedRows;
  }

  // récupérer tous les cépages d'un vin spécifique
  async getVinsByCommandeId(id: number) {
    const [rows] = await databaseClient.query<Rows[]>(
      `SELECT d.vin_id, v.nom, d.quantite
         FROM DetailCommande d
         JOIN Vin v ON d.vin_id = v.id
         WHERE d.commande_id = ?`,
      [id],
    );
    return rows;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from DetailCommande",
    );

    // Return the array of items
    return rows as DetailCommande[];
  }

  async updateVinQuantite(detailCommande: DetailCommande) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE DetailCommande SET quantite = ? WHERE commande_id = ? AND vin_id = ?",
      [
        detailCommande.quantite,
        detailCommande.commande_id,
        detailCommande.vin_id,
      ],
    );
    return result.affectedRows;
  }

  async deleteVinFromCommande(
    detailCommande: Omit<DetailCommande, "quantite">,
  ) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM DetailCommande WHERE commande_id = ? AND vin_id = ?",
      [detailCommande.commande_id, detailCommande.vin_id],
    );
    return result.affectedRows;
  }

  //   async getPrixTotalByCommandeId(commandeId: number): Promise<number> {
  //     const [rows] = await databaseClient.query(
  //       `SELECT
  //           SUM(dc.quantite * v.prix) AS prix_total
  //        FROM
  //           DetailCommande dc
  //        JOIN
  //           Vin v ON dc.vin_id = v.id
  //        WHERE
  //           dc.commande_id = ?
  //        GROUP BY
  //           dc.commande_id`,
  //       [commandeId],
  //     );

  //     // Retourne le prix total ou 0 si aucune ligne n'est trouvée
  //     return (rows[0]?.prix_total as number) || 0;
  //   }
}

export default new DetailCommandeRepository();
