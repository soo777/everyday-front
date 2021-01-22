import { ActionType, createReducer, createAction } from 'typesafe-actions';

const SET_ADD_MEMBER_MODAL = 'modal/SET_ADD_MEMBER_MODAL';

export const setAddMemberModal = createAction(SET_ADD_MEMBER_MODAL)<any>();

const actions = { setAddMemberModal };
type ModalAction = ActionType<typeof actions>;

type ModalState = {
  addMemberModal: boolean;
}

const initialState: ModalState = {
  addMemberModal: false,
};

const modal = createReducer<ModalState, ModalAction>(initialState, {
  [SET_ADD_MEMBER_MODAL]: (state, action) => ({ ...state, addMemberModal: action.payload }),
});

export default modal;
