import { useEffect, useState } from 'react'
import ListHouse from '../../components/ListHouse/ListHouse'
import FilterHomeForm from './FilterHomeForm/FilterHomeForm'
import Loading from '../../components/Loading/Loading'
import { useAlert } from '../../contexts/AlertContext'
import { fetchData } from '../../utils/fetchData'
import Pagination from './Pagination/Pagination'

export default function Home() {
  const { invokeAlert } = useAlert()

  const [houses, setHouses] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    type_rent: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    province: '',
    city: '',
    amenities: '',
  })
  const [page, setPage] = useState(1)
  const [totalHouse, setTotalHouse] = useState(0)

  const fetchHouses = async (filter, page) => {
    await fetchData(
      `/houses?type_rent=${filter.type_rent}&bedrooms=${
        filter.bedrooms
      }&bathrooms=${filter.bathrooms}&price=${filter.price}&province=${
        filter.province
      }&city=${filter.city}&amenities=${filter.amenities}&limit=12&offset=${
        (page - 1) * 12
      }`,
      setHouses,
      setLoading,
      invokeAlert
    )
    await fetchData(
      `/houses/count?type_rent=${filter.type_rent}&bedrooms=${filter.bedrooms}&bathrooms=${filter.bathrooms}&price=${filter.price}&province=${filter.province}&city=${filter.city}&amenities=${filter.amenities}`,
      setTotalHouse,
      setLoading,
      invokeAlert
    )
  }

  useEffect(() => {
    fetchHouses(filter, page)
    return () => {
      setHouses(null)
      setTotalHouse(0)
    }
  }, [filter, page])

  return (
    <div className="page-home d-flex">
      <div className="w-100">
        <div className="house-list-container">
          {isLoading ? (
            <div className="w-100 d-flex jc-center">
              <Loading size="medium" color="gray" />
            </div>
          ) : (
            <>
              <ListHouse houses={houses} />
              <Pagination
                page={page}
                setPage={setPage}
                totalHouse={totalHouse}
              />
            </>
          )}
        </div>
      </div>
      <FilterHomeForm setFilter={setFilter} />
    </div>
  )
}
