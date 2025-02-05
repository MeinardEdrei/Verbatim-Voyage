import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import { FindOrCreateUser } from "@/utils/userHelper"
import dbConnect from "@/lib/db"
import User from "@/models/User"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        try {
          const dbUser = await FindOrCreateUser({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
          token.id = dbUser._id;
        } catch (error) {
          console.error("Error in jwt callback: ", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      try {
        await dbConnect();
    
        const dbUser = await User.findById(token.id);
    
        if (dbUser) {
          session = {
            id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
          };
        } else {
          session = {
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.image,
          };
        }
      } catch (error) {
        console.error("Error in session callback: ", error);
    
        session = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
})

export { handler as GET, handler as POST }