import { db } from "../config/db";
import bcrypt from "bcrypt"


interface UserInfo {
    email: string
    password: string
}

export const userModules = {
    createUser: async (userinfo: UserInfo) => {
        const {email, password} = userinfo
        const trx = await db.transaction()
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password + "", salt)

            const [user] = await trx("authusers").insert(
                { email, password: hashedPassword },
                ["email", "id"]
            );
            await trx.commit()
            return user

        } catch (error) {
            await trx.rollback()
            console.log(error)
            throw error
        }
    },
    getUserByEmail: async (email: string = "") => {
        return await db("authusers")
                .select("id", "email", "password")
                .where({email})
                .first()
    },
    getUsers: async()=>{
        try {
            return await db("authusers")
                .select("id", "email", "password")
           
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}