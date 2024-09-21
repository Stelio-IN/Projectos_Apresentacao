import { useEffect, useState, useRef } from "react";
import api from "../../services/api.js";

import "./style.css";
import Lixeira from "../../assets/trash.svg";

//react hook


function Home() {
  // useState
  const [users, setUsuarios] = useState([]);

  // useRef
  const inputName = useRef();
  const inputNascimento = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();



// Pegar user
  async function getUsers() {
    const response = await api.get("/users");

     setUsuarios(response.data);

    console.log(users);
  }
  //criar users
  async function createUsers() {
   await api.post("/users",{
      name: inputName.current.value,
      email: inputEmail.current.value,
      nascimento: inputNascimento.current.value,
      password: inputPassword.current.value
     });
     getUsers()
    console.log(inputName);
  }

  //deletar user
  async function deleteUsers(id) {
        await api.delete(`/users/${id}`);
        getUsers();
  }
  useEffect(() => {
    getUsers();
  }, []);


  /*const users = [
    {
      id: "dsadasd231",
      name: "dsad",
      email: "dsad@",
      nascimento: 20,
      password: "dsad",
    },
    {
      id: "dsadasdd231",
      name: "sam",
      email: "sam@gmail.com",
      nascimento: 20,
      password: "123456",
    },
    {
      id: "Ivan",
      name: "sin",
      email: "dsad@",
      nascimento: 20,
      password: "dsad",
    },
  ];*/

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuarios</h1>
        <input placeholder="Sam" name="nome" type="text" ref={inputName} />
        <input placeholder="sam@gmail.com" name="email" type="email" ref={inputEmail}/>
        <input placeholder="2001" name="nascimento" type="number" ref={inputNascimento}/>
        <input placeholder="842156451" name="password" type="password" ref={inputPassword}/>
        <button type="button" onClick={createUsers}>Cadastro</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>{" "}
            </p>
            <p>
              Email: <span>{user.email}</span>{" "}
            </p>
            <p>
              Ano_Nascimento:<span>{user.nascimento}</span>{" "}
            </p>
            <p>
              Password: <span>{user.password}</span>{" "}
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixeira} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
