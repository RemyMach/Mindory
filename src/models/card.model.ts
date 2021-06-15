import  {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {UserInstance} from "./user.model";

export interface CardProps {
    id: number;
    text: string;
    image: any;
}

export interface CardCreationProps extends Optional<CardProps, "id"> {}

export interface CardInstance extends Model<CardProps, CardCreationProps>, CardProps {
}

export default function(sequelize: Sequelize): ModelCtor<CardInstance> {
    return sequelize.define<CardInstance>("Card", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
