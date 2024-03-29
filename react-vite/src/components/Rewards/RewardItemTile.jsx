import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx'
import EditRewardModal from '../EditRewardModal/EditRewardModal';
import UseRewardItem from './UseRewardItem.jsx'
import './RewardItemTile.css';
function RewardItemTile({ user, reward, avatar }) {
  return (
    <>
      <div className="reward-tile">
        <OpenModalMenuItem
          itemText={reward.title}
          modalComponent={<EditRewardModal user={user} reward={reward} avatar={avatar} />}
          customClass={'reward-button-for-modal'}
        />
        <UseRewardItem user={user} reward={reward} avatar={avatar} />
      </div>
    </>
  );
}

export default RewardItemTile;
