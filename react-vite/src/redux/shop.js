import { csrfFetch } from "./csrf";

const LOAD_EQUIPMENT = 'shop/loadEquipment';

const loadEquipment = (equipmentData) => {
  return {
    type: LOAD_EQUIPMENT,
    equipmentData
  };
};

export const getShopEquipmentThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current/shop`);

  const equipmentData = await res.json();
  if (res.ok)
    dispatch(loadEquipment(equipmentData));
  return equipmentData;
}

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
    default:
      return state;
  }
}

export default shopReducer;
