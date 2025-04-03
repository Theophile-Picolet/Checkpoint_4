import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type VinCepage = {
  vin_id: number;
  cepage_id: number;
  proportion: number;
};

class VinCepageRepository {
  async create(vinCepage: VinCepage) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO VinCepage (vin_id, cepage_id, proportion) 
       VALUES (?, ?, ?)`,
      [vinCepage.vin_id, vinCepage.cepage_id, vinCepage.proportion],
    );
    return result.affectedRows;
  }

  // récupérer tous les cépages d'un vin spécifique
  async getCepagesForVin(id: number) {
    const [rows] = await databaseClient.query<Rows[]>(
      `SELECT C.id, C.nom, VC.proportion 
       FROM VinCepage VC
       JOIN Cepage C ON VC.cepage_id = C.id
       WHERE VC.vin_id = ?`,
      [id],
    );
    return rows;
  }

  async updateProportion(vinCepage: VinCepage) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE VinCepage 
       SET proportion = ? 
       WHERE vin_id = ? AND cepage_id = ?`,
      [vinCepage.proportion, vinCepage.vin_id, vinCepage.cepage_id],
    );
    return result.affectedRows;
  }

  async removeCepageFromVin(vinCepage: Omit<VinCepage, "proportion">) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM VinCepage 
       WHERE vin_id = ? AND cepage_id = ?`,
      [vinCepage.vin_id, vinCepage.cepage_id],
    );
    return result.affectedRows;
  }
}

export default new VinCepageRepository();
