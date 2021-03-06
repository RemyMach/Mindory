import {
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin, BelongsToSetAssociationMixin,
    DataTypes, HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {UserInstance} from "./user.model";
import {CardInstance} from "./card.model";
import {DeckInstance} from "./deck.model";
import {PartInstance} from "./part.model";
import {SessionInstance} from "./session.model";
import {UserSocketInstance} from "./userSocket.model";

export interface RoomProps {
    id: number;
    token: string;
    keyword?: string;
}

export interface RoomCreationProps extends Optional<RoomProps, "id"> {}

export interface RoomInstance extends Model<RoomProps, RoomCreationProps>, RoomProps {

    addUser: BelongsToManyAddAssociationMixin<UserInstance, "id">;
    addUserSocket: HasManyAddAssociationMixin<UserSocketInstance, "id">;
    getUserSockets: HasManyGetAssociationsMixin<UserSocketInstance>;
    getPart: BelongsToGetAssociationMixin<PartInstance>;
    setPart: BelongsToSetAssociationMixin<PartInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<RoomInstance> {
    return sequelize.define<RoomInstance>("Room", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        keyword: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
