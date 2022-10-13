import { productConstants } from '../_Constants'
import axios from 'axios';



export const productsAdd = (product) => {
    console.log(product, "product");
    return async (dispatch) => {

        await dispatch({ type: productConstants.ADDPRODUCT_REQUEST });

        let response = await axios({
            url: "http://localhost:8001/iapi/productsAdd",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: product,
        })

        console.log(response.data, "data");
        if (response.data && response.data.error_code == 0) {
            let payload = response.data.data;
            await dispatch({
                type: productConstants.ADDPRODUCT_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: productConstants.ADDPRODUCT_FAILURE,
                payload: "Error"
            });
        }
    }
}

export const productsList = (product) => {
    console.log(product, "product");
    return async (dispatch) => {

        await dispatch({ type: productConstants.PRODUCTLIST_REQUEST });

        let response = await axios({
            url: "http://localhost:8001/iapi/productsList",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: product,
        })

        console.log(response.data, "data");

        if (response.data && response.data.error_code == 0) {
            let payload = response.data.data;
            await dispatch({
                type: productConstants.PRODUCTLIST_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: productConstants.PRODUCTLIST_FAILURE,
                payload: "Error"
            });
        }



    }
}