import {BrowserRouter, Route, Routes} from 'react-router-dom'

import AddOs from './views/AddOs'
import ListOs from './views/ListOs'
import ViewOs from './views/ViewOs'

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListOs />}/>
                <Route path="/create" element={<AddOs />}/>
                <Route path="/os/:id" element={<ViewOs />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;