import './App.css';
import Template from './components/Template';
import TaskView from './components/views/TaskView'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Template />}/> 
          <Route path="/detail/:id" element={ <TaskView />}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
