import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../lib/prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email }],
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email,
              name: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
              provider: "GOOGLE",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
