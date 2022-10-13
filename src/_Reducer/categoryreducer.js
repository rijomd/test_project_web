import { categoryConstants } from '../_Constants'

const initialState = {
    categoryfullData: [],
    categorySingle: {},
    isListing: false,
    isaddcategory: false,
}

export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        //listing
        case categoryConstants.CATEGORYLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                categoryfullData: [],
            }
            break;
        case categoryConstants.CATEGORYLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                categoryfullData: action.payload,
            }
            break;
        case categoryConstants.CATEGORYLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                categoryfullData: [],
            }
            break;


        //adding
        case categoryConstants.ADDCATEGORY_REQUEST:
            state = {
                ...state,
                isaddcategory: true,
                categorySingle: {},
            }
            break;
        case categoryConstants.ADDCATEGORY_SUCCESS:
            state = {
                ...state,
                isaddcategory: false,
                categorySingle: action.payload,
            }
            break;
        case categoryConstants.ADDCATEGORY_FAILURE:
            state = {
                ...state,
                isaddcategory: false,
                categorySingle: {},
            }
            break;

    }
    return state;
}