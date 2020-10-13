import { ActionType, createReducer, createAction } from 'typesafe-actions';

const HANDLE_CREATE_USER_MODAL = 'user/HANDLE_CREATE_LOGIN_MODAL';

export const handleCreateUserModal = createAction(HANDLE_CREATE_USER_MODAL)<boolean>();

const actions = { handleCreateUserModal };
type UserAction = ActionType<typeof actions>;

type userState = {
  createUserModal: boolean;
}

const initialState: userState = {
  createUserModal: false,
};

const user = createReducer<userState, UserAction>(initialState, {
  [HANDLE_CREATE_USER_MODAL]: (state, action) => ({ ...state, createUserModal: action.payload }),
});

export default user;
