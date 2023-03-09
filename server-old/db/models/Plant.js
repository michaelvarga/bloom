// const Sequelize = require("sequelize");
// const db = require("../db");

// module.exports = db.define("plant", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   price: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   location: {
//     type: Sequelize.STRING,
//     defaultValue: "Outdoor",
//     validate: {
//       isIn: [["Outdoor", "Indoor"]],
//     },
//   },
//   care: {
//     type: Sequelize.STRING,
//     defaultValue: "Moderate",
//     validate: {
//       isIn: [["Moderate", "Easy", "No-Fuss"]],
//     },
//   },
//   imgUrl: {
//     type: Sequelize.STRING,
//     defaultValue:
//       "https://www.iconpacks.net/icons/2/free-plant-icon-1573-thumb.png",
//   },
//   inventory: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0,
//   },
// });

// import { DataTypes } from "sequelize";
const { DataTypes } = require('sequelize')
// const sequelize = new Sequelize("sqlite::memory:");
// import sequelize from "../../db";
const sequelize = require('../../db')

const Plant = sequelize.define("plant", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: "Outdoor",
    validate: {
      isIn: [["Outdoor", "Indoor"]],
    },
  },
  care: {
    type: DataTypes.STRING,
    defaultValue: "Moderate",
    validate: {
      isIn: [["Moderate", "Easy", "No-Fuss"]],
    },
  },
  imgurl: {
    type: DataTypes.STRING,
    defaultValue:
      "https://www.iconpacks.net/icons/2/free-plant-icon-1573-thumb.png",
  },
  inventory: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
});

// Create the User table in the database
Plant.sync();

module.exports = Plant;
