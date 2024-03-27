import { csrfFetch } from "./csrf";

const LOAD_EQUIPMENT = 'shop/loadEquipment';
const BUY_ITEM = 'shop/buyItem';

const loadEquipment = (equipmentData) => {
  return {
    type: LOAD_EQUIPMENT,
    equipmentData
  };
};

const buyItem = (itemId) => {
  return {
    type: BUY_ITEM,
    itemId
  };
};

export const getShopEquipmentThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/shop`);

  const equipmentData = await res.json();
  if (res.ok)
    dispatch(loadEquipment(equipmentData));
  return equipmentData;
};

export const buyItemThunk = (itemId) => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/${itemId}`, {
    method: 'POST'
  });

  const itemData = await res.json();
  if (res.ok)
    dispatch(buyItem(itemId));
  return itemData;
};

const initialState = {equipment: {}};

function shopReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EQUIPMENT: {
      const equipment = {}
      action.equipmentData.Equipment.forEach(item => {
        equipment[item.id] = item;
      });
      return {...state, equipment: {...equipment}};
    }
    case BUY_ITEM: {
      const newState = {...state};
      delete newState.equipment[action.itemId];
      return newState;
    }
    default:
      return state;
  }
}

export default shopReducer;
