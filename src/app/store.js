import {configureStore} from '@reduxjs/toolkit'
import groupSlice from '../container/GroupView/groupSlice';
import userSlice from '../container/User/userSlice';
export default configureStore({
    //El reducer es una funcion pura que toma el estado anterior y una accion, y devuelve el nuevo estado
    reducer: {
        user: userSlice,
        editText: groupSlice
    }
});