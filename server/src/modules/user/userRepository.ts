import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  hashedPassword: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into User (first_name, last_name, email, tel, hashed_password) values (?, ?, ?, ?, ?)",
      [
        user.first_name,
        user.last_name,
        user.email,
        user.tel,
        user.hashedPassword,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from User where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from User");

    // Return the array of items
    return rows as User[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from User where email = ?",
      [email],
    );
    return rows[0];
  }

  // The U of CRUD - Update operation
  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "update User set first_name = ?, last_name = ?, email = ?, tel = ?, hashed_password = ?, where id = ?",
      [
        user.first_name,
        user.last_name,
        user.email,
        user.tel,
        user.hashedPassword,
        user.id,
      ],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from User where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
