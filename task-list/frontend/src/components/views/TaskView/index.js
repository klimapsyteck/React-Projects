import './styles.css'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import axios from 'axios'


function TaskView(){
    const params = useParams()
    const id = params.id

    /* let redirect = useHref() */

    useEffect(() => {
        getTask()
    }, [])

    const [task, setTask] = useState({"name":"", "description": "", "status": ""})

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
            .then(_ => alert('Altualizado com sucesso.'))
    }

    function remove(){
        axios.delete('http://localhost:4000/tasks/'+ id)
        window.location.href = "/" 
    } 

    return(
        <div className='main-view'>
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