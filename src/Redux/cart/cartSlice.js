import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allData:false,
    total: false,
    allProducts:false
}
const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_ITEM: (state, action) => {
            const idArray = []
            const allData = []
            const copyData = []
            let numOfAll = 0
            let allProducts = 0
            action.payload.forEach(ele => {
                ele.num = 1
                if (!idArray.includes(ele.id)) {
                    idArray.push(ele.id)
                    allData.push(ele)
                } else {
                    copyData.push(ele.id)
                    let x = allData.find(eles => eles.id === ele.id)
                    x.num += 1
                }
                
            })
            allData.forEach(ele=>{
                numOfAll += ele.num * ele.price
                allProducts += ele.num
            })
            state.allData = allData
            state.total = numOfAll
            state.allProducts = allProducts
        },
    }
})
export let { ADD_ITEM } = cart.actions
export default cart.reducer