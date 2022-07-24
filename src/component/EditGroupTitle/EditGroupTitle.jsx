import React, {useState} from 'react';
import './EditGroupTitle.scss'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import { useNavigate } from 'react-router-dom';
import {idData} from '../../container/GroupView/groupSlice'
import axios from 'axios';


const EditGroupTitle = () => {
    //Recojo el objeto group desde redux
    let group = useSelector(idData)
    let credentials = useSelector(userData)
    let navigate = useNavigate()
    const [nameGroup, setNameGroup] = useState()



    const updateData = (e) => {
        setNameGroup({...nameGroup, [e.target.name]: e.target.value});
    }

    const ChangeGroupTitle = async() => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            let body = nameGroup
            let result = await axios.put(`https://mytask2do.herokuapp.com/api/group/id=${group._id}`,body,config)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }


     return (
         <div className='designEditGroupTitle'>
            <input className='inputBox' type="text" name='groupTitle' onChange={updateData}   />
            <div className="buttonBoxTitle" onClick={() => ChangeGroupTitle()}>Edit Title</div>
         </div>
     )
}
export default EditGroupTitle;