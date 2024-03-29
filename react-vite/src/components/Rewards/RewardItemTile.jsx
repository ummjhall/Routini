import OpenModalRewardItem from './OpenModalRewardItem'
import EditRewardModal from '../EditRewardModal/EditRewardModal';
import './RewardItemTile.css';

function RewardItemTile({ user, reward, avatar }) {
  return (
    <>
      <div className="reward-tile">
        <OpenModalRewardItem
          avatar={avatar}
          reward={reward}
          itemText={reward.title}
          modalComponent={<EditRewardModal user={user} reward={reward} avatar={avatar} />}
          customClass={'reward-button-for-modal'}
        />
      </div>
    </>
  );
}

export default RewardItemTile;
