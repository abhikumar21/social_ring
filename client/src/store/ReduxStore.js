import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";

import thunk from "redux-thunk"
import {reducers} from '../reducers'

//42:49
// store <--> reducer <--> action <--> api

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);

    } catch (error) {
        console.log(error)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore===null) return undefined;
        return JSON.parse(serializedStore);

    } catch (e) {
        console.log(e)
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)))
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
