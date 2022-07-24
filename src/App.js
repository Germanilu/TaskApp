
import './App.css';
import './Global.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './container/Home/Home'
import Register from './container/User/Register/Register'
import Login from './container/User/Login/Login'
import GroupView from './container/GroupView/GroupView';
import Task from './container/Task/Task'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element= {<Home/>}/>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/group" element= {<GroupView/>}/>
        <Route path="/task" element= {<Task/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
