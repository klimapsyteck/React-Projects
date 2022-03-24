import {Link} from 'react-router-dom'
import axios from 'axios'

function TableOS(props){
    function remove(id){
        if(window.confirm('Você está certo de que deseja executar essa ação?') === true){
            axios.delete("http://localhost:3000/os/" + id)   
            
        }              
    }
    const obs = [{
        id: 8,
        client_name: "kesley",
        equipment: "notebook"   
    },
    {
        id: 9,
        client_name: "kesley",
        equipment: "notebook"   
    }]
    
    
    
    
    return(    
        <tbody>
            {obs.map(os => {
                return(
                    <tr key={os.id}>
                        <td>{os.id}</td>
                        <td>{os.client_name}</td>
                        <td>HOLD</td>
                        <td>{os.equipment}</td>
                        <td>
                            <button><Link to={`/os/${os.id}`}>Editar</Link></button>
                            <button onClick={() => remove(os.id)}>Excluir</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
        
    )
   
}

export default TableOS;