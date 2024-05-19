const express = require("express");
const router = express.Router();
const pool = require("../db/conn");

// Adicionando livros
router.post("/insertbook", (req, res) => {
  const { title, pageqty } = req.body;
  const sql = "INSERT INTO books (title, pageqty) VALUES (?, ?)";

  pool.query(sql, [title, pageqty], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao inserir livro");
    }

    console.log("Livro inserido com sucesso:", result);
    res.redirect("/");
  });
});

// Listar todos os livros
router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";

  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar livros");
    }

    res.render("books", { books: data });
  });
});

// Exibir um livro específico
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM books WHERE id = ?";

  pool.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    res.render("book", { book: data[0] });
  });
});

// Editar um livro específico
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM books WHERE id = ?";

  pool.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    res.render("editbook", { book: data[0] });
  });
});

// Atualizar um livro específico
router.post("/updatebook", (req, res) => {
  const { id, title, pageqty } = req.body;
  const sql = "UPDATE books SET title = ?, pageqty = ? WHERE id = ?";

  pool.query(sql, [title, pageqty, id], (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res.redirect("/books");
  });
});

// Remover um livro específico
router.post("/remove/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM books WHERE id = ?";

  pool.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res.redirect("/books");
  });
});

module.exports = router;
