import { categoryConstants, productConstants } from '../_Constants'
import axios from 'axios';



export const categorysAdd = (category) => {
    console.log(category, "category");
    return async (dispatch) => {

        await dispatch({ type: categoryConstants.ADDCATEGORY_REQUEST });

        let response = await axios({
            url: "http://localhost:8001/iapi/categoryAdd",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: category,
        })

        // let data = await axios.post("/categoryAdd", category);
        console.log(response.data, "data");
        if (response.data && response.data.error_code == 0) {
            let payload = response.data.data;
            await dispatch({
                type: categoryConstants.ADDCATEGORY_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: categoryConstants.ADDCATEGORY_FAILURE,
                payload: "Error"
            });
        }
    }
}

export const categoryList = (category) => {
    console.log(category, "category");
    return async (dispatch) => {

        await dispatch({ type: categoryConstants.CATEGORYLIST_REQUEST });

        let response = await axios({
            url: "http://localhost:8001/iapi/categoryList",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: category,
        })

        console.log(response.data, "data");

        if (response.data && response.data.error_code == 0) {
            let payload = response.data.data;
            await dispatch({
                type: categoryConstants.CATEGORYLIST_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: categoryConstants.CATEGORYLIST_FAILURE,
                payload: "Error"
            });
        }



    }
}





export const getAllData = (category) => {
    console.log(category, "category");
    return async (dispatch) =>

        new Promise((resolve, reject) => {

            dispatch({ type: categoryConstants.CATEGORYLIST_REQUEST });

            axios({
                url: "http://localhost:8001/iapi/getAlldata",
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                data: category,
            }).then((response) => {
                console.log(response.data, "data");
                if (response.data && response.data.error_code == 0) {
                    let catogoryArray = response.data.data.catogoryArray;
                    let productArray = response.data.data.productArray;
                    let productCounts = response.data.data.productCounts;
                    dispatch({
                        type: categoryConstants.CATEGORYLIST_SUCCESS,
                        payload: catogoryArray
                    });
                    dispatch({
                        type: productConstants.PRODUCTLIST_SUCCESS,
                        payload: productArray,
                        productCounts: productCounts
                    });
                    return resolve(catogoryArray)
                }
            },
                (err) => {
                    dispatch({
                        type: categoryConstants.CATEGORYLIST_FAILURE,
                        payload: "Error"
                    });
                    return reject("err")
                });


        });
}