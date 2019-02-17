const random_string = require('randomstring');

const Login = require('../models/login_model');
const LoginModel = Login.getModel;

async function create(session) {
    return await session.save();
}

async function update(find_session, update_doc) {
    return await LoginModel.findOneAndUpdate(find_session, update_doc, { new: true });
}

const createSession = function (req, res, next) {
    const user_id = res.locals.user_id;
    const session_id = random_string.generate();

    create(new LoginModel({ user_id, session_id }))
        .then((session_doc) => res.json({ result: true, session: session_doc, message: "Login successful.." }))
        .catch(err => next(err));
};

const deleteSession = function (req, res, next) {
    const { session_id } = req.body;

    if (!session_id) {
        throw "Invalid session..";
    }

    const update_doc = {
        $set: { session_id: 0, status: 'inactive' }
    };

    update({ session_id }, update_doc)
        .then((session_doc) => {
            if (session_doc !== null) {
                res.json({ result: true, message: "Logout successful.." })
            } else {
                throw "Invalid session..";
            }
        })
        .catch(err => next(err));
};

module.exports = {
    createSession,
    deleteSession
};