import {
  ActionType, createReducer, createAction, action,
} from 'typesafe-actions';

const HANDLE_ALERT_MODAL = 'common/HANDLE_ALERT_MODAL';
const SET_ALERT_MODAL = 'common/SET_ALERT_MODAL';

export const handleAlertModal = createAction(HANDLE_ALERT_MODAL)<boolean>();
export const setAlertModal = createAction(SET_ALERT_MODAL)<string, string>();

// payload 여러개 있을때 샘플
// export const setAlertModal = createAction(SET_ALERT_MODAL, (header, content, bool) => ({ header, content, bool }))();

const actions = { handleAlertModal, setAlertModal };
type CommonAction = ActionType<typeof actions>;

interface modal {
  header: string,
  content: string,
}

type commonState = {
  alertModal: boolean;
  alert: modal;
}

const initialState: commonState = {
  alertModal: false,
  alert: {
    header: 'alert',
    content: 'content',
  },
};

const user = createReducer<commonState, CommonAction>(initialState, {
  [HANDLE_ALERT_MODAL]: (state, action) => ({ ...state, alertModal: action.payload }),
  [SET_ALERT_MODAL]: (state, action) => ({ ...state, alert: { header: action.payload, content: action.meta } }),
  // [SET_ALERT_MODAL]: (state, action) => ({ ...state, alert: { header: action.payload, ...state.alert } }),

  // payload 여러개 있을때 샘플
  // [SET_ALERT_MODAL]: (state, action) => ({ ...state, alert: { header: action.payload.header, content: action.payload.content, modal: action.payload.bool } }),
});

export default user;
