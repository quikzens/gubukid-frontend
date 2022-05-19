import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { useAlert } from '../../contexts/AlertContext'
import './Alert.css'

const icons = {
  success: <BsCheckCircleFill />,
  error: <BsFillXCircleFill />,
}

export default function Alert() {
  const { alertText, alertType, isAlertActive } = useAlert()

  return (
    <div
      className={`alert alert-${alertType} ${isAlertActive ? 'active' : ''}`}
    >
      <div className="alert-content d-flex gap-05">
        <div className="alert-icon">{icons[alertType]}</div>
        <div className="alert-text">{alertText}</div>
      </div>
    </div>
  )
}
