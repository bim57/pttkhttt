import express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  addRole,
  editRole,
  deleteRole,
  getRolesAndPermissions,
  getFunctionList
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getUsers); 

router.get('/users', getUsers);
router.post('/users/add', addUser);
router.post('/users/update', updateUser);
router.post('/delete-user/:id', deleteUser);

router.get('/roles', getRolesAndPermissions);
router.get('/roles/functions', getFunctionList);
router.post('/roles/add', addRole);
router.post('/roles/edit', editRole);
router.post('/roles/delete/:id', deleteRole);


export default router;
