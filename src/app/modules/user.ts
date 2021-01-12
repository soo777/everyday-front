import { ActionType, createReducer, createAction } from 'typesafe-actions';

const HANDLE_CREATE_USER_MODAL = 'user/HANDLE_CREATE_LOGIN_MODAL';
const HANDLE_USER_INFO_MODAL = 'user/HANDLE_USER_INFO_MODAL';
const GET_MEMBER_LIST = 'user/GET_MEMBER_LIST';

export const handleCreateUserModal = createAction(HANDLE_CREATE_USER_MODAL)<boolean>();
export const handleUserInfoModal = createAction(HANDLE_USER_INFO_MODAL)<boolean>();
export const getMemberList = createAction(GET_MEMBER_LIST)<any>();

const actions = { handleCreateUserModal, handleUserInfoModal,getMemberList };
type UserAction = ActionType<typeof actions>;

type userState = {
  createUserModal: boolean;
  userInfoModal: boolean;
  memberList: any;
}

const initialState: userState = {
  createUserModal: false,
  userInfoModal: false,
  memberList: [],
};

const user = createReducer<userState, UserAction>(initialState, {
  [HANDLE_CREATE_USER_MODAL]: (state, action) => ({ ...state, createUserModal: action.payload }),
  [HANDLE_USER_INFO_MODAL]: (state, action) => ({ ...state, userInfoModal: action.payload }),
  [GET_MEMBER_LIST]: (state, action) => ({ ...state, memberList: action.payload }),
});

export default user;
