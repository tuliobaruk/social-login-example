import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { findOrCreateUser } from './userService';
import { PrismaClient } from '@prisma/client';
import { GitHubProfile, DoneFunction } from './types';

const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
}, async (_, __, profile, done) => {
  const user = await findOrCreateUser(profile);
  done(null, user);
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: '/auth/github/callback',
}, async (_: string, __: string, profile: GitHubProfile, done: DoneFunction) => {
  const user = await findOrCreateUser(profile);
  done(null, user);
}));
