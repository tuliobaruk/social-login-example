import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import './passportConfig';
import { rolePermissions } from './permissions';
import { getAllUsers } from './userService';

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('login'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

app.get('/dashboard', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  const user = req.user as { role: 'ADMIN' | 'USER' };
  const permissions = rolePermissions[user.role];
  const users = user.role === 'ADMIN' ? await getAllUsers() : [];

  res.render('dashboard', { user, permissions, users });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    });
  });


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
