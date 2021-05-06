import {
    CreateOptions,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SessionInstance} from "./session.model";
import {RoleInstance} from "./role.model";
import {SessionRepository} from '../repositories/session.repository';
import {hash} from "bcrypt";


export interface UserAuthenticate {
    email: string;
    password: string;
}

export interface UserUpdateOptions {
    name?: string,
    surname?: string;
    email?: string;
    username?: string
}

export interface UserUpdatePasswordOptions {
    password?: string,
    new_password?: string;
    new_password_confirm?: string;
}

export interface UserCreateProps {
    name: string;
    surname: string;
    password: string;
    email: string;
    username: string;
}

export interface UserProps {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    username: string;
}

export interface UserCreationProps extends Optional<UserProps, "id"> {}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
    
    addSession: HasManyAddAssociationMixin<SessionInstance, "id">;
    getSessions: HasManyGetAssociationsMixin<SessionInstance>;

    setRole: BelongsToSetAssociationMixin<RoleInstance, "id">;
    getRole: BelongsToGetAssociationMixin<RoleInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<UserInstance> {
    const user = sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'email',
                msg: 'The email provide is already taken'
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'username',
                msg: 'The username provide is already taken'
            },
        },
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: true
    });

    user.addHook('beforeCreate', async (user: UserInstance, options: CreateOptions<UserProps>) => {
        const passwordHashed = await hash(user.password, 8);
        user.password = passwordHashed;
    });

    user.addHook('beforeUpdate', async (user: UserInstance, options: CreateOptions<UserProps>) => {
        const passwordHashed = await hash(user.password, 8);
        user.password = passwordHashed;
    });

    user.addHook('beforeDestroy', async (user: UserInstance, options: CreateOptions<UserProps>) => {

        await SessionRepository.deleteSessionsFromAUser(user);
    });


    return user;
}
