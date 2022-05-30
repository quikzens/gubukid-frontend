import React from 'react'
import { Link } from 'react-router-dom'
import { provinces } from '../../data/provinces'
import { cities } from '../../data/cities'
import './ListHouse.css'

export default function ListHouse(props) {
  const { houses } = props

  return (
    <div className="house-list">
      {!houses || houses.length === 0 ? (
        <p>Tidak ada Rumah</p>
      ) : (
        <>
          {houses.map((house) => (
            <Link
              to={`/houses/${house.id}`}
              key={house.id}
              className="house-item-link"
            >
              <div className="house-item">
                <div className="house-image">
                  <img src={house.featured_image} alt={house.title} />
                </div>
                <div className="house-amenities">
                  {house.amenities.length > 0 &&
                    house.amenities.split(',').map((amenity, index) => (
                      <div className="house-amenity" key={index}>
                        {amenity}
                      </div>
                    ))}
                </div>
                <h3 className="house-title">{house.title}</h3>
                <p className="house-price">
                  Rp.
                  {new Intl.NumberFormat(['ban', 'id']).format(house.price)}/
                  {house.type_rent}
                </p>
                <p className="house-property">
                  {house.bedrooms} Beds, {house.bathrooms} Baths, {house.area} m
                  <sup>2</sup>
                </p>
                <p className="house-address">
                  {cities[house.city_id].name.toLowerCase()},{' '}
                  {provinces[house.province_id].name.toLowerCase()}
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
