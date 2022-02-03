import './styles.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdDoneOutline} from 'react-icons/md'

function TaskRead(){

    useEffect(() => {
        gettingList()        
    }, [])

    const [arrayList, setArrayList] = useState([])
    const [task, setTask] = useState({"name":"", "description":"", "status": false})



    async function gettingList(){        
        await axios.get('http://localhost:4000/tasks').then(res => setArrayList(res.data))      
    } 

    async function completeTask(id, status){
        await axios.put('http://localhost:4000/tasks/status/' + id, {
            status: !status
        })

        window.location.reload(true)
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
            <ul>
                {mountList()}   
            </ul>
        </div>
    )
}

export default TaskRead;