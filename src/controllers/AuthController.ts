import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt-ts";

const AuthController = {
  hashPassword: function hashPassword(password: string) {
    const hashedPass = genSalt(10)
      .then((salt) => hash(password, salt))

    return hashedPass;
  },
  compareCredentials: async function compareCredentials(email: any, password: string){
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({where: {email: email}});
    const verifiedPassword = user && await compare(password, user.password as string)
    
    return verifiedPassword ? { status: true, userData: user } : { status: false, userData: {}};
  },
};

export default AuthController;
