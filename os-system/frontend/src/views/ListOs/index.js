import './listOs.css'
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'


function ListOs(){    
    const [oss, setOss] = useState([])
    
    useEffect(() => {
        getData()        
    }, [oss])


    function getData(){
        axios.get("http://localhost:3000/os").then(res => setOss(res.data))
    }
    function remove(id){
        if(window.confirm('Você está certo de que deseja executar essa ação?') === true){
            axios.delete("http://localhost:3000/os/" + id)   
            
        }              
    }
    function status(status){
        switch (status) {
            case "fixing":
                return "Consertando"; 
            case "budget":
                return "Orçamento"; 
            case "delivered":
                return "Entregue"; 
            case "approval":
                return "Aprovado";                              
            case "waiting":
                return "Aguardando Aprovação";                              
            default:
                return "Situação não definida."                
        }
    }
    return(
        <div className='container'>
            <header>
                <div>Os System</div>
                <div><Link to="/create">Nova OS</Link></div>
            </header>
            
            <div className='content'>    
                <table>
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Cliente</th>
                            <th>Situação</th>
                            <th>Equipamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oss.map(os => {
                            return(
                                <tr key={os.id}>
                                    <td>{os.id}</td>
                                    <td>{os.client_name}</td>
                                    <td>{status(os.status)}</td>
                                    <td>{os.equipment}</td>
                                    <td>
                                        <button><Link to={`/os/${os.id}`}>Editar</Link></button>
                                        <button onClick={() => remove(os.id)}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <footer>Produced</footer>    
    </div>
    )
}

export default ListOs;