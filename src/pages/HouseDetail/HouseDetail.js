import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from '../../contexts/AlertContext'
import { useUser } from '../../contexts/UserContext'
import { fetchData } from '../../utils/fetchData'
import { API } from '../../config/api'
import Modal from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'
import EditHouseForm from './EditHouseForm/EditHouseForm'
import BookHouseForm from './BookHouseForm/BookHouseForm'
import { provinces } from '../../data/provinces'
import { cities } from '../../data/cities'
import { FaBed, FaBath, FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { BsCheck } from 'react-icons/bs'
import './HouseDetail.css'

export default function HouseDetail() {
  const { id } = useParams()
  const { invokeAlert } = useAlert()
  const { loggedInUser } = useUser()
  const navigate = useNavigate()

  const [house, setHouse] = useState({})
  const [status, setStatus] = useState('idle')
  const [isLoading, setLoading] = useState(true)

  const [isEditHouseActive, setEditHouseActive] = useState(false)
  const [isDeleteHouseActive, setDeleteHouseActive] = useState(false)
  const [isBookHouseActive, setBookHouseActive] = useState(false)

  const fetchHouse = async () => {
    await fetchData(`/houses/${id}`, setHouse, setLoading, invokeAlert)
    setHouse((prev) => {
      console.log(prev.amenities)
      return {
        ...prev,
        amenities: prev.amenities === '' ? [] : prev.amenities.split(','),
      }
    })
  }

  useEffect(() => {
    fetchHouse()
    return () => {
      setHouse(null)
    }
  }, [])

  const deleteHouse = async (id) => {
    setStatus('loading')

    try {
      const response = await API.delete(`/houses/${id}`, {
        withCredentials: true,
      })
      setDeleteHouseActive(false)
      invokeAlert('success', `Success Delete House`)
      navigate('/houses', { replace: true })
      setStatus('idle')
    } catch (err) {
      invokeAlert('error', `Error Delete House`)
      setStatus('idle')
    }
  }

  return (
    <div className="page-house-detail">
      {isLoading ? (
        <div className="w-100 d-flex jc-center">
          <Loading size="medium" color="gray" />
        </div>
      ) : (
        <>
          <div className="detailproperty__images">
            <div className="detailproperty__image">
              <img src={house.featured_image} alt="" />
            </div>
            {/* detail images */}
            {/* {house.detailImages?.length !== 0 && (
            <div className="detailproperty__details">
              {house.detailImages?.map((image) => (
                <div key={image.id} className="detailproperty__details-image">
                  <img src={image.url} alt="" />
                </div>
              ))}
            </div>
          )} */}
          </div>
          <div className="detailproperty__content">
            <div className="d-flex jc-between">
              <h1 className="detailproperty__title">{house.title}</h1>
              {loggedInUser.user_role === 'owner' &&
                loggedInUser.user_id === house.owner_id && (
                  <div className="d-flex gap-05 ai-start">
                    <button
                      className="house-detail-btn"
                      onClick={() => setEditHouseActive(true)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="house-detail-btn"
                      onClick={() => setDeleteHouseActive(true)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
            </div>
            <div className="detailproperty__info">
              <div>
                <div className="detailproperty__price">
                  Rp.
                  {new Intl.NumberFormat(['ban', 'id']).format(
                    house.price.toString()
                  )}
                  /{house.type_rent}
                </div>
                <div className="detailproperty__address">
                  {cities[house.city_id].name.toLowerCase()},{' '}
                  {provinces[house.province_id].name.toLowerCase()}
                </div>
              </div>
              <div className="detailproperty__features">
                <div className="detailproperty__feature">
                  <p>Bedrooms</p>
                  <div className="d-flex gap-05 ai-center">
                    {house.bedrooms}
                    <FaBed />
                  </div>
                </div>
                <div className="detailproperty__feature">
                  <p>Bathrooms</p>
                  <div className="d-flex gap-05 ai-center">
                    {house.bathrooms}
                    <FaBath />
                  </div>
                </div>
                <div className="detailproperty__feature">
                  <p>Area</p>
                  <div>
                    {house.area} m<sup>2</sup>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailproperty__description">
              <h3>Description</h3>
              <p>{house.description}</p>
            </div>
            {loggedInUser.user_role === 'tenant' && (
              <div className="detailproperty__cta">
                <button type="button" onClick={() => setBookHouseActive(true)}>
                  Book Now
                </button>
              </div>
            )}
            {/* {loggedInUser.role === 'owner' && (
              <div className="detailproperty__cta">
                <button type="button" onClick={toggleAddDetails}>
                  add detail images
                </button>
              </div>
            )} */}
          </div>

          <Modal
            isActive={isDeleteHouseActive}
            closeModal={() => setDeleteHouseActive(false)}
            title="Confirmation"
          >
            <p>Kamu yakin ingin menghapus rumah ini?</p>
            <button
              className={`button house-delete-btn ${
                status !== 'idle' ? 'disabled' : ''
              }`}
              onClick={() => deleteHouse(id)}
            >
              {buttonContent[status]}
            </button>
          </Modal>

          {!isLoading && (
            <Modal
              isActive={isEditHouseActive}
              closeModal={() => setEditHouseActive(false)}
              title="Edit House"
            >
              <EditHouseForm
                closeModal={() => setEditHouseActive(false)}
                house={house}
                setHouse={setHouse}
              />
            </Modal>
          )}

          {!isLoading && (
            <Modal
              isActive={isBookHouseActive}
              closeModal={() => setBookHouseActive(false)}
              title="Book House"
            >
              <BookHouseForm
                closeModal={() => setBookHouseActive(false)}
                house={house}
                setHouse={setHouse}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  )
}

const buttonContent = {
  idle: 'Iya',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
