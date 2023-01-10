import passport from "passport";

const login = (req, rep) => {
    rep.redirect('/dashboard');
}

const me = (req, rep) => {
    rep.send(req.user);
}

export {
    me,
    login
};