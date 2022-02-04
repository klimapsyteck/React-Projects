import './styles.css'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import axios from 'axios'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function TaskView(){
    const params = useParams()
    const id = params.id

    useEffect(() => {
        getTask()
    }, [])

    const [task, setTask] = useState({"name":"", "description": "", "status": ""})

    const successUpdated = () => toast("Tarefa atualizada.", {type: 'success'});
    const successDeleted = () => toast("Tarefa excluída com sucesso.", {type: 'danger'});

    async function getTask(){
        await axios.get('http://localhost:4000/tasks/' + id)
            .then(res => setTask(res.data))
    }

    function handlerOnChange(e){
        if(e.target.getAttribute('name') === 'name'){
            setTask({"name": e.target.value, "description": task.description, "status": task.status})
        }else if(e.target.getAttribute('name') === 'desc'){
            setTask({"name": task.name, "description": e.target.value, "status": task.status})
        }else if(e.target.getAttribute('name') === 'select'){
            setTask({"name": task.name, "description": task.description, "status": e.target.value})
        }
    }

    function save(){
        axios.put('http://localhost:4000/tasks/'+ id, task)
            .then(_ => successUpdated())
    }

    function remove(){
        axios.delete('http://localhost:4000/tasks/'+ id)
            .then(_ => successDeleted())

        setInterval(() => {
            window.location.href = "/" 
        }, 1300)  
       
    } 

    return(
        <div className='main-view'>
            <ToastContainer />
            <div className='header-page'>
                <div><Link to={"/"}><BsArrowLeftCircleFill /></Link></div>
                <div><h1>Detalhes da Tarefa</h1></div>
            </div>
            <div className='sub-view'>
                <div className='view-content'>
                    <input value={task.name} name="name" onChange={e => handlerOnChange(e)}/>
                    <textarea value={task.description} name="desc" onChange={e => handlerOnChange(e)} />                
                    <select name="select" value={task.status} onChange={e => handlerOnChange(e)}>
                        <option value="true">Concluída</option>
                        <option value="false">Não Concluída</option>                
                    </select>              
                </div>
                <div className='view-buttons'>
                    <button onClick={save}>Salvar</button>
                    <button onClick={remove}>Excluir</button>                
                </div>
            </div>          
        </div>
    )
}

export default TaskView;