import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Commande = {
  id: number;
  date: Date;
  statut: string;
  user_id: number;
};

class CommandeRepository {
  // The C of CRUD - Create operation

  async create(commande: Omit<Commande, "id" | "date">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Commande (statut, user_id) values (?, ?)",
      [commande.statut, commande.user_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Commande where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Commande;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from Commande");

    // Return the array of items
    return rows as Commande[];
  }

  // The U of CRUD - Update operation
  async update(commande: Omit<Commande, "date">) {
    const [result] = await databaseClient.query<Result>(
      "update Commande set statut = ?, user_id = ? where id = ?",
      [commande.statut, commande.user_id, commande.id],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Commande where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CommandeRepository();
