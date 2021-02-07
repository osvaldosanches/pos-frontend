//Osvaldo Sanches
//Projeto - POC PUC Minas
//2020-2021

import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";

function App() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [normaList, setNormaList] = useState([]);

  const [novaDescricao, setNovaDescricao] = useState("");

  //executa no carregamento da página
  useEffect(()=>{
    Axios.get("https://pos-backend-2021.herokuapp.com/api/get").then((response) => {
      console.log("osvaldo");
      console.log(response.data);
      setNormaList(response.data);
      //alert(response.data);
     
    });
  },[]);

  //botão de enviar
  const enviar = () =>{

    Axios.post("https://pos-backend-2021.herokuapp.com/api/insert",{
      nome:nome, 
      descricao:descricao,
    });
     
    setNormaList([
      ...normaList,
      {nome: nome, descricao: descricao},
    ]);  

  };

  //botão de remoção
  const deleteBotao = (nome) =>{

    Axios.delete('https://pos-backend-2021.herokuapp.com/api/delete/'.concat(nome));

  };

  //botão de atualização
  const updateBotao = (nome) =>{

    Axios.put("https://pos-backend-2021.herokuapp.com/api/update",{
      nome:nome, 
      descricao:novaDescricao,
    });
    setNovaDescricao ("")

  };

  
  return (
    <div className="App">

      <h1>GESTÃO DE NORMAS</h1>

      <div className = "form"> 
        <label>Norma:</label>
        <input type="text" name="nome" onChange={(e)=>{
          setNome(e.target.value);  
        }}/>
        <label>Descrição:</label>
        <input type="text" name="descricao" onChange={(e)=>{
          setDescricao(e.target.value);  
        }}/>
        <button onClick={enviar}>Enviar</button>

        {normaList.map((val) => {
          return (
           <div className="card"> 
                    <h1>{val.nome} </h1>
                    <p>{val.descricao}</p> 

                    <button onClick={() =>{deleteBotao(val.nome)}}>Delete</button>

                    <input type="text" id="updateInput" onChange={(e) => {
                        setNovaDescricao(e.target.value)
                    }} />

                    <button onClick={() =>{updateBotao(val.nome)}}>Update</button>
            </div>
         );
        })}
      </div>

    </div>
  );

}

export default App;
