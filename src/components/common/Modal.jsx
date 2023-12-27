import styles from './Modal.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { closeModal, selectIsModalOpen} from '../../store/modalSlice';

const Modal = ({children}) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modal_overlay} onClick={handleCloseModal}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <div className="centered-div">
        {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;
