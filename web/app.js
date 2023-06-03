const express = require("express");
const passport = require("passport");
const strategy = require("passport-discord").Strategy;
const path = require("path");
const url = require("url");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");

module.exports = async (client) => {
  const app = express();
  const session = require("express-session");
  const MemoryStore = require("memorystore")(session);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views/"));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use(
    new strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://cookiez.ml/callback",
        scope: ["identify", "guilds"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret: "SECRETDASHBOARDTANO",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "/public")));
  app.use(express.static(path.join(__dirname, "/"), { dotfiles: "allow" }));

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  app.get(
    `/login`,
    (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = `/`;
      }
      next();
    },
    passport.authenticate(`discord`, { prompt: `none`, session: true })
  );

  app.get(
    `/callback`,
    passport.authenticate(`discord`, { failureRedirect: "/", session: true }),
    async (req, res) => {
      res.redirect(`/`);
    }
  );

  app.get("/", (req, res) => {
    res.render("home-page/index.ejs", {
      bot: client,
      user: req.isAuthenticated ? req.user : null,
    });
  });

  app.get("/dashboard", (req, res) => {
    res.render("dashboard/main.ejs", {
      user: req.isAuthenricated ? req.user : null,
      bot: client,
    });
  });

  // --- user
  app.get("/user/properties/avatar/:ID", (req, res) => {
    const user = req.isAuthenticated ? req.user : null;
    const ID = req.params.ID;

    res.render("user/avatar.ejs", {
      bot: client,
      user: user,
      ID: ID,
    });
  });

  // --- extra
  app.get("/redirect", (req, res) => {
    const URL = req.query.url;
    if (URL) {
      res.redirect(URL);
    } else {
      res.send("No URL or invalid url");
    }
  });

  app.get("*", function (req, res) {
    res.render("404.ejs", {
      user: req.isAuthenticated ? req.user : null,
      bot: client,
    });
  });

  app.listen(443, () => {
    console.log(
      client.colors.ok("[WEBSITE] ->"),
      client.colors.afterOk("Website is online at: https://cookiez.ml")
    );
  });
};
