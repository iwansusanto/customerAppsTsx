import { put, call, fork, takeLatest, takeEvery } from "redux-saga/effects"
import * as types from "../actions/types"
import { changeUser } from "../actions/loginActions";
import api from "../utils/api";
import { setData } from '../utils/storage'
import { keys } from '../config/keys'

export async function* changeUsers(action) {
  try {
    await setData(keys.user, JSON.stringify(action.payload))
  } catch (error) {
    console.log('Error changeUsers : ', error)
  }
}

export function* watchChangeUsers() {
  yield takeLatest(types.CHANGE_USER, changeUsers);
}