import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Visite = {
  id: number;
  type: string;
  description: string;
  prix: string;
};

class VisiteRepository {
  // The C of CRUD - Create operation

  async create(visite: Omit<Visite, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Visite (description, prix) values (?, ?)",
      [visite.description, visite.prix],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Visite where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Visite;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from Visite");

    // Return the array of items
    return rows as Visite[];
  }

  // The U of CRUD - Update operation
  async update(visite: Visite) {
    const [result] = await databaseClient.query<Result>(
      "update Visite set type = ?, description = ?, prix = ? where id = ?",
      [visite.type, visite.description, visite.prix, visite.id],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Visite where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new VisiteRepository();
