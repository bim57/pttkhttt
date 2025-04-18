import express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getRolesAndPermissions,
  getPermissions,
  updatePermissions
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users/add', addUser);
router.post('/users/update', updateUser);
router.get('/users/delete/:id', deleteUser);

router.get('/roles', getRolesAndPermissions);
router.get('/roles/:idRole', getPermissions);
router.post('/roles/update', updatePermissions);

export default router;
