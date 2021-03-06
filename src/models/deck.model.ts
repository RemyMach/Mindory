import {
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {UserInstance} from "./user.model";
import {SessionInstance} from "./session.model";
import {CardInstance} from "./card.model";

export interface DeckProps {
    id: number;
    title: string;
    image: string;
}

export interface DeckCreationProps extends Optional<DeckProps, "id"> {}

export interface DeckInstance extends Model<DeckProps, DeckCreationProps>, DeckProps {
    addCards: HasManyAddAssociationMixin<CardInstance, "id">;
    getCards: HasManyGetAssociationsMixin<CardInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<DeckInstance> {
    return sequelize.define<DeckInstance>("Deck", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
