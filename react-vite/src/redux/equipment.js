import { csrfFetch } from "./csrf";

const LOAD_EQUIPMENT = 'equipment/loadEquipment';

const loadEquipment = (equipmentData) => {
  return {
    type: LOAD_EQUIPMENT,
    equipmentData
  };
};

export const getUserEquipmentThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/equipment/current`);

  const equipmentData = await res.json();
  if (res.ok)
    dispatch(loadEquipment(equipmentData));
  return equipmentData;
}

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
    default:
      return state;
  }
}

export default equipmentReducer;
