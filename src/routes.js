const {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
    //options: {cors: {origin: ['*'],},},
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getBookByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;
