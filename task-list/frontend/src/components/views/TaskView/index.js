import './styles.css'
import {useState, useEffect} from 'react'
import {useParams, useHref} from 'react-router-dom'
import axios from 'axios'


function TaskView(){
    const params = useParams()
    const id = params.id

    /* let redirect = useHref() */

    useEffect(() => {
        getTask()
    }, [])

    const [task, setTask] = useState({"name":"", "description": "", "status": null})

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
        <div>
            <div>
                <input value={task.name} name="name" onChange={e => handlerOnChange(e)}/>
                <input value={task.description} name="desc" onChange={e => handlerOnChange(e)} />                
                <select name="select" onChange={e => handlerOnChange(e)}>
                    <option value="true">Concluída</option>
                    <option value="false">Não Concluída</option>                
                </select>              
            </div>
            <div>
                <button onClick={save}>Salvar</button>
                <button onClick={remove}>Excluir</button>                
            </div>
        </div>
    )
}

export default TaskView;