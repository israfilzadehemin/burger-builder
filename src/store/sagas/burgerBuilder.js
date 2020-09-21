import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
  try {
    const resp = yield axios.get(
      "https://emin-burgerbuilder-react.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(resp.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
