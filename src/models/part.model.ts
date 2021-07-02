import  {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {UserInstance} from "./user.model";

export interface PartProps {
    id: number;
    time: number;
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
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
