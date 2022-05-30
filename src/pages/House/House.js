import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import ListHouse from '../../components/ListHouse/ListHouse'
import Loading from '../../components/Loading/Loading'
import { useAlert } from '../../contexts/AlertContext'
import { fetchData } from '../../utils/fetchData'
import './House.css'
import AddHouseForm from './AddHouseForm/AddHouseForm'

export default function House() {
  const { invokeAlert } = useAlert()

  const [houses, setHouses] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isAddHouseActive, setAddHouseActive] = useState(false)

  const fetchHouses = () => {
    fetchData('/houses/me', setHouses, setLoading, invokeAlert)
  }

  useEffect(() => {
    fetchHouses()
    return () => {
      setHouses(null)
    }
  }, [])

  return (
    <div className="page-house">
      <div className="page-house-header d-flex gap-15">
        <h1>Your House</h1>
        <button
          className="house-add-button"
          onClick={() => setAddHouseActive(true)}
        >
          Add House
        </button>
      </div>

      {isLoading ? (
        <div className="w-100 d-flex jc-center">
          <Loading size="medium" color="gray" />
        </div>
      ) : (
        <ListHouse houses={houses} />
      )}

      <Modal
        isActive={isAddHouseActive}
        closeModal={() => setAddHouseActive(false)}
        title="Add New House"
      >
        <AddHouseForm
          closeModal={() => setAddHouseActive(false)}
          setHouses={setHouses}
        />
      </Modal>
    </div>
  )
}
