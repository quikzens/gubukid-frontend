import { displayDate } from '../../../utils/displayTime'
import { provinces } from '../../../data/provinces'
import { cities } from '../../../data/cities'
import { useState } from 'react'
import logo from '../../../assets/images/logo.png'
import Loading from '../../../components/Loading/Loading'
import { BsCheck } from 'react-icons/bs'
import { API } from '../../../config/api'
import { useAlert } from '../../../contexts/AlertContext'

export default function DetailInvoice(props) {
  const { invokeAlert } = useAlert()
  const { transaction, setTransaction } = props
  const [status, setStatus] = useState('idle')

  const handleApprove = async (e) => {
    setStatus('loading')

    try {
      const response = await API.patch(
        `/transactions/status/${transaction.id}?status=approved`,
        null,
        { withCredentials: true }
      )
      setTransaction((prev) => {
        return {
          ...prev,
          payment_status: 'approved',
        }
      })
      invokeAlert('success', 'Success upprove pembayaran')

      setStatus('success')
      setTimeout(() => setStatus('idle'), 750)
    } catch (err) {
      console.log(err)
      invokeAlert('error', 'Gagal upprove pembayaran')
      setStatus('idle')
    }
  }

  if (!transaction) return

  return (
    <>
      <div
        className={`booking__item ${transaction.payment_status}`}
        key={transaction.id}
      >
        <div className="booking__content">
          <div className="booking__section">
            <div className="booking__section__sub">
              <img src={logo} alt="" className="booking__logo" />
              <h3>{transaction.house_title}</h3>
              <p className="booking__section__address">
                {provinces[transaction.house_province_id].name.toLowerCase()},{' '}
                {cities[transaction.house_city_id].name.toLowerCase()}
              </p>
              <div className="booking__status">
                {transaction.payment_status.replace('-', ' ')}
              </div>
            </div>
            <div className="booking__info">
              <div>
                <h4>Check In</h4>
                <p>{displayDate(transaction.check_in)}</p>
              </div>
              <div>
                <h4>Amenities</h4>
                {transaction.house_amenities
                  .split(',')
                  .map((amenity, index) => (
                    <p key={index}>{amenity}</p>
                  ))}
              </div>
              <div>
                <h4>Check Out</h4>
                <p>{displayDate(transaction.check_out)}</p>
              </div>
              <div>
                <h4>Type of Rent</h4>
                <p
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  {transaction.house_type_rent}
                </p>
              </div>
            </div>
            <div className="booking__payment">
              <h3>Booking</h3>
              <p>{displayDate(transaction.created_at, true)}</p>
              <img src={transaction.payment_proof} alt="" />
            </div>
          </div>
          <div className="booking__table__container">
            <table className="booking__table">
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td>{transaction.tenant_fullname}</td>
                  <td className="text-capitalize">
                    {transaction.tenant_gender}
                  </td>
                  <td>{transaction.tenant_phone_number}</td>
                  <td className="booking__table__info">Long time rent:</td>
                  <td className="booking__table__info text-capitalize">
                    {transaction.time_rent} {transaction.house_type_rent}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="booking__table__info">Total:</td>
                  <td className="booking__table__info booking__table__info__total">
                    Rp.{' '}
                    {new Intl.NumberFormat(['ban', 'id']).format(
                      transaction.total_payment
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {transaction.payment_status === 'waiting-approve' && (
            <div
              className="booking__cta"
              style={{
                display: 'flex',
                gap: '1.5rem',
                margin: '10px 35px 0 35px',
              }}
            >
              <button
                onClick={handleApprove}
                className={`button ${status !== 'idle' ? 'disabled' : ''}`}
              >
                <div className="button-content">{buttonContent[status]}</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const buttonContent = {
  idle: 'Approve',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
