const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updatedAt, finished};

  books.push(newBook);

  if (name === "") {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
      data: {bookId: id}
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      data: {bookId: id}
    });
    response.code(400);
    return response;
  }

  if (finished) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {bookId: id}
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
  status: "success",
  data: {
    notes,
  }
});

const getBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const note = notes.filter((n) => n.id === (id))[0];

  if (note !== undefined) {
    return {status: 'success', data: {note},};
  }

  const response = h.response({
    status: 'fail', message: 'Catatan tidak ditemukan'
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan, ID tidak ditemukan'
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan gagal dihapus. ID tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};
