"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Session", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: true
    });
}
exports.default = default_1;
