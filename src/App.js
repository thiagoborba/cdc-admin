import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import fetch from 'node-fetch';
import InputCustomizado from './components/InputCustomizado'
import BotaoSubmitCustomizado from './components/BotaoSubmitCustomizado'

const url = "https://cdc-react.herokuapp.com/api/autores";


class App extends Component {

  constructor() {
    super();    
    this.state = {lista: [], nome:'', email:'', senha:''};
  }

  componentDidMount(){
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({lista: json}))
      .catch(e => console.error(`ERROR: ${e}`))    
  }

  enviaForm = e => {
    e.preventDefault();
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha})
    }
    fetch(url, options)
    .then(res => res.json())
    .then(json => this.setState({lista: json}))
    .catch(e => console.error(`ERROR: ${e}`))

    this.resetForm()
    
  }

  resetForm = () => {
    this.setState({
      ...this.state,
      nome:'',
      email:'',
      senha:''   
    })
  }

  // setNome = e => this.setState({nome:e.target.value});

  // setEmail = e => this.setState({email:e.target.value});

  // setSenha = e => this.setState({senha:e.target.value});


  render() {       
    return (
      <div id="layout">
          
          <a href="#menu" id="menuLink" className="menu-link">
              
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>

                      
                  </ul>
              </div>
          </div>

              <div id="main">
                  <div className="header">
                    <h1>Cadastro de Autores</h1>
                  </div>
                  <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                      <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}  method="post">

                        <InputCustomizado
                          id="nome" 
                          type="text" 
                          name="nome" 
                          value={this.state.nome} 
                          onChange={this.setNome} 
                          label="Nome"
                        />                                              
                        <InputCustomizado 
                          id="email" 
                          type="email" 
                          name="email" 
                          value={this.state.email} 
                          onChange={this.setEmail} 
                          label="Email"
                        />                                              
                        <InputCustomizado 
                          id="senha" 
                          type="password" 
                          name="senha" 
                          value={this.state.senha} 
                          onChange={this.setSenha} 
                          label="Senha"
                        />
                        <BotaoSubmitCustomizado
                          label='Gravar' 
                        />

                      </form>             

                    </div>  
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.lista.map(function(autor){
                              if(autor.nome==='thiago borba'){
                                return (
                                  <tr key={autor.id}>
                                    <td>{autor.id}</td>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                  </tr>
                                );
                              }
                              return false
                              
                            })
                          }
                        </tbody>
                      </table> 
                    </div>             
                  </div>
                </div>            


      </div>     
    );
  }
}

export default App;
