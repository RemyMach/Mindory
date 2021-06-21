import  {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {UserInstance} from "./user.model";

export interface ShotProps {
    id: number;
    isValid: number;
}

export interface ShotCreationProps extends Optional<ShotProps, "id"> {}

export interface ShotInstance extends Model<ShotProps, ShotCreationProps>, ShotProps {
}

export default function(sequelize: Sequelize): ModelCtor<ShotInstance> {
    return sequelize.define<ShotInstance>("Shot", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
