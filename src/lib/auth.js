import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import User from "../models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }).select("+password");


          if (!user) {
            throw new Error("No user found with this email");
          }
          console.log(user);
          console.log(user.password);
          console.log(credentials.password);

        //   const isValid = await bcrypt.compare(credentials.password, user.password);
          const isValid = credentials.password ==user.password ? true : false ;

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.credits = user.credits;
        token.subscription = user.subscription;
        token.maxPromptWords = user.maxPromptWords;
        token.maxVideoLength = user.maxVideoLength;
        token.maxAudioLength = user.maxAudioLength;
        token.name = user.name;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.credits = token.credits;
        session.user.subscription = token.subscription;
        session.user.maxPromptWords = token.maxPromptWords;
        session.user.maxVideoLength = token.maxVideoLength;
        session.user.maxAudioLength = token.maxAudioLength;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
