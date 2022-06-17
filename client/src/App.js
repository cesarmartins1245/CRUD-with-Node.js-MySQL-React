import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  //Tabela Empresa
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState(0);
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [empresaList, setEmpresaList] = useState([]);
  const [newEmail, setNewEmail] = useState(0);

  const addEmpresa = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      telefone: telefone,
      email: email,
      cnpj: cnpj,
    }).then(() => {
      setEmpresaList([
        ...empresaList,
        {
          nome: nome,
          telefone: telefone,
          email: email,
          cnpj: cnpj,
        },
      ]);
    });
  };

  const getEmpresa = () => {
    Axios.get("http://localhost:3001/empresa").then((response) => {
      setEmpresaList(response.data);
    });
  };

  const confirmarEmpresa = (id) => {
    Axios.put("http://localhost:3001/update", { email: newEmail, id: id }).then(
      (response) => {
        setEmpresaList(
          empresaList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  nome: val.nome,
                  telefone: val.telefone,
                  email: val.newEmail,
                  cnpj: val.cnpj,
                }
              : val;
          })
        );
      }
    );
  };


  const deleteEmpresa = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmpresaList(
        empresaList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Nome:</label>
        <input type="text"onChange={(event) => {setNome(event.target.value);}}/>
        <label>Telefone:</label>
        <input type="number"onChange={(event) => {setTelefone(event.target.value);}}/>
        <label>Email:</label>
        <input type="text"onChange={(event) => {setEmail(event.target.value);}}/>
        <label>CNPJ:</label>
        <input type="text"onChange={(event) => {setCnpj(event.target.value);}}/>
        <button onClick={addEmpresa}>Add Empresa</button>
      </div>
      <div className="employees">
        <button onClick={getEmpresa}>Mostrar Empresas</button>
        {empresaList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Nome: {val.nome}</h3>
                <h3>Telefone: {val.telefone}</h3>
                <h3>Email: {val.email}</h3>
                <h3>CNPJ: {val.cnpj}</h3>
              </div>
              <div>
                <input type="text" onChange={(event) => {setNewEmail(event.target.value);}}/>
                <button
                  onClick={() => {confirmarEmpresa(val.id);}}>
                  {" "}
                  Confirmar empresa
                </button>
                <button
                  onClick={() => {deleteEmpresa(val.id);}}>
                  Deletar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;