import close_icon from '../../assets/icons/close.svg'
import './Modal.css'

export default function Modal(props) {
  const { isActive, closeModal, title, children } = props

  return (
    <div className={`modal ${isActive ? 'active' : ''}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          <img src={close_icon} alt="" />
        </button>
        <h3 className="modal-heading">{title}</h3>
        {children}
      </div>
    </div>
  )
}
