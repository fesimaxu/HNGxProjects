import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { UserAttributes } from "../utils/constants/index";




export class UserInstance extends Model<UserAttributes> {};


UserInstance.init({
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
            msg: `Password is required`
        },
        notEmpty: {
            msg: `Password is required`
        }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
    sequelize: db,
    tableName: `Person`
})