import './viewOs.css'

function ViewOs(){
    return(
        <div className="container-os">
        <div className="sub-container-os">
            <div className="flex-space-between">
                <div className="os-number"><input value="1000"/></div>
                <div>07/02/2022</div>
            </div>                
            <div className="cliente-data"><input value="Kesley de Lima Silva"/></div>
            <div className="data-os">
                <div className="status">
                    <select>
                        <option>Orçamento</option>
                        <option>Aguradando Aprovação</option>
                        <option>Aprovado</option>
                        <option>Em concerto</option>
                        <option>Entregue</option>
                    </select>
                </div>
                <div className="service-value"><input value="R$ 80,00"/></div>
                <div className="equipment"><input value="Notebook"/></div>
            </div>
            <div className="informed-problem"><textarea> </textarea></div>
            <div className="reported-problem"><textarea> </textarea></div>
            <div className="general-information"><textarea> </textarea></div>
            
            <div className="os-buttons">
                <button>Salvar</button>
                <button>Cancel</button>
                <button>Excluir</button>              
            </div>
            
        </div>
    </div>
    )
}

export default ViewOs;