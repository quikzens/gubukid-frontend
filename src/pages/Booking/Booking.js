import { useAlert } from '../../contexts/AlertContext'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import BookingItem from '../../components/BookingItem/BookingItem'
import './Booking.css'

export default function Booking() {
  const { invokeAlert } = useAlert()

  const [bookings, setBookings] = useState([])
  const [isLoading, setLoading] = useState(true)

  const fetchBookings = () => {
    fetchData(
      '/transactions?status=waiting-payment,waiting-approve',
      setBookings,
      setLoading,
      invokeAlert
    )
  }

  useEffect(() => {
    fetchBookings()
    return () => {
      fetchBookings(null)
    }
  }, [])

  return (
    <div className="page-booking">
      {isLoading ? (
        <div className="w-100 d-flex jc-center">
          <Loading size="medium" color="gray" />
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {bookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      )}
    </div>
  )
}
