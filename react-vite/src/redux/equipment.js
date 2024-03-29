import { csrfFetch } from "./csrf";

const LOAD_EQUIPMENT = 'equipment/loadEquipment';
const RENAME_ITEM = 'equipment/renameItem';
const REMOVE_ITEM = 'equipment/removeItem';

const loadEquipment = (equipmentData) => {
  return {
    type: LOAD_EQUIPMENT,
    equipmentData
  };
};

const renameItem = (itemData) => {
  return {
    type: RENAME_ITEM,
    itemData
  };
};

const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId
  };
};

export const getUserEquipmentThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current`);

  const equipmentData = await res.json();
  if (res.ok)
    dispatch(loadEquipment(equipmentData));
  return equipmentData;
};

export const renameItemThunk = (itemId, itemFormData) => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify(itemFormData)
  });

  const itemData = await res.json();
  if (res.ok)
    dispatch(renameItem(itemData));
  return itemData;
};

export const removeItemThunk = (itemId) => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/${itemId}`, {
    method: 'DELETE'
  });

  const itemData = await res.json();
  if (res.ok)
    dispatch(removeItem(itemId));
  return itemData;
};

const initialState = {};

function equipmentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EQUIPMENT: {
      const equipment = {}
      action.equipmentData.Equipment.forEach(item => {
        equipment[item.id] = item;
      });
      return {...equipment};
    }
    case RENAME_ITEM: {
      return {...state, [action.itemData.id]: action.itemData};
    }
    case REMOVE_ITEM: {
      const newState = {...state};
      delete newState[action.itemId];
      return newState;
    }
    default:
      return state;
  }
}

export default equipmentReducer;
