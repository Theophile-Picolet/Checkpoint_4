import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Reservation = {
  id: number;
  date: Date;
  type: string;
  user_id: number;
  visite_id: number | null;
  degustation_id: number | null;
};

class ReservationRepository {
  // The C of CRUD - Create operation

  async create(reservation: Omit<Reservation, "id" | "date">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Reservation (type, user_id, visite_id, degustation_id) values (?, ?, ?, ?)",
      [
        reservation.type,
        reservation.user_id,
        reservation.visite_id,
        reservation.degustation_id,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Reservation where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Reservation;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from Reservation",
    );

    // Return the array of items
    return rows as Reservation[];
  }

  // The U of CRUD - Update operation
  async update(reservation: Omit<Reservation, "date">) {
    const [result] = await databaseClient.query<Result>(
      "update Reservation set type = ?, user_id = ?, visite_id = ?, degustation_id = ? where id = ?",
      [
        reservation.type,
        reservation.user_id,
        reservation.visite_id,
        reservation.degustation_id,
        reservation.id,
      ],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Reservation where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ReservationRepository();
