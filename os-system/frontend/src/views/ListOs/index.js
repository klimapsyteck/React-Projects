import './listOs.css'
import {Link} from 'react-router-dom'

function ListOs(){


    return(
        <div className='container'>
            <header>
                <div>Os System</div>
                <div><Link to="/create">Nova OS</Link></div>
            </header>
            <div className='content'>                
                <div>
                    list of OS's
                </div>
            </div> 
            <footer>Produced</footer>         
        </div>
    )
}

export default ListOs;