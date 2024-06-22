import { getUserByEmail } from "@/services/fetch-users";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentails",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email) {
            throw new Error("Invalid Credentials Format");
          }

          const user = await getUserByEmail(
            credentials.email.toLocaleLowerCase()
          );

          if (!user) {
            throw new Error("Incorrect email or password.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password!
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect email or password.");
          }

          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
};
