import { useState } from 'react'
import { displayDate } from '../../utils/displayTime'
import { provinces } from '../../data/provinces'
import { cities } from '../../data/cities'
import logo from '../../assets/images/logo.png'
import PayTransactionBtn from '../../pages/Booking/PayTransactionBtn/PayTransactionBtn'

export default function BookingItem(props) {
  const [booking, setBooking] = useState(props.booking)

  return (
    <div className={`booking__item ${booking.payment_status}`} key={booking.id}>
      <div className="booking__content">
        <div className="booking__section">
          <div className="booking__section__sub">
            <img src={logo} alt="" className="booking__logo" />
            <h3>{booking.house_title}</h3>
            <p className="booking__section__address">
              {provinces[booking.house_province_id].name.toLowerCase()},{' '}
              {cities[booking.house_city_id].name.toLowerCase()}
            </p>
            <div className="booking__status">
              {booking.payment_status.replace('-', ' ')}
            </div>
          </div>
          <div className="booking__info">
            <div>
              <h4>Check In</h4>
              <p>{displayDate(booking.check_in)}</p>
            </div>
            <div>
              <h4>Amenities</h4>
              {booking.house_amenities.split(',').map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
            </div>
            <div>
              <h4>Check Out</h4>
              <p>{displayDate(booking.check_out)}</p>
            </div>
            <div>
              <h4>Type of Rent</h4>
              <p
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {booking.house_type_rent}
              </p>
            </div>
          </div>
          <div className="booking__payment">
            <h3>Booking</h3>
            <p>{displayDate(booking.created_at, true)}</p>
            <img src={booking.payment_proof} alt="" />
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
                <td>{booking.tenant_fullname}</td>
                <td className="text-capitalize">{booking.tenant_gender}</td>
                <td>{booking.tenant_phone_number}</td>
                <td className="booking__table__info">Long time rent:</td>
                <td className="booking__table__info text-capitalize">
                  {booking.time_rent} {booking.house_type_rent}
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
                    booking.total_payment
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {booking.payment_status === 'waiting-payment' && (
          <PayTransactionBtn setBooking={setBooking} bookingId={booking.id} />
        )}
      </div>
    </div>
  )
}
