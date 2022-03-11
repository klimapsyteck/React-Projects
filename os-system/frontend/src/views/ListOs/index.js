import './listOs.css'
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TableOS from '../../components/Tables'

function ListOs(){    
    const [oss, setOss] = useState([])
    
    useEffect(() => {
        getData()        
    }, [oss])


    function getData(){
        axios.get("http://localhost:3000/os").then(res => setOss(res.data))
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
                <div>
                    <Link to="/create">Nova OS</Link>
                    <Link to="/create">Client</Link>
                    <Link to="/create">Usários</Link>
                </div>
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
                    <TableOS />
                </table>
            </div>
            <footer>Produced</footer>    
    </div>
    )
}

export default ListOs;