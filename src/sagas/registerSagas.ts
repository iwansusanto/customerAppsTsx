import { put, call, fork, takeLatest, takeEvery } from "redux-saga/effects"
import * as types from "../actions/types"
import { register } from "../actions/registerActions";
import api from "../utils/api";
import { setData } from '../utils/storage'
import { keys } from '../config/keys'

export async function* registerUsers(action) {
  try {
    await setData(keys.user, JSON.stringify(action.payload))
  } catch (error) {
    console.log('Error changeUsers : ', error)
  }
}

export function* watchRegisterUsers() {
  yield takeLatest(types.REGISTER, register);
}