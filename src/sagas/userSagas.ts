import { put, call, fork, takeLatest, takeEvery } from "redux-saga/effects"
import * as types from "../actions/types"
import * as postRequest from "../utils/services/postRequest"
import api from "../utils/api";
import { setData, getData } from '../utils/storage'
import { keys } from '../config/keys'

export async function* changeUsers(action) {
  try {
    await setData(keys.user, JSON.stringify(action.payload))
    await api.changeToken(action.payload.token)
  } catch (error) {
    console.log('Error changeUsers : ', error)
  }
}

export function* watchChangeUsers() {
  yield takeLatest(types.CHANGE_USER, changeUsers)
}

export function* loginUsers(action) {
  console.log('DATA LOGIN : ', 'LOGIN')
  try {
    const { data } = yield call(postRequest.login, action.payload)
    console.log('DATA LOGIN : ', data)
    if(data.success) {
      action.onSuccess(data)
    } else {
      action.onFailed(data)
    }
  } catch(error) {
    console.log('Error changeUsers : ', error)
  }
}

export function* watchLoginUsers() {
  yield takeLatest(types.LOGIN, loginUsers)
}

export async function* changeLanguage(action) {
  try {
    await setData(keys.language, action.payload)
    const dataUser = await getData(keys.user)
    let updateUser = await {...JSON.parse(dataUser), language: action.payload}
    await setData(keys.user, JSON.stringify(updateUser))
  } catch (error) {
    console.log('Error changeUsers : ', error)
  }
}

export function* watchChangeLanguage() {
  yield takeLatest(types.CHANGE_LANGUAGE, changeLanguage)
}