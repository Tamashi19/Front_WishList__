import React from 'react';

export default class DesejosEUsuarios extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      listaDesejos : [],
      titulo : ''
    };
};
  
componentDidMount() {
  this.buscarDesejo();
}



cadastrarDesejo = (event) => {
  // Ignora o comportamento padrão do navegador
  event.preventDefault();

  
      // Segue para o processo de atualização

      // http://localhost:5000/api/tiposeventos/4
      fetch('http://localhost:5000/api/Desejo', {
          method : 'POST',
          body : JSON.stringify({ descricao : this.state.titulo, idUsuario: 2 }),
          headers : {
              "Content-type" : "application/json"
          }
      })

      .then(resposta => resposta)

      // caso ocorra algum erro, mostra no console do navegador
      .catch(erro => console.log(erro))

      .then(console.log("Desejo cadastrado."))

      .then(this.buscarTiposEventos)

      .then(this.limparCampos)        
    }

    limparCampos = () => {
        this.setState({
            titulo : '',
            idTipoEventoAlterado : 0
        })        
        console.log('Os states foram resetados!')
    }

  

    atualizaStateDesejo = async (desejo) => {
        await this.setState({titulo : desejo.target.value})
        console.log(this.state.titulo)
    }

    buscarDesejo = () => {
        fetch('http://localhost:5000/api/Desejo')
        
        .then( resposta => resposta.json())

        .then( dados => this.setState({listaDesejos : dados}))

        .catch(error => console.log(error))
    }


    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2>Lista de desejos</h2>
                        <table>
                            <thead>
                              <tr>
                                <th>Titulo</th>
                                <th>Nome</th>
                                <th>Desejos</th>
                              </tr>
                            </thead>
                            <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaDesejos.map((Desejos => {
                                            console.log(Desejos)
                                          
                                          return (
                                                <tr key={Desejos.idDesejo}>
                                                    <td>{Desejos.idDesejo}</td>     
                                                    <td>{Desejos.idUsuarioNavigation.nome}</td>
                                                    <td>{Desejos.descricao}</td>                                       
                                                </tr>
                                            )
                                        }))
                                      }
                                </tbody>
                        </table>
                    </section>
                    
                    <section>
                        <h2>Cadastre um desejo</h2>
                        <form onSubmit = {this.cadastrarDesejo}>
                            <div>
                                <input type = "text"
                                value = {this.titulo}
                                placeholder = "Titulo do desejo"
                                onChange = {this.atualizaStateDesejo} />

                                <button type = "submit"> Cadastrar </button>
                            </div>

                        </form>
                    </section>
                </main>
            </div>
            
        )
    }
}
