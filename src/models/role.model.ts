import {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {UserInstance} from "./user.model";

export interface RoleProps {
    id: number;
    label: string;
}

export interface RoleUpdateOption {
    label: string;
}

export interface RoleCreationProps extends Optional<RoleProps, "id"> {}

export interface RoleInstance extends Model<RoleProps, RoleCreationProps>, RoleProps {
}

export default function(sequelize: Sequelize): ModelCtor<RoleInstance> {
    return sequelize.define<RoleInstance>("Role", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}