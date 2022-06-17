const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "trabalhopbdcrud",
});

app.post("/create", (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const cnpj = req.body.cnpj;

    db.query(
    "INSERT INTO empresa (nome, telefone, email, cnpj) VALUES (?,?,?,?)",
    [nome, telefone, email, cnpj],
    (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send("Valor inserido");
        }
    }
    );
});


app.get("/empresa", (req, res) => {
  db.query("SELECT * FROM empresa", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
    }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    db.query(
    "UPDATE empresa SET email = ? WHERE id = ?",
    [email, id],
    (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM empresa WHERE id = ?", id, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
    }
    });
});

app.listen(3001, () => {
    console.log("O server esta rodando no port 3001.");
});