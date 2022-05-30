import { useEffect } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import './Pagination.css'

export default function Pagination(props) {
  const { page, setPage, totalHouse } = props

  var paginations = []
  for (let i = 1; i <= Math.ceil(totalHouse / 12); i++) {
    paginations.push(
      <li
        className={`pagination-number ${i === page ? 'active' : ''}`}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </li>
    )
  }

  return (
    <div className="d-flex jc-center">
      <ul className="pagination">
        <li
          className="pagination-btn"
          onClick={() => {
            if (page === 1) return
            setPage((prev) => prev - 1)
          }}
        >
          <BsChevronLeft />
        </li>
        {paginations}
        <li
          className="pagination-btn"
          onClick={() => {
            if (page === Math.ceil(totalHouse / 12)) return
            setPage((prev) => prev + 1)
          }}
        >
          <BsChevronRight />
        </li>
      </ul>
    </div>
  )
}
