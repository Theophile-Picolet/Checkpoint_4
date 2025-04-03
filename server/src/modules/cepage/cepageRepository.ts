import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Cepage = {
  id: number;
  nom: string;
};

class CepageRepository {
  // The C of CRUD - Create operation

  async create(cepage: Omit<Cepage, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Cepage (nom) values (?)",
      [cepage.nom],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Cepage where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Cepage;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from Cepage");

    // Return the array of items
    return rows as Cepage[];
  }

  // The U of CRUD - Update operation
  async update(cepage: Cepage) {
    const [result] = await databaseClient.query<Result>(
      "update Cepage set nom = ? where id = ?",
      [cepage.nom, cepage.id],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Cepage where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CepageRepository();
