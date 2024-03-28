import OpenModalRewardItem from '../Rewards/OpenModalRewardItem';
import EditRewardModal from '../EditRewardModal/EditRewardModal';
import './RewardItemTile.css';

function RewardItemTile({ user, reward }) {
  return (
    <>
      <div className="reward-tile">
        <OpenModalRewardItem
          reward={reward}
          itemText={reward.title}
          modalComponent={<EditRewardModal user={user} reward={reward} />}
        />
      </div>
    </>
  );
}

export default RewardItemTile;
