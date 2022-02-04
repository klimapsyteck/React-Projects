import './styles.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdDoneOutline} from 'react-icons/md'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function TaskRead(){

    useEffect(() => {
        gettingList()        
    }, [])

    const [arrayList, setArrayList] = useState([])

    const successComplete = () => toast("Tarefa concluída.", {type: 'success'});
    const successOpen = () => toast("Tarefa aberta novamente.", {type: 'success'});

    async function gettingList(){        
        await axios.get('http://localhost:4000/tasks').then(res => setArrayList(res.data))      
    } 

    async function completeTask(id, status){
        await axios.put('http://localhost:4000/tasks/status/' + id, {
            status: !status
        })
    
        {!status ? successComplete() : successOpen()}
        setInterval(() => {
            window.location.reload(true)
        }, 1000)   

    }

    function mountList(){
        return arrayList.map( item => {
            return(
                <li key={item.id}>
                    <div className='container-general'>
                        <div className='container-item'>
                            <Link to={`/detail/${item.id}`}>
                            <div className='detail-item'>
                                <h3 style={item.status ? {textDecoration: 'line-through'} : {}}>{item.name}</h3>
                                {item.description}
                            </div>                         
                            </Link>
                        </div> 
                        <div className='button-item'>
                            <button onClick={()=> completeTask(item.id, item.status)}>
                                <MdDoneOutline />
                            </button>
                        </div>                    
                    </div>
                </li>
            )
        })           
    }

    return(
        <div className='main-read'>   
        <ToastContainer />         
            <ul>
                {mountList()}   
            </ul>
        </div>
    )
}

export default TaskRead;