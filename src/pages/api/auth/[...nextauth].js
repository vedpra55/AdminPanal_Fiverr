import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import dbConnect from "@/config/mongodb";
import User from "@/models/user";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,

      async profile(profile) {
        // find out the user
        await dbConnect();
        const oldUser = await User.findOne({ email: profile.email });
        const userProfile = {
          email: profile.email,
          name: profile.name || profile.login,
          avatar: profile.avatar_url,
          role: "user",
        };

        // store new user inside db
        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: "github",
          });

          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }
        return { id: profile.id, ...userProfile };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user?.email });
      if (user)
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        };
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
};
export default NextAuth(authOptions);
