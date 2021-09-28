const redux = require('redux')
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
// three core concepts:

// 1) store - A store that holds the state of your application
// 2) action - An action that describes the changes in the state of the application.
// 3) reducer - A reducer which actually carries out the state transition depending on the action.

// ACTIONS
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'
const RESTOCK_STORE = 'RESTOCK_STORE'

function buyCake() {
  return {
    type: BUY_CAKE,
  }
}
function buyIceCream() {
  return {
    type: BUY_ICE_CREAM,
  }
}
function restockStore() {
  return {
    type: RESTOCK_STORE,
  }
}
const initialCakeState = {
  numOfCakes: 10,
}
const initialIceCreamState = {
  numOfIceCream: 10,
}
//---------------------------------------------------------
// REDUCERS
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }
    case RESTOCK_STORE:
      return {
        ...state,
        numOfCakes: 10,
      }

    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      }
    case RESTOCK_STORE:
      return {
        ...state,
        numOfIceCream: 10,
      }

    default:
      return state
  }
}
//---------------------------------------------------------
// STORE
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() => {})
//---------------------------------------------------------
for (let index = 0; index < 10; index++) {
  if (index === 9) {
    store.dispatch(restockStore())
  }
  store.dispatch(buyCake())
  store.dispatch(buyIceCream())
}
unsubscribe()
