import {useState} from 'react'
import axios from 'axios'
import './style.css'

function Cep(){
    const [cep, setCep] = useState(0)
    const [address, setAddress] = useState({})

    async function getCep(){
        await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(res => setAddress(res.data))        
    }    

    function loadFields(e){
        const press = e.key || 0;        
        if(press === 'Tab'){            
            getCep()
        }
    }
  
    return(
        <div className='main-container'>
            <div className='sub-container'>
                <h1>Digite o Cep e Aperte Tab</h1>
                <input placeholder='Digite o cep ' onChange={e => setCep(e.target.value)}  onKeyDown={e => loadFields(e)}/>     
                <label>Rua:</label>       
                <input value={address.logradouro} />
                <label>Complemento:</label>  
                <input value={address.complemento}/>
                <label>Bairro:</label>  
                <input value={address.bairro} />
                <label>Cidade:</label>  
                <input value={address.localidade} />
                <label>Estado:</label>  
                <input value={address.uf} />
                <label>Código IBGE:</label>  
                <input value={address.ibge} />
                <label>DDD:</label>  
                <input value={address.ddd}/>    
            </div>          
        </div>
          
    )
}

export default Cep;