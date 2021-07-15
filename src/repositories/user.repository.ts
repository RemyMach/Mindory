import { UserController } from "../controllers/user.controller";
import { UserCreateProps, UserInstance, UserUpdateOptions } from "../models/user.model";
import {Op} from 'sequelize';
import { RoleInstance } from "../models/role.model";
import {PartInstance} from "../models/part.model";
import {PartController} from "../controllers/part.controller";

export class UserRepository {

    public static async getAllUsers(offset: number, limit: number): Promise<UserInstance[]> {

        const userController = await UserController.getInstance();
        return await userController.user.findAll({
            attributes: ['name', 'surname', 'email'],
            include: [{
                model: userController.role,
                attributes: ['label']
            }],
            offset, 
            limit
        });
        
    }

    public static async getUserByToken(token: string): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id', 'name', 'surname', 'email', 'username'],
            include: [{
                model: userController.role,
                attributes: ['label']
            },
            {
                model: userController.session,
                attributes: [],
                where: {
                    token
                }
            }],
        });
    }

    public static async getUserByEmail(email: string): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                email
            }
        });
    }


    public static async getUserById(id: number): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            }
        });
    }

    public static async getCompleteUserById(id: number): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            },
            include: [{
                model: userController.role,
                attributes: ['label']
            }]
        });
    }

    public static async getUserByIdAndVerifyRole(id: number, role_labels: string[]): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            },
            include: [{
                model: userController.role,
                attributes: ['label'],
                where: {
                    [Op.or]: {label: role_labels}
                }
            }]
        });
    }

    public static async getUserEncryptedPassword(token: string): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        return await userController.user.findOne({
            attributes: ['password'],
            include: [{
                model: userController.session,
                attributes: [],
                where: {
                    token
                }
            }],
        });
    }

    public static async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);
    
        const email_user = user?.email;
       
        const props_convert = JSON.parse(JSON.stringify(props));
        
        if(email_user === undefined) {
            return null;
        }
        await userController.user.update(
            props_convert,
            {
                where: {
                    email: email_user
                }
            });

        return await userController.getUser(token);
    }

    public static async updateUserpassword(user: UserInstance, new_password: string | undefined): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();

        const email_user = user?.email;
        
        if(email_user === undefined || new_password === undefined) {
            return null;
        }

        await userController.user.update(
            {
                password: new_password
            },
            {
                where: {
                    email: email_user.toString().trim()
                },
                individualHooks: true
            });

        return await userController.getUserByEmail(email_user);
    }

    public static async deleteUser(token: string): Promise<void | null> {
        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);

        const email_user = user?.email;
        
        if(email_user === undefined){
            return null;
        }

        await userController.user.destroy({
            where: {
                email: email_user
            },
            individualHooks: true
        });
    }

    public static async userIsInPart(part: PartInstance, user: UserInstance): Promise<UserInstance | null> {
        const partController = await PartController.getInstance();
        return await partController.user.findOne({
            where: {
                id: user.id
            },
            include: [{
                required: true,
                model: partController.part,
                where: {
                    id: part.id
                }
            }]
        })
    }

}
