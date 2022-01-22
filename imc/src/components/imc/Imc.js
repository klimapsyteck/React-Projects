import {useState} from 'react'
import './style.css'
import imc from '../../assets/imc.png'

function Imc(){
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [result, setResult] = useState(0)
    const [status, setStatus] = useState('')

    function calcImc(){
        const calc = weight / (height * height)
        setResult(calc)  
        validate(calc)
    }

    function validate(value){
        const el = document.getElementById('classification')
        if(value < 18.5){
            setStatus('Baixo Peso')
            el.style.backgroundColor = "#83C635"
        }else if(value >= 18.5 && value <= 24.99){
            setStatus('Normal')
            el.style.backgroundColor = "#C0D90B"
        }else if( value >= 25 && value <= 29.99){
            setStatus('Sobrepeso')
            el.style.backgroundColor = "#FCA500"
        }else{
            setStatus('Obesidade')
            el.style.backgroundColor = "#F67600"
        }
    }

    return(
        <div className="container-main">
            <div className="sub-container">
                <div className="left">
                    <input placeholder="Peso em KG." onChange={e => setWeight(e.target.value.replace(',', '.'))}/>
                    <input placeholder="Altura em metros." onChange={e => setHeight(e.target.value.replace(',', '.'))} />
                    <button onClick={calcImc}>Calcular IMC</button>
                </div>
                <div className="right">
                    <div className="result">                        
                       <div>
                            <label>Valor do Imc</label>
                            <input value={result > 0 ? result.toFixed(2).replace('.', ',') : ''} readOnly={true}/>
                       </div>
                       <div>
                            <label>Classificação</label>
                            <input value={status} readOnly={true} id="classification"/> 
                       </div>                                              
                    </div>
                    <div className="image">
                        <img src={imc} alt="imc"/>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Imc;