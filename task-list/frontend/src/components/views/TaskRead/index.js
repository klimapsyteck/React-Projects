import './styles.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdDoneOutline} from 'react-icons/md'
import {BiLeftArrowAlt, BiRightArrowAlt, BiArrowToLeft, BiArrowToRight} from 'react-icons/bi'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function TaskRead(){

    useEffect(() => {
        gettingList()        
    }, [])

    const [arrayList, setArrayList] = useState([])
    let perPage = 5

    const [state, setState] = useState({
        page: 1, 
        perPage,
        totalPage: Math.ceil(arrayList.length / perPage),
        maxVisibleButtons: 5
    })
    const [teste, setStart] = useState({ start: 0, end: 5})
 

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

    function next(){
        setStart({start: teste.start+5, end: teste.end + 5})
        
    }

    function mountList(start, end){
        return arrayList.slice(start, end).map( item => {
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

    function update(){
        return mountList(teste.start, teste.end)        
    }

    return(
        <div className='main-read'>   
        <ToastContainer />         
            <ul>
                {update()}   
            </ul>         
            <div className='button-paginate'>                
                <button><BiArrowToLeft /></button>
                <button><BiLeftArrowAlt /></button>
                <div>1</div>
                <button onClick={next}><BiRightArrowAlt /></button>
                <button><BiArrowToRight /></button>
            </div>
            
        </div>
    )
}

export default TaskRead;