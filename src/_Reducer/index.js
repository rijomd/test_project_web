import { categoryReducer } from './categoryreducer';
import { productReducer } from './productreducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,

});

export default rootReducer;
