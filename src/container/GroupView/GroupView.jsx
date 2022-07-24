import React, { useState, useEffect } from 'react';
import './GroupView.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../User/userSlice';
import Box from '../../component/Box/Box'
import { useNavigate } from 'react-router-dom';


const GroupView = () => {

    let credentials = useSelector(userData)
    let navigate = useNavigate()

    //hooks
    const [showGroup, setShowGroup] = useState([])
    const [msgError, setMsgError] = useState("")
    const [showBox, setShowBox] = useState(false)

    useEffect(() => {
        getGroup()
        if(credentials.token == ""){
            navigate('/login')
        }
    },[])

    useEffect(() => {
        getGroup()
        
    })

    const getGroup = async() => {
        try {   
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            let result = await axios.get('https://mytask2do.herokuapp.com/api/group',config )
            setShowGroup( result.data.data)
            setMsgError("")
            
            
            if(result.data.data.length == 0){
                setMsgError(`Looks like you didn't created any group yet.... Click on the button below and let Start creating a New Group!`)
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

     return (
         <div className='designGroup'>
            <h1>Groups</h1>
            <div className="containerGroup">

                
                { showGroup.length !== 0 &&
                 
                    showGroup.map((group) => {
                        
                            return (
                                <div className="cardGroup" key={group._id}>{group.groupTitle}
                                    <div className="containerButtonCard">
                                        <div className="buttonCardGroup">Edit</div>
                                        <div className="buttonCardGroup">Delete</div>
                                    </div>
                                </div>
                            )
                        
                       
                    })
                    
                }
                <div className="msgErrorContainer">{msgError}</div>

            </div>
             {showBox? <Box/> : null}
            <div className="buttonGroup" onClick={() => setShowBox(!showBox)}>+</div>
            
         </div>
     )
}
export default GroupView;