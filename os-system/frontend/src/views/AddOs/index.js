import './addOs.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function AddOs(){
    useEffect(() => {
        getDatas()
    }, [])
    
    const state = {
        status: "budget", value: "0", equipment: "", informed_problem: "", reported_problem: "", general_information: ""
    }
    const [os, setOs] = useState({...state})
    const [clients, setClients] = useState([])  
    const [users, setUsers] = useState([])  
    const [client, setClient] = useState({id: ""})
    const [user, setUser] = useState({id: ""})

    function handleChange(e){
        const attributeName = e.target.getAttribute('name')
        if(attributeName === "client_id"){
            setClient({id: e.target.value})
        }else if(attributeName === "user_id"){
            setUser({id: e.target.value})
        }else if(attributeName === "status"){
            setOs({
               
                equipment: os.equipment,
                general_information: os.general_information,                
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: e.target.value,
                value: os.value
            })

        }else if(attributeName === "value"){
            setOs({
                
                equipment: os.equipment,
                general_information: os.general_information,                
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: os.status,
                value: e.target.value
            })

        }else if(attributeName === "equipment"){
            setOs({
                
                equipment: e.target.value,
                general_information: os.general_information,                
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: os.status,
                value: os.value
            })            

        }else if(attributeName === "informed_problem"){
            setOs({
                
                equipment: os.equipment,
                general_information: os.general_information,                
                informed_problem: e.target.value,
                reported_problem: os.reported_problem,
                status: os.status,
                value: os.value
            })

        }else if(attributeName === "reported_problem"){
            setOs({
                
                equipment: os.equipment,
                general_information: os.general_information,                
                informed_problem: os.informed_problem,
                reported_problem: e.target.value,
                status: os.status,
                value: os.value
            })

        }else if(attributeName === "general_information"){
            setOs({
                
                equipment: os.equipment,
                general_information: e.target.value,                
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: os.status,
                value: os.value
            })

        }
    }

    async function getDatas(){
       await axios.get("http://localhost:3000/client").then(res => setClients(res.data))
       await axios.get("http://localhost:3000/user").then(res => setUsers(res.data))
       
    }

   async function save(){       
        await axios.post("http://localhost:3000/os", os).then(_ => _)
        axios.post("http://localhost:3000/os/testes", {idClient: client.id, idUser: user.id})

        setOs({...state})
    }
    
    return(
        <div className="container-os">
            <Link to="/">Home</Link>
            <div className="sub-container-os">
                <div className="flex-space-between">                              
                    <div>07/02/2022</div>
                </div>               
                
                <div className="cliente-data">
                    <select name="client_id" onChange={e => handleChange(e)}>
                    <option>Selecione</option>
                        {clients.map(e => {
                            return(
                                <option value={e.id} key={e.id}>{e.name}</option>
                            )
                        })}
                        
                    </select>
                    <select name="user_id" onChange={e => handleChange(e)}>
                        <option>Selecione</option>
                        {users.map(e => {
                            return(
                                <option value={e.id} key={e.id}>{e.name}</option>
                            )
                        })}
                        
                    </select>
                </div>
                <div className="data-os">
                    <div className="status">
                        <select value={os.status} name="status" onChange={e => handleChange(e)}>
                            <option value="budget">Orçamento</option>
                            <option value="waiting">Aguradando Aprovação</option>
                            <option value="approval">Aprovado</option>
                            <option value="fixing">Em concerto</option>
                            <option value="delivered">Entregue</option>
                        </select>
                    </div>
                    <div className="service-value"><input value={os.value} name="value" onChange={e => handleChange(e)}/></div>
                    <div className="equipment"><input value={os.equipment} name="equipment" onChange={e => handleChange(e)}/></div>
                </div>
                <div className="informed-problem"><textarea value={os.informed_problem} name="informed_problem" onChange={e => handleChange(e)}></textarea></div>
                <div className="reported-problem"><textarea value={os.reported_problem} name="reported_problem" onChange={e => handleChange(e)}></textarea></div>
                <div className="general-information" onChange={e => handleChange(e)}><textarea value={os.general_information} name="general_information" onChange={e => handleChange(e)}></textarea></div>
                
                <div className="os-buttons">
                    <button><Link to="/">Cancelar</Link></button>
                    <button onClick={save}>Salvar</button>
                </div>
                
            </div>
        </div>
    )
}

export default AddOs;