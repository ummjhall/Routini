import { editUserAvatar } from "../../redux/avatars";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './RewardItemTile.css';
function UseRewardItem({user, avatar, reward}) {
    const dispatch = useDispatch()
    // const { closeModal } = useModal()
    const completeTask = async (e) => {
        e.preventDefault();
        const updatedAvatar = {
            gold: avatar.gold - reward.cost,
        };
        return dispatch(editUserAvatar(updatedAvatar))
    }

    return (
        <img src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711434244/coin_l2gdi1.png"
        onClick={completeTask}
        className="reward-coin-img">
        </img>
    );
  }

  export default UseRewardItem
