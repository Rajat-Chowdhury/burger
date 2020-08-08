import { delay } from 'redux-saga/effects';
import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as  actions from '../actions/index';

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}


export function* chechAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
}

export function* authUserSaga ( action){

    yield put(actions.authStart());
    const authData = {
        email : action.email , 
        password :action.password,
        returnSecureToken : true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWiNPh2f30SVq1O0XTthL_kX8BufJXMQg';
   
    if(!action.isSignup){
        url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWiNPh2f30SVq1O0XTthL_kX8BufJXMQg'
    }
    try{

        const response = yield axios.post(url, authData)
      
       
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationDate',expirationDate);
            yield localStorage.setItem('userId',response.data.localId);
            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch(error){
        yield put(actions.authFail(error.response.data.error));
    }

}