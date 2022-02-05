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
        update()      
    }, [])

    let perPages = 5    
    let pageI = 1

    const [arrayList, setArrayList] = useState([])
    let [page, setPage] = useState(pageI)
    const [perPage, setPerPage] = useState(perPages)
    const [totalPage, setTotalPage] = useState()
    const [maxVisibleButtons, setMaxVisibleButtons] = useState(5)
    const [list, setList] = useState({ start: 0, end: 5})

    const successComplete = () => toast("Tarefa concluída.", {type: 'success'});
    const successOpen = () => toast("Tarefa aberta novamente.", {type: 'success'});

    async function gettingList(){        
        await axios.get('http://localhost:4000/tasks').then(res => {
            setArrayList(res.data)
            setTotalPage(Math.ceil(res.data.length / perPage))
    })      
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

    const controls = {
        next(){       
            setPage(++page)
    
            if(page > totalPage){
                setPage(--page)                 
            }        
            let pageS = page - 1
            let start = pageS * perPage
            let end = start + perPage
            setList({start: start, end: end})
            update()
    

        },
        prev(){
            setPage(--page)
            if(page < 1){
                setPage(++page)
            }        
            let pageS = page - 1
            let start = pageS * perPage
            let end = start + perPage
            setList({start: start, end: end})
            update()
        },
        goTo(page){
            setPage(page)
            let pageS = page - 1
            let start = pageS * perPage
            let end = start + perPage
            setList({start: start, end: end})
            update()

        }
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
    

    const buttons = {
        create(number){
            const button = document.createElement('div')
            button.innerHTML = number

            if(page === number){
                button.classList.add('active')
            }

            button.addEventListener('click', (e) => {
                let page = e.target.innerText
                controls.goTo(page)
                update()
            })
            document.querySelector('.buttons-list').appendChild(button)
        },
        update(){
            document.querySelector('.buttons-list').innerHTML = ""
            const {maxLeft, maxRight} = buttons.calculateMaxVisible()

            for(let page = maxLeft; page <= maxRight; page++){
                buttons.create(page)
            }

        },
        calculateMaxVisible(){
            let maxLeft = (page - Math.floor(maxVisibleButtons / 2))
            let maxRight = (page + Math.floor(maxVisibleButtons / 2))

            if(maxLeft < 1){
                maxLeft = 1
                maxRight = maxVisibleButtons
            }
            if(maxRight > totalPage){
                maxLeft = totalPage - (maxVisibleButtons - 1)
                maxRight = totalPage
                if(maxLeft < 1){
                    maxLeft = 1
                }
            }
            return {maxLeft, maxRight}
        }
    }
    function update(){
        buttons.update()   
    }
    
    return(
        <div className='main-read'>   
        <ToastContainer />         
            <ul>
                {mountList(list.start, list.end)}   
            </ul>         
            <div className='button-paginate'>                
                <button onClick={() => controls.goTo(1)}><BiArrowToLeft /></button>
                <button onClick={controls.prev}><BiLeftArrowAlt /></button>
                <div className='buttons-list'>1</div>
                <button onClick={controls.next}><BiRightArrowAlt /></button>
                <button onClick={() => controls.goTo(totalPage)}><BiArrowToRight /></button>
            </div>            
        </div>
    )
}

export default TaskRead;