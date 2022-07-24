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

//Exporto el objeto group desde redux
export const idTitle = (e) => (dispatch) => {
    dispatch(editText(e))
}

export const{editText} = groupSlice.actions;

export const idData = (state) => state.editText;

export default groupSlice.reducer