import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Degustation = {
  id: number;
  description: string;
  prix: string;
};

class DegustationRepository {
  // The C of CRUD - Create operation

  async create(degustation: Omit<Degustation, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Degustation (description, prix) values (?, ?)",
      [degustation.description, degustation.prix],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Degustation where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Degustation;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from Degustation",
    );

    // Return the array of items
    return rows as Degustation[];
  }

  // The U of CRUD - Update operation
  async update(degustation: Degustation) {
    const [result] = await databaseClient.query<Result>(
      "update Degustation set description = ?, prix = ? where id = ?",
      [degustation.description, degustation.prix, degustation.id],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Degustation where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new DegustationRepository();
