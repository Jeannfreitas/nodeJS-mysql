const express = require("express");
const { engine } = require("express-handlebars");
const pool = require("./db/conn");
const booksRoutes = require("./routes/books");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurando o Handlebars como a view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Servindo arquivos estáticos da pasta "public"
app.use(express.static("public"));

// Rota principal
app.get("/", (req, res) => {
  res.render("home");
});

// Usando as rotas do books.js
app.use("/books", booksRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
