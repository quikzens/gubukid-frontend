import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { provinces } from '../../../data/provinces'
import { cities } from '../../../data/cities'
import './FilterHomeForm.css'
// import check_icon from '../../assets/images/check.svg'

export default function FilterHome(props) {
  const { setFilter } = props

  const [choosedProvince, setChoosedProvince] = useState('')

  const formik = useFormik({
    initialValues: {
      type_rent: '',
      bedrooms: '',
      bathrooms: '',
      price: '',
      province: '',
      city: '',
      amenities: [],
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      setFilter(() => {
        return {
          ...values,
          amenities: values.amenities.join(','),
        }
      })
    },
  })

  return (
    <div className="page-home-filter">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group w-100">
          <label htmlFor="type_rent" className="filter__heading">
            Type of Rent
          </label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.type_rent}
              name="type_rent"
              className="form-select"
            >
              <option value="">All</option>
              <option value="day">Harian</option>
              <option value="month">Bulanan</option>
              <option value="year">Tahunan</option>
            </select>
          </div>
          <div className="form-error">
            {formik.errors.type_rent && formik.errors.type_rent}
          </div>
        </div>
        <div className="d-flex gap-1">
          <div className="form-group">
            <label htmlFor="bedrooms">Min Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              onChange={formik.handleChange}
              value={formik.values.bedrooms}
            />
            <div className="form-error">
              {formik.errors.bedrooms && formik.errors.bedrooms}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Min Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              onChange={formik.handleChange}
              value={formik.values.bathrooms}
            />
            <div className="form-error">
              {formik.errors.bathrooms && formik.errors.bathrooms}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price">Max Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <div className="form-error">
            {formik.errors.price && formik.errors.price}
          </div>
        </div>
        <div className="form-group w-100">
          <label htmlFor="province">Province</label>
          <div className="form-select">
            <select
              onChange={(e) => {
                formik.handleChange(e)
                setChoosedProvince(e.target.value)
              }}
              value={formik.values.province}
              name="province"
            >
              <option value=""></option>
              {Object.entries(provinces).map((province, index) => (
                <option value={province[0]} key={index}>
                  {province[1].name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-error">
            {formik.errors.province_id && formik.errors.province_id}
          </div>
        </div>
        <div className="form-group w-100">
          <label htmlFor="city">City</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.city}
              name="city"
            >
              <option value=""></option>
              {Object.entries(cities).map((city, index) => {
                return (
                  <React.Fragment key={index}>
                    {city[1].province_id == choosedProvince && (
                      <option value={city[0]} key={index}>
                        {city[1].name}
                      </option>
                    )}
                  </React.Fragment>
                )
              })}
            </select>
            <div className="form-error">
              {formik.errors.city_id && formik.errors.city_id}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="Furnished"
                name="amenities"
                value="Furnished"
                checked={formik.values.amenities.includes('Furnished')}
                onChange={formik.handleChange}
              />
              <label htmlFor="Furnished">Furnished</label>
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="Pet Allowed"
                name="amenities"
                value="Pet Allowed"
                checked={formik.values.amenities.includes('Pet Allowed')}
                onChange={formik.handleChange}
              />
              <label htmlFor="Pet Allowed">Pet Allowed</label>
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="Shared Accomodation"
                name="amenities"
                value="Shared Accomodation"
                checked={formik.values.amenities.includes(
                  'Shared Accomodation'
                )}
                onChange={formik.handleChange}
              />
              <label htmlFor="Shared Accomodation">Shared Accomodation</label>
            </div>
          </div>
        </div>
        <button type="submit" className="button home-filter-btn">
          Apply Filter
        </button>
      </form>
    </div>
  )
}

function FilterButton(props) {
  const { ruleType, ruleValue, updateFilter, filter, content } = props

  return (
    <button
      className={`filter__btn ${
        filter[ruleType] === ruleValue ? 'active' : ''
      }`}
      onClick={() => updateFilter(ruleType, ruleValue)}
    >
      {content}
    </button>
  )
}

function FilterAmenity(props) {
  const { filter, updateFilter, content } = props

  return (
    <div
      className={`filter__amenity ${
        filter.amenities.includes(content) ? 'active' : ''
      }`}
      onClick={(e) => {
        updateFilter('amenities', content)
      }}
    >
      <button>{content}</button>
      <div className="filter__amenity-icon">
        {/* <img src={check_icon} alt="" /> */}
      </div>
    </div>
  )
}

function FilterBudget(props) {
  const { updateFilter } = props

  const changeBudget = (e) => {
    const ruleValue = parseInt(e.target.value)
    updateFilter('budget', ruleValue)
  }

  return (
    <div className="filter__budget">
      <p>Less than IDR. </p>
      <input type="text" onChange={changeBudget} />
    </div>
  )
}
