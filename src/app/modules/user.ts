import { ActionType, createReducer, createAction } from 'typesafe-actions';

const HANDLE_CREATE_USER_MODAL = 'user/HANDLE_CREATE_LOGIN_MODAL';
const HANDLE_USER_INFO_MODAL = 'user/HANDLE_USER_INFO_MODAL';

export const handleCreateUserModal = createAction(HANDLE_CREATE_USER_MODAL)<boolean>();
export const handleUserInfoModal = createAction(HANDLE_USER_INFO_MODAL)<boolean>();

const actions = { handleCreateUserModal, handleUserInfoModal };
type UserAction = ActionType<typeof actions>;

type userState = {
  createUserModal: boolean;
  userInfoModal: boolean;
}

const initialState: userState = {
  createUserModal: false,
  userInfoModal: false,
};

const user = createReducer<userState, UserAction>(initialState, {
  [HANDLE_CREATE_USER_MODAL]: (state, action) => ({ ...state, createUserModal: action.payload }),
  [HANDLE_USER_INFO_MODAL]: (state, action) => ({ ...state, userInfoModal: action.payload }),
});

export default user;
