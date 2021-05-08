import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {UserInstance} from "./user.model";
import {RoleInstance} from "./role.model";

export interface PasswordResetProps {
    id: number;
    token: string;
}

export interface RoleUpdateOption {
    label: string;
}

export interface PasswordResetCreationProps extends Optional<PasswordResetProps, "id"> {}

export interface PasswordResetInstance extends Model<PasswordResetProps, PasswordResetCreationProps>, PasswordResetProps {
    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<PasswordResetInstance> {
    return sequelize.define<PasswordResetInstance>("Password_Reset", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
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
