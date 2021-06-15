import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {DeckInstance} from "./deck.model";

export interface CardProps {
    id: number;
    text?: string;
    image?: string;
}

export interface cardCreateOption {
    text?: string | null;
    image?: string;
    deck: DeckInstance;
    cardAssociate: CardInstance | null;
}

export interface CardCreationProps extends Optional<CardProps, "id"> {}

export interface CardInstance extends Model<CardProps, CardCreationProps>, CardProps {

    setCardAssociate: BelongsToSetAssociationMixin<CardInstance, "id">;
    getCardAssociate: BelongsToGetAssociationMixin<CardInstance>;

    setDeck: BelongsToSetAssociationMixin<DeckInstance, "id">;
    getDeck: BelongsToGetAssociationMixin<DeckInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<CardInstance> {
    return sequelize.define<CardInstance>("Card", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
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
