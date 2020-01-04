const express = require('express');
const router = express.Router();


const ProfilesController = require('../controllers/profiles');
const checkAuth = require('../middlewares/check-auth');
const register = require('../middlewares/register');
const login = require('../middlewares/login');
const getRole = require('../middlewares/get-role');

router.post('/', register, ProfilesController.profiles_create_profile);
router.put('/', getRole, ProfilesController.profiles_update_profile);
router.get('/', getRole, ProfilesController.profiles_get_profile);

module.exports = router;