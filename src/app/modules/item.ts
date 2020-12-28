import { ActionType, createReducer, createAction } from 'typesafe-actions';

const GET_ITEM_LIST = 'item/GET_ITEM_LIST';

export const getItemList = createAction(GET_ITEM_LIST)<any>();

const actions = { getItemList };
type ItemAction = ActionType<typeof actions>;

type ItemState = {
  itemList: any;
}

const initialState: ItemState = {
  itemList: [],
};

const item = createReducer<ItemState, ItemAction>(initialState, {
  [GET_ITEM_LIST]: (state, action) => ({ ...state, itemList: action.payload }),
});

export default item;
