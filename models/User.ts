import { Table, Column, Model, DataType } from "sequelize-typescript";
import jwt from "jsonwebtoken";

@Table({})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  generateAuthToken(): string {
    const token = jwt.sign(
      { id: this.id, email: this.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    return token;
  }
}
