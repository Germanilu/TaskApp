import React, {useState} from 'react';
import './EditGroupTitle.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import { useNavigate } from 'react-router-dom';


const EditGroupTitle = () => {

    let credentials = useSelector(userData)
    let navigate = useNavigate()
    const [nameGroup, setNameGroup] = useState()



    const updateData = (e) => {
        setNameGroup({...nameGroup, [e.target.name]: e.target.value});
    }

    const ChangeGroupTitle = async() => {
        
        
    }


     return (
         <div className='designEditGroupTitle'>
            <input className='inputBox' type="text" name='groupTitle' onChange={updateData}   />
            <div className="buttonBoxTitle" onClick={() => ChangeGroupTitle()}>Edit Title</div>
         </div>
     )
}
export default EditGroupTitle;