import axios from 'axios'
const GET_DATA = 'GET_DATA'
const SET_CURRENCY = 'SET_CURRENCY'

let initialState = {
 data : [],
 currency:{}
};

const reducer = (state = initialState, action) => {
  if (action.type === GET_DATA) {
    return {
      ...state,
      data: action.data,
    };
  }
  if (action.type === SET_CURRENCY) {
    return {
      ...state,
      currency: action.currency,
    };
  }
  return state;
};

export const getData = (data) => ({type: GET_DATA, data});
export const setCurrency = (currency) => ({type: SET_CURRENCY, currency});

export const getDataFromDB = () =>{
  return dispatch =>{
    axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then(response =>{
      
      dispatch(getData(response.data))
      dispatch(setCurrency(response.data[0]))
    })
  }
}

export default reducer;
