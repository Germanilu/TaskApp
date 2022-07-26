
import React, {  useState } from 'react';
import './AddGroup.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../../container/User/userSlice';
import { useNavigate } from 'react-router-dom';

const Box = ({setShowBox, showBox}) => {

    let credentials = useSelector(userData)
    let navigate = useNavigate()

    const [nameGroup, setNameGroup] = useState()


    const updateData = (e) => {
        setNameGroup({...nameGroup, [e.target.name]: e.target.value});
    }

    const createGroup = async() => {
        setShowBox(false)
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            let body = nameGroup
            console.log(body)
            let result = await axios.post('https://mytask2do.herokuapp.com/api/newGroup',body,config )
            console.log(result)
            navigate('/group')
            
            
        } catch (error) {
            console.log(error)
        }
    }



     return (
         <div className='boxDesign'>
            <input className='inputBox' type="text" name='groupTitle' onChange={updateData}   />
            <div className="buttonBox" onClick={() => createGroup()}>Create Group</div>
         </div>
     )
}
export default Box;