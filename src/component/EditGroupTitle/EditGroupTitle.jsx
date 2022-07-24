import React, {useState} from 'react';
import './EditGroupTitle.scss'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import { useNavigate } from 'react-router-dom';
import {idData} from '../../container/GroupView/groupSlice'


const EditGroupTitle = () => {
    let id = useSelector(idData)
    let credentials = useSelector(userData)
    let navigate = useNavigate()
    const [nameGroup, setNameGroup] = useState()



    const updateData = (e) => {
        setNameGroup({...nameGroup, [e.target.name]: e.target.value});
    }

    const ChangeGroupTitle = async() => {
        console.log("Estoy en editgroupTitle y soy group",id)
    }


     return (
         <div className='designEditGroupTitle'>
            <input className='inputBox' type="text" name='groupTitle' onChange={updateData}   />
            <div className="buttonBoxTitle" onClick={() => ChangeGroupTitle()}>Edit Title</div>
         </div>
     )
}
export default EditGroupTitle;