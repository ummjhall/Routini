import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from "../../redux/avatars";
import { getShopEquipmentThunk } from '../../redux/shop';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import ShopSection from './ShopSection';
import './Shop.css';

function Shop() {
  const user = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar.avatar);
  const dispatch = useDispatch();
  const shopEquipment = useSelector(state => state.shop.equipment);
  const equipment = Object.values(shopEquipment);

  useEffect(() => {
    if (user && !avatar) dispatch(getUserAvatar());
    dispatch(getShopEquipmentThunk());
  }, [user, avatar, dispatch]);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <>
      <ViewAvatar />
      <div className='shop-wrapper'>
        <h1 className='equipment_heading'>Shop - Equipment</h1>
        <div>
          <ShopSection equipment={equipment} />
        </div>
      </div>
    </>
  );
}

export default Shop;
