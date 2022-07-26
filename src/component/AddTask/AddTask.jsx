import React, { useState } from 'react';
import './AddTask.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import {idData} from '../../container/GroupView/groupSlice'


//Recibo 2 argumentos que es el hook de Task
const AddTask = ({showAddTask, setShowAddTask}) => {

    let credentials = useSelector(userData)
    let group = useSelector(idData)

    const [newTask, setNewTask] = useState()
    

    const updateData = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value});
    }

    const createTask = async() => {
        //Al hacer click modifico el hook de Task para que se cierre la ventana
        setShowAddTask(false)
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            let body = newTask
            let result = await axios.post(`https://mytask2do.herokuapp.com/api/newTask/groupId=${group._id}`,body,config)
            console.log(result)

        } catch (error) {
            console.log(error)
        }
    }

     return (
         <div className='newTaskDesign'>
            <input type="text" name='title' placeholder='Title' onChange={updateData} />
            <input type="text" name='description' placeholder='Description' onChange={updateData} />
            <div className="buttonCreateTask" onClick={() => createTask()}>Create Task</div>
         </div>
     )
}
export default AddTask;