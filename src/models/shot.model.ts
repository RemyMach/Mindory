import {
    BelongsToManyAddAssociationMixin, BelongsToSetAssociationMixin,
    DataTypes,
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

export interface ShotProps {
    id: number;
    isValid: number;
    time: number;
}

export interface ShotCreationProps extends Optional<ShotProps, "id"> {}

export interface ShotInstance extends Model<ShotProps, ShotCreationProps>, ShotProps {
    addCard: BelongsToManyAddAssociationMixin<CardInstance,"Id">
    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    setPart: BelongsToSetAssociationMixin<PartInstance, "id">;
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
            allowNull: false,
            defaultValue: false
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
