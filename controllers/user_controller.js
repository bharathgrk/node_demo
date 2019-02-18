const md5 = require('md5');
const validator = require('validator');
const User = require('../models/user_model');
const UserModel = User.getModel;
const Country = require('../models/country_model');
const CountryModel = Country.getModel;
const Skill = require('../models/skill_model');
const SkillModel = Skill.getModel;

async function create(user) {
    return await user.save();
}

async function getUser(find_user_query, project) {
    return await UserModel.findOne(find_user_query).select(project);
}

async function getSkills(find_user_query) {
    return await SkillModel.find(find_user_query);
}

async function getCountries(find_user_query) {
    return await CountryModel.find(find_user_query);
}

const signUp = function (req, res, next) {
    const { password } = req.body;

    const user = new UserModel(req.body);

    if (password) {
        user["password"] = md5(password);
    }

    create(user)
        .then(() => res.json({ result: true, message: "Sign up successful.." }))
        .catch(err => next(err));
};

const login = function (req, res, next) {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        throw "User name and/or password empty..";
    }

    const find_user_query = {
        status: "active"
    };

    if (validator.isEmail(user_name)) {
        find_user_query["email"] = user_name;
    } else {
        find_user_query["user_name"] = user_name;
    }

    getUser(find_user_query, "password")
        .then((user) => {
            if (user.password !== undefined && user.password === md5(password)) {
                res.locals.user_id = user._id;
                next();
            } else {
                throw "Invalid user credentials.."
            }
        })
        .catch(err => next(err));
};

const details = function (req, res, next) {
    const user_id = req.params.userId;

    if (!user_id) {
        throw "User ID is empty.."
    }

    getUser({ _id: user_id }, "-password")
        .then((user) => {
            if (user !== null) {
                res.json({ result: true, user })
            } else {
                throw "User not found..";
            }
        })
        .catch(err => next(err));
};

const skillsList = function (req, res, next) {
    const skill_value = req.params.value;

    const find_skills = {
        skill_slug: { "$regex": skill_value.toLowerCase() },
        status: "active"
    };

    getSkills(find_skills)
        .then((skills_list) => {
            if (skills_list.length > 0) {
                res.json({ result: true, skills_list })
            } else {
                throw "No skills found..";
            }
        })
        .catch(err => next(err));
};

const countriesList = function (req, res, next) {
    const country_value = req.params.value;

    const find_countries = {
        country_slug: { "$regex": country_value.toLowerCase() },
        status: "active"
    };

    getCountries(find_countries)
        .then((countries_list) => {
            if (countries_list.length > 0) {
                res.json({ result: true, countries_list })
            } else {
                throw "No countries found..";
            }
        })
        .catch(err => next(err));
};

module.exports = {
    signUp,
    login,
    details,
    skillsList,
    countriesList
};