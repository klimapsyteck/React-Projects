import './styles.css'

import TaskInsert from '../views/TaskInsert'
import TaskRead from '../views/TaskRead'

function Template(){
    return (
        <div className="container-main">
            <div className="subcontainer">
                <div className="left-side">
                    <TaskInsert />
                </div> 
                <div className="right-side">
                    <TaskRead />
                </div> 
            </div>
        </div>
       
    )
}

export default Template;