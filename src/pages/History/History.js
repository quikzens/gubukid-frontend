import { useUser } from '../../contexts/UserContext'
import { useAlert } from '../../contexts/AlertContext'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import BookingItem from '../../components/BookingItem/BookingItem'
import '../Booking/Booking.css'

export default function History() {
  const { loggedInUser } = useUser()
  const { invokeAlert } = useAlert()

  const [histories, setHistories] = useState([])
  const [isLoading, setLoading] = useState(true)

  const fetchHistories = () => {
    fetchData(
      '/transactions?status=approved',
      setHistories,
      setLoading,
      invokeAlert
    )
  }

  useEffect(() => {
    fetchHistories()
    return () => {
      fetchHistories(null)
    }
  }, [])

  return (
    <div className="page-history">
      <h1 className="px-3 text-center pb-2">
        {loggedInUser.user_role === 'tenant' ? 'Booking' : 'Income'} History
      </h1>
      {isLoading ? (
        <div className="w-100 d-flex jc-center">
          <Loading size="medium" color="gray" />
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {histories.map((history) => (
            <BookingItem booking={history} key={history.id} />
          ))}
        </div>
      )}
    </div>
  )
}
