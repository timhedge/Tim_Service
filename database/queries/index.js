const connection = require('../db');

const addTodo = (todo) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO todos (todo_name) VALUES (?)', todo, (err, result) => {
      if (err) {
        reject(new Error('Failed while adding item to the database'))
      } else {
        resolve({ todo_name: todo, todoID: result.insertId });
      };
    });
  })
};

const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM todos', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      };
    });
  });
};

const deleteTodo = (todoID) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM todos WHERE todoID=(?)', todoID, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      };
    });
  });
};

module.exports = {
  addTodo,
  getAllTodos,
  deleteTodo,
};
