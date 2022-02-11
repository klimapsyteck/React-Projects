import './viewOs.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

function ViewOs(){
    const params = useParams()
    const id = params.id

    useEffect(() => {
        getData()
    }, [])

    const [os, setOs] = useState({status: "", value: "",  reported_problem: "",  general_information: "", informed_problem: ""}) 
    const [things, setThings] = useState({})

    async function getData(){
       await axios.get("http://localhost:3000/os/" + id).then(res => setOs(res.data))  
       await axios.get("http://localhost:3000/os/testes/" + id).then(res => setThings(res.data))           
    }  

    function alter(){
        axios.put("http://localhost:3000/os/" + id, os)   
    }

    function remove(){
        if(window.confirm('Você está certo de que deseja executar essa ação?') === true){
            axios.delete("http://localhost:3000/os/" + id)   
        }              
    }

    function handleOsChange(e){
        if(e.target.getAttribute('name') === "os_status"){
            setOs({               
                equipment: os.equipment,
                general_information: os.general_information,
                id: id,
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: e.target.value,
                value: os.value
            })
        }
        if(e.target.getAttribute('name') === "os_value"){
            setOs({
               
                equipment: os.equipment,
                general_information: os.general_information,
                id: id,
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: os.status,
                value: e.target.value
            })
        }
        if(e.target.getAttribute('name') === "os_rp"){
            setOs({
               
                equipment: os.equipment,
                general_information: os.general_information,
                id: id,
                informed_problem: os.informed_problem,
                reported_problem: e.target.value,
                status: os.status,
                value: os.value
            })   
        }
        if(e.target.getAttribute('name') === "os_gi"){
            setOs({
                
                equipment: os.equipment,
                general_information: e.target.value,
                id: id,
                informed_problem: os.informed_problem,
                reported_problem: os.reported_problem,
                status: os.status,
                value: os.value
            })

            
        }
    }

    return(
        <div className="container-os">
            <Link to="/">Home</Link>
        <div className="sub-container-os">
            <div className="flex-space-between">
                <div className="os-number"><span>Número OS: {os.id}</span></div>
                <div>07/02/2022</div>
            </div>                
            <div className="cliente-data">Cliente: <span>{things.name}</span></div>
            <div className="data-os">
                <div className="status">
                    <span>Situação</span>
                    <select name="os_status" value={os.status} onChange={e => handleOsChange(e)}>
                        <option value="budget">Orçamento</option>
                        <option value="waiting">Aguradando Aprovação</option>
                        <option value="approval">Aprovado</option>
                        <option value="fixing">Em concerto</option>
                        <option value="delivered">Entregue</option>
                    </select>
                </div>
                <div className="service-value"><span>Valor: </span><input name="os_value" value={os.value} onChange={e => handleOsChange(e)} type="number"/></div>
                <div className="equipment">Equipamento: <span>{os.equipment}</span></div>
            </div>
            <div className="informed-problem">
                <span>Problema Relatado Pelo Cliente:</span>
                <textarea readOnly value={os.informed_problem ? os.informed_problem : ""}></textarea>
            </div>
            <div className="reported-problem">
                <span>Observações da Equipe Técnica:</span>
                <textarea name="os_rp" onChange={e => handleOsChange(e)} value={os.reported_problem ? os.reported_problem : ""}></textarea>
            </div>
            <div className="general-information">
            <span>Observações Gerais:</span>
                <textarea name="os_gi" onChange={e => handleOsChange(e)} value={os.general_information ? os.general_information : ""}></textarea>
            </div>
            
            <div className="os-buttons">
                <button onClick={alter}>Alterar</button>
                <button><Link to="/">Cancelar</Link></button>
                <button onClick={remove}>Excluir</button>              
            </div>
            
        </div>
    </div>
    )
}

export default ViewOs;