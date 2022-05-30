import { useState } from 'react'
import { useAlert } from '../../../contexts/AlertContext'
import { API, configForm } from '../../../config/api'
import Loading from '../../../components/Loading/Loading'
import { BsCheck } from 'react-icons/bs'

export default function PayTransactionBtn(props) {
  const { invokeAlert } = useAlert()
  const [status, setStatus] = useState('idle')

  const { setBooking, bookingId } = props

  const handlePayTransaction = async (e) => {
    setStatus('loading')

    const { files } = e.target

    const data = new FormData()
    data.append('payment_proof', files[0], files[0].name)

    try {
      const response = await API.patch(`/transactions/pay/${bookingId}`, data, {
        withCredentials: true,
        ...configForm,
      })
      const newPaymentProof = response.data.data.new_image
      setBooking((prev) => {
        return {
          ...prev,
          payment_status: 'waiting-approve',
          payment_proof: newPaymentProof,
        }
      })
      invokeAlert('success', 'Success upload bukti pembayaran')

      setStatus('success')
      setTimeout(() => setStatus('idle'), 750)
    } catch (err) {
      invokeAlert('error', 'Gagal upload bukti pembayaran')
      setStatus('idle')
    }
  }

  return (
    <div className="booking__cta">
      <label className={`button ${status !== 'idle' ? 'disabled' : ''}`}>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={handlePayTransaction}
          className="v-hidden"
          disabled={status !== 'idle'}
          required
        />
        <div className="button-content">{buttonContent[status]}</div>
      </label>
    </div>
  )
}

const buttonContent = {
  idle: 'Pay',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
