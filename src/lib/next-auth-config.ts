import { loginHandle } from '@/user/infrastructure/next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Habit Loop',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return await loginHandle({ ...credentials });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/auth/login',
  },
};
