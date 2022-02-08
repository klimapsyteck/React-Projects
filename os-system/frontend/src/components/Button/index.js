import './button.css'

function Button(props){

    

    return(
        <button className={`${props.nameClass} general`}>{props.name}</button>
    )
}

export default Button;