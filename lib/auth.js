import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from './mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error('User not found');
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error('Incorrect password');
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};