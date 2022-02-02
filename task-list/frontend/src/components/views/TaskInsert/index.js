import {useState} from 'react'
import axios from 'axios'
import './styles.css'

function TaskInsert(){

    const [task, setTask] = useState({"name":"", "description":""})

    
    function handleOnChange(e){
        if(e.target.getAttribute('name') == 'name'){
            setTask({"name": e.target.value, "description": task.description})
        }else if(e.target.getAttribute('name') == 'description'){
            setTask({"name": task.name, "description": e.target.value})
        }
    }    

    function reset(){
        setTask({"name": "", "description": ""})
    }

    async function save(){
        await axios.post('http://localhost:4000/tasks/', task)
            .then(_ => alert('Tarefa salva com sucesso.'))
            .catch(err => console.log(err))      
            
        reset()
    }

    return(
        <div>
            <h1>Task List</h1>
            <input name="name" value={task.name} placeholder="Nome" onChange={e => handleOnChange(e)}/>
            <input name="description" value={task.description} placeholder="Descrição" onChange={e => handleOnChange(e)}/>
            <button onClick={save}>Inserir</button>
        </div>
    )
}

export default TaskInsert;