import React, { useState } from 'react';
import './Task.scss'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import {idData} from '../../container/GroupView/groupSlice'
import axios from 'axios';

const Task = () => {
    let group = useSelector(idData)

   
    console.log(group)
     return (
         <div className='designTask'>BIENVENIDO Al grupo:  {group.groupTitle}</div>
     )
}
export default Task;