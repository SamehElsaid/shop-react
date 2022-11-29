import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chair: false,
    soft: false,
    modile: false,
    watch: false,
    all: [],
    allEdit:[]
}

const prodictsData = createSlice({
    name: "prodictsData",
    initialState,
    reducers: {
        ADD_CHAIRS: (state, action) => {
            if (!state.chair) {
                action.payload.forEach(ele => state.all.push(ele))
                action.payload.forEach(ele => state.allEdit.push(ele))
            }
            state.chair = action.payload
        },
        ADD_SOFT: (state, action) => {
            if (!state.soft) {
                action.payload.forEach(ele => state.all.push(ele))
                action.payload.forEach(ele => state.allEdit.push(ele))
            }
            state.soft = action.payload
        },
        ADD_MODILE: (state, action) => {
            if (!state.modile) {
                action.payload.forEach(ele => state.all.push(ele))
                action.payload.forEach(ele => state.allEdit.push(ele))
            }
            state.modile = action.payload
        },
        ADD_WATCH: (state, action) => {
            if(!state.watch){
                action.payload.forEach(ele=> state.all.push(ele))
                action.payload.forEach(ele => state.allEdit.push(ele))
            }
            state.watch = action.payload
        },
        LOG: (state) => {
            state.allEdit.forEach((ele, i) => ele.imgUrl = (state.all[i].imgUrl))
        }
    }
})

export let { ADD_CHAIRS, ADD_SOFT, ADD_MODILE, ADD_WATCH, LOG } = prodictsData.actions
export default prodictsData.reducer