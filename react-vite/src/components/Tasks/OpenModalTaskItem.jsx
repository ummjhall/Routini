import { useModal } from '../../context/Modal';
import '../Tasks/TaskItemTile.css';

function OpenModalTaskItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  // itemImage,
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  customClass,
  task,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  return (
    <div className="task-tile-content" onClick={onClick}>
      <div className={customClass} >
        <p>{itemText}</p>
        <small>{task.description}</small>
      </div>
    </div>
  );

  // return itemImage ? (
  //   <div onClick={onClick}>{itemImage}</div>
  //   ) : (
  //   <li className={customClass} onClick={onClick}>{itemText}</li>
  // );
}

export default OpenModalTaskItem;
