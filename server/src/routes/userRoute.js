const express = require('express');
const router = express.Router();

// Validators
const { jwtAuth } = require('../validators/jwtAuth.js');
const { signupValidate } = require('../validators/signupValidate.js');
const { loginValidate } = require('../validators/loginValidate.js');

// Controllers
const { signup, login, logout, getUser, userUpdate, userDelete } = require('../controllers/userController.js');
const { createTodo, updateTodoStatus, getTodos, getCompletedTodos, getPendingTodos, updateTodo, deleteTodo } = require('../controllers/todoController.js');

// ---------auth APIs--------- 
router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.get('/logout', jwtAuth, logout);

// ---------user APIs---------
router.get('/user', jwtAuth, getUser);
router.put('/user/update', jwtAuth, userUpdate);
router.delete('/user/delete', jwtAuth, userDelete);

// ---------todo APIs---------
router.post('/create-todo', jwtAuth, createTodo)
router.get('/todo-list', jwtAuth, getTodos);
router.get('/completed-todo-list', jwtAuth, getCompletedTodos);
router.get('/pending-todo-list', jwtAuth, getPendingTodos);
router.put('/todo/update-status', jwtAuth, updateTodoStatus);
router.put('/todo/update', jwtAuth, updateTodo);
router.delete('/todo/delete', deleteTodo);

module.exports = router;