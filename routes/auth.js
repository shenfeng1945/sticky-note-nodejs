var express = require('express')
var router = express.Router()
//处理oauth2相关的认证
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function (user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'f61abe02670bf5c52f68',
    clientSecret: '452c7c72fd4db8f063172f2ea1ee060f21155b74',
    callbackURL: "http://shenfeng1945.top:8080/sticky/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // });
        done(null, profile);
    }
));
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/sticky');
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/sticky');
    });


module.exports = router;