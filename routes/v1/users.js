const express = require('express');
const router = express.Router();
const { createUserHandler, getUsersHandler, getUserByIdHandler, updateUserByIdHandler, patchUserFieldByIdHandler, deleteUserByIdHandler } = require('../../controllers/v1/userController');

// debugging middleware
router.use((req, res, next) => {
  console.log(`Router: ${req.method} ${req.url}`);
  console.log('Router Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Router Body:', JSON.stringify(req.body, null, 2));
  next();
});

// define routes
router.get('/', getUsersHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserByIdHandler);
router.get('/:id', getUserByIdHandler);
router.patch('/:id', patchUserFieldByIdHandler);
router.delete('/:id', deleteUserByIdHandler);

// export routes
module.exports = router;

