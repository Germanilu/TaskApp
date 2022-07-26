import React, { useState, useEffect } from 'react';
import './GroupView.scss'
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux';
import { userData } from '../User/userSlice';
import Box from '../../component/AddGroup/AddGroup'
import EditGroupTitle from '../../component/EditGroupTitle/EditGroupTitle'
import { useNavigate } from 'react-router-dom';
import {idTitle} from '../GroupView/groupSlice'




const GroupView = () => {

    let credentials = useSelector(userData)
    let navigate = useNavigate()
    const dispatch = useDispatch();
    //hooks
    const [showGroup, setShowGroup] = useState([])
    const [msgError, setMsgError] = useState("")
    const [showBox, setShowBox] = useState(false)
    const [showBoxTitle, setShowBoxTitle] = useState(false)



    useEffect(() => {
        
    },[])

    useEffect(() => {
        getGroup()
        if(credentials.token === ""){
            navigate('/login')
        }
        
    })

    const getGroup = async() => {
        try {   
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            let result = await axios.get('https://mytask2do.herokuapp.com/api/group',config )
            setShowGroup( result.data.data)
            setMsgError("")
            
            
            if(result.data.data.length === 0){
                setMsgError(`Looks like you didn't created any group yet.... Click on the button below and let Start creating a New Group!`)
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

    const deleteGroup = async(e) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            let result = await axios.delete(`https://mytask2do.herokuapp.com/api/group/id=${e}`,config)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    //Con esta funcion enseño el box y envio a redux el objeto group
    const editGroup = (e) => {
        setShowBoxTitle(!showBoxTitle)
        dispatch(idTitle(e))   
    }

    const enterGroup = (e) => {
        dispatch(idTitle(e))
        navigate('/task')
    }

     return (
         <div className='designGroup'>
            <h1>Groups</h1>
            <div className="containerGroup">

                
                { showGroup.length !== 0 &&
                 
                    showGroup.map((group) => {
                        
                            return (
                                <div className="cardGroup" key={group._id}>{group.groupTitle}
                                {showBoxTitle? <EditGroupTitle /> : null}
                                    <div className="containerButtonCard">

                                        <div className="buttonCardGroup" onClick={() => enterGroup(group)}>View </div>
                                        <div className="buttonCardGroup" onClick={() => editGroup(group)}>Edit </div>
                                        <div className="buttonCardGroup" onClick={() => deleteGroup(group._id)}>Delete</div>
                                    </div>
                                </div>
                            )
                    })
                    
                }
                <div className="msgErrorContainer">{msgError}</div>

            </div>
             {showBox? <Box setShowBox = {setShowBox} showBox={showBox}/> : null}
            <div className="buttonGroup" onClick={() => setShowBox(!showBox)}>+</div>
            
         </div>
     )
}
export default GroupView;