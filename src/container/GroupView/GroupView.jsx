import React, { useState, useEffect } from 'react';
import './GroupView.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../User/userSlice';


const GroupView = () => {

    let credentials = useSelector(userData)

    //hooks
    const [showGroup, setShowGroup] = useState()

    useEffect(() => {
        console.log(credentials.token)
        getGroup()
    },[])

    useEffect(() => {
        
    })

    const getGroup = async() => {
        try {   
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            let result = await axios.get('https://mytask2do.herokuapp.com/api/group',config )
            setShowGroup("soy result de la llamada",result)
            console.log("Soy el resultado de la llamada",result.data.data[0].groupTitle)
        } catch (error) {
            console.log(error)
        }
    }
     return (
         <div className='designGroup'>

         </div>
     )
}
export default GroupView;