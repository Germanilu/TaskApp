import {createSlice} from '@reduxjs/toolkit';



export const groupSlice = createSlice({
   
    name:"idTitle",
    initialState:{

    },
   
    reducers: {
        editText: (state,action) => {
            return{
                ...state,
                ...action.payload
            }
        } 
    },
});

export const idTitle = (e) => (dispatch) => {
    console.log("Estoy en redux y soy e", e)
    dispatch(editText(e))
}

export const{editText} = groupSlice.actions;

export const idData = (state) => state.editText;

export default groupSlice.reducer