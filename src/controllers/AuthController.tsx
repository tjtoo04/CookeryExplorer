import { compare, genSalt, hash } from "bcrypt-ts";
import { prisma } from "~/prisma";

const AuthController = {
  hashPassword: function hashPassword(password: string) {
    const hashedPass = genSalt(10)
      .then((salt) => hash(password, salt))

    return hashedPass;
  },
  compareCredentials: async function compareCredentials(credentials){
    console.log(credentials)
    const user = await prisma.user.findUnique({where: {email: credentials.email}});
    const verifiedPassword = user && await compare(credentials.password, user.password as string)

    console.log('user')
    return verifiedPassword ? user : null;
  },
};

export default AuthController;
