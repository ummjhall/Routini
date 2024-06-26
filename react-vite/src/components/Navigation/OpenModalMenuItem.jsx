import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  itemImage,
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  customClass
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return itemImage ? (
    <div onClick={onClick}>{itemImage}</div>
    ) : (
    <button className={customClass} onClick={onClick}>{itemText}</button>
  );
}

export default OpenModalMenuItem;
