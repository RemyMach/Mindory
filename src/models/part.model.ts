import  {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {UserInstance} from "./user.model";

export interface PartProps {
    id: number;
    time: number;
    mistakes: number;
    shots: number;
}

export interface PartCreationProps extends Optional<PartProps, "id"> {}

export interface PartInstance extends Model<PartProps, PartCreationProps>, PartProps {
}

export default function(sequelize: Sequelize): ModelCtor<PartInstance> {
    return sequelize.define<PartInstance>("Part", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        mistakes: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        shots: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
