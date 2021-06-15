import {ModelCtor, Sequelize} from "sequelize";
import userCreator, {UserInstance} from "./user.model";
import sessionCreator, {SessionInstance} from "./session.model";
import {Dialect} from "sequelize/types/lib/sequelize";
import roleCreator, {RoleInstance} from "./role.model";
import passwordResetCreator, {PasswordResetInstance} from "./passwordReset.model";
import cardCreator, {CardInstance} from "./card.model";
import deckCreator, {DeckInstance} from "./deck.model";


export interface SequelizeManagerProps {
    sequelize: Sequelize;
    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;
    passwordReset: ModelCtor<PasswordResetInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager

    sequelize: Sequelize;
    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;
    passwordReset: ModelCtor<PasswordResetInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;


    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string),
            logging: false
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            user: userCreator(sequelize),
            session: sessionCreator(sequelize),
            role: roleCreator(sequelize),
            passwordReset: passwordResetCreator(sequelize),
            card: cardCreator(sequelize),
            deck: deckCreator(sequelize)
        }

        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {

        props.user.hasMany(props.session); // User N Session
        props.session.belongsTo(props.user, {foreignKey: 'user_id'}); // Session 1 User

        props.role.hasMany(props.user); // User N Session
        props.user.belongsTo(props.role, {foreignKey: 'role_id'}); // Session 1 User

        props.user.hasMany(props.passwordReset);
        props.passwordReset.belongsTo(props.user,{foreignKey: 'user_id'});

        props.card.belongsTo(props.card, {foreignKey: 'card_associate_id', as: 'cardAssociate'});
        props.deck.hasMany(props.card);
        props.card.belongsTo(props.deck, {foreignKey: 'deck_id'});
    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.user = props.user;
        this.session = props.session;
        this.role = props.role;
        this.passwordReset = props.passwordReset;
        this.card = props.card;
        this.deck = props.deck;
    }
}
