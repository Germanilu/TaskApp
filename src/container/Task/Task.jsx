import React, { useState, useEffect } from 'react';
import './Task.scss'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import {idData} from '../../container/GroupView/groupSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTask from '../../component/AddTask/AddTask'

const Task = () => {


    let group = useSelector(idData)
    let credentials = useSelector(userData)
    let navigate = useNavigate()

    //Hooks

    const [showTask,setShowTask] = useState([])
    const [msgError, setMsgError] = useState("")
    const [showAddTask, setShowAddTask] = useState(false)




    useEffect(() => {
        getTask()
    },[])

    useEffect(() => {
        getTask()
        if(credentials.token == ""){
            navigate('/login')
        }
    })

    const getTask = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            let result = await axios.get(`https://mytask2do.herokuapp.com/api/task/groupId=${group._id}`,config)
            setShowTask(result.data.data)
            setMsgError("")

            if(result.data.data.length == 0){
                setMsgError(`Looks like you didn't create any task yet... click the button below and let start create a new Task!`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async(e) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };


            let result = await axios.delete(`https://mytask2do.herokuapp.com/api/task/id=${e}`,config)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }




     return (
         <div className='designTask'>
            <h1>{group.groupTitle}</h1>
            <div className="taskContainer">

                { showTask.length !== 0 &&

                    showTask.map((task) => {
                        return(
                            <div className="cardTask" key={task._id}>
                                <div className="taskTitle">
                                    {task.title}
                                </div>
                                <div className="taskDescription">
                                    <p> {task.description} </p>
                                   
                                </div>
                                <div className="taskButton">
                                    <div className="button">Edit</div>
                                    <div className="button" onClick={() => deleteTask(task._id)}>Delete</div>
                                </div>
                            </div>
                        )
                    })

                }






            <div className="msgErrorContainer">{msgError}</div>
            </div>
            {showAddTask? <AddTask/> : null}
            <div className="addTask" onClick={() => setShowAddTask(!showAddTask)} >+</div>
         </div>
     )
}
export default Task;