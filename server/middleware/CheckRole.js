const passport = require('passport');
const Role = require('../models/Role');

module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated) return next();
        res.redirect('/login');
    },
    ensureAdmin: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.role_id);
            if (role && role.name === 'admin') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureClient: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.role_id);
            if (role && role.name === 'client') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureInstructor: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

            let role = await Role.findById(user.role_id);
            if (role && role.name === 'instructor') return next();
            res.redirect('/auth/login');
        })(req, res, next);
    },
    ensureRole: (...roles) => {
        return async (req, res, next) => {
            let role = await Role.findById(req.user.role_id);
            if (!role) return res.status(404).json({ message: 'Роль не найдена' });

            if (!req.user) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }
            if (roles.includes(role.role_name)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Доступ запрещён: недостаточные права' });
            }
        };
    }
};