import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED
} from '../types';

const INITIAL_STATE = {
    productId : {},
    productList : [],
    brands : [],
    error : false,
    loading : false,
};

export const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_DATA_START : 
            return {
                ...state,
                loading : true
            }
        case FETCH_DATA_SUCCESS : 
            return {
                ...state,
                productList : action.payload,
                loading : false
            }
        case FETCH_DATA_FAILED : 
            return {
                ...state,
                error : true,
                loading : false
            }
        default : 
            return state
    }
}