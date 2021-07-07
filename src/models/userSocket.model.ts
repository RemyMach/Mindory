import {
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin, BelongsToSetAssociationMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {UserInstance} from "./user.model";
import {RoomInstance} from "./room.model";

export interface UserSocketProps {
    id: number;
    socketId: string;
}

export interface UserSocketCreationProps extends Optional<UserSocketProps, "id"> {}

export interface UserSocketInstance extends Model<UserSocketProps, UserSocketCreationProps>, UserSocketProps {

    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;
    setRoom: BelongsToSetAssociationMixin<RoomInstance, "id">;
    getRoom: BelongsToGetAssociationMixin<RoomInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<UserSocketInstance> {
    return sequelize.define<UserSocketInstance>("UserSocket", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        socketId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
