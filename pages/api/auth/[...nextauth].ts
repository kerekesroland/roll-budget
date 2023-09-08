import * as argon2 from "argon2";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        //Check if user exists

        if (!user) {
          throw new Error("User not found");
        }

        //Check if user password is correct

        if (user.password) {
          const password = await argon2.verify(
            user.password,
            credentials.password,
          );

          if (!password) {
            throw new Error("Invalid credentials");
          }
        }
        //Check if user is activated

        if (!user.activated) {
          throw new Error("User is not activated yet!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/dashboard",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
