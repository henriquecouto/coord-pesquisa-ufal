import { createActions, createReducer } from "reduxsauce";
import User from "../../entities/User";
import IUserState from "../definitions/UserState";

export const { Types: UserTypes, Creators: UserActions } = createActions({
  registerUserRequested: ["data", "callback"],
  registerUserSucceeded: ["data"],
  registerUserFailed: ["error"],
});

export const INITIAL_STATE: IUserState = {
  loggedAccount: undefined,
  loading: false,
  error: undefined,
};

const requested = (state: IUserState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IUserState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const registerUserSucceeded = (state: IUserState, { data }: { data: User }) => {
  return { ...state, loading: false, account: data };
};

export const userReducer = createReducer(INITIAL_STATE, {
  [UserTypes.REGISTER_USER_REQUESTED]: requested,
  [UserTypes.REGISTER_USER_FAILED]: failed,
  [UserTypes.REGISTER_USER_SUCCEEDED]: registerUserSucceeded,
});
