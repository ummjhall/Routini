import { csrfFetch } from "./csrf";

const LOAD_EQUIPMENT = 'shop/loadEquipment';
const COLLECT_ITEM = 'shop/collectItem';

const loadEquipment = (equipmentData) => {
  return {
    type: LOAD_EQUIPMENT,
    equipmentData
  };
};

const collectItem = (itemId) => {
  return {
    type: COLLECT_ITEM,
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

export const collectItemThunk = (itemId) => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/${itemId}`, {
    method: 'POST'
  });

  const itemData = await res.json();
  if (res.ok)
    dispatch(collectItem(itemId));
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
    case COLLECT_ITEM: {
      const newState = {...state};
      delete newState.equipment[action.itemId];
      return newState;
    }
    default:
      return state;
  }
}

export default shopReducer;
