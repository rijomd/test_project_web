import { productConstants } from '../_Constants'

const initialState = {
    productfullData: [],
    productSingle: {},
    isListing: false,
    isAddproduct: false,
    productCounts:0
}

export const productReducer = (state = initialState, action) => {

    switch (action.type) {
        //listing
        case productConstants.PRODUCTLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                productfullData: [],
            }
            break;
        case productConstants.PRODUCTLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                productfullData: action.payload,
                productCounts:action.productCounts
            }
            break;
        case productConstants.PRODUCTLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                productfullData: [],
            }
            break;


        //adding
        case productConstants.ADDPRODUCT_REQUEST:
            state = {
                ...state,
                isAddproduct: true,
                productSingle: {},
            }
            break;
        case productConstants.ADDPRODUCT_SUCCESS:
            state = {
                ...state,
                isAddproduct: false,
                productSingle: action.payload,
            }
            break;
        case productConstants.ADDPRODUCT_FAILURE:
            state = {
                ...state,
                isAddproduct: false,
                productSingle: {},
            }
            break;

    }
    return state;
}