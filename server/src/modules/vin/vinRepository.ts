import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Vin = {
  id: number;
  type: string;
  appellation: string;
  nom: string;
  millesime: number;
  alcoometrie: string;
  description: string | null;
  prix: number;
  accordMet: string | null;
  temperatureDegustation: number | null;
  elevage: string | null;
};

class VinRepository {
  // The C of CRUD - Create operation

  async create(vin: Omit<Vin, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Vin (type, appellation, nom, millesime, alcoometrie, description, prix, accordMet, temperatureDegustation, elevage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        vin.type,
        vin.appellation,
        vin.nom,
        vin.millesime,
        vin.alcoometrie,
        vin.description,
        vin.prix,
        vin.accordMet,
        vin.temperatureDegustation,
        vin.elevage,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      v.*, 
      vc.cepage_id, 
      vc.proportion, 
      c.nom AS cepage_nom
   FROM Vin v
   LEFT JOIN VinCepage vc ON v.id = vc.vin_id
   LEFT JOIN Cepage c ON vc.cepage_id = c.id
   WHERE v.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Vin;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from Vin");

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  async update(vin: Vin) {
    const [result] = await databaseClient.query<Result>(
      "update Vin set type = ?, appellation = ?, nom = ?, millesime = ?, alcoometrie = ?, description = ?, prix = ?, accordMet = ?, temperatureDegustation = ?, elevage = ? where id = ?",
      [
        vin.type,
        vin.appellation,
        vin.nom,
        vin.millesime,
        vin.alcoometrie,
        vin.description,
        vin.prix,
        vin.accordMet,
        vin.temperatureDegustation,
        vin.elevage,
        vin.id,
      ],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Vin where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new VinRepository();
