const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user_controller');
const LoginController = require('../controllers/login_controller');

router.post('/', UserController.signUp);
router.post('/login', UserController.login, LoginController.createSession);
router.put('/logout', LoginController.deleteSession);
router.get('/:userId', UserController.details);
router.get('/skills/:value', UserController.skillsList);
router.get('/countries/:value', UserController.countriesList);

module.exports = router;