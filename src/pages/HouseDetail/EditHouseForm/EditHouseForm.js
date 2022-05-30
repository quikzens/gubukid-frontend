import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAlert } from '../../../contexts/AlertContext'
import { API, configForm } from '../../../config/api'
import { provinces } from '../../../data/provinces'
import { cities } from '../../../data/cities'
import { BsCheck } from 'react-icons/bs'
import Loading from '../../../components/Loading/Loading'

export default function EditHouseForm(props) {
  const { invokeAlert } = useAlert()
  const { closeModal, house, setHouse } = props
  const [status, setStatus] = useState('idle')
  const [choosedProvince, setChoosedProvince] = useState('11')
  const [imagePreview, setImagePreview] = useState(house.featured_image)

  const formik = useFormik({
    initialValues: {
      title: house.title,
      featured_image: [],
      bedrooms: house.bedrooms,
      bathrooms: house.bathrooms,
      type_rent: house.type_rent,
      price: house.price,
      province_id: house.province_id,
      city_id: house.city_id,
      description: house.description,
      amenities: house.amenities,
      area: house.area,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      title: Yup.string().required('Title harus diisi'),
      bedrooms: Yup.number()
        .required('Jumlah kamar harus diisi')
        .min(1, 'Jumlah kamar harus diisi'),
      bathrooms: Yup.number()
        .required('Jumlah kamar mandi harus diisi')
        .min(1, 'Jumlah kamar mandi harus diisi'),
      type_rent: Yup.string().required('Pilih type sewa'),
      price: Yup.number().required('Masukkan harga sewa'),
      description: Yup.string().required('Masukkan deskripsi'),
      area: Yup.number()
        .required('Masukkan luas rumah')
        .min(1, 'Masukkan luas rumah'),
      featured_image: Yup.array().max(
        1,
        'Jangan masukkan lebih dari satu gambar'
      ),
    }),
    onSubmit: async (values) => {
      console.log(values)
      setStatus('loading')

      const updatedHouse = new FormData()
      updatedHouse.append('title', values.title)
      if (values.featured_image.length > 0) {
        updatedHouse.append(
          'featured_image',
          values.featured_image[0],
          values.featured_image[0].name
        )
      }
      updatedHouse.append('bedrooms', values.bedrooms)
      updatedHouse.append('bathrooms', values.bathrooms)
      updatedHouse.append('type_rent', values.type_rent)
      updatedHouse.append('price', values.price)
      updatedHouse.append('province_id', values.province_id)
      updatedHouse.append('city_id', values.city_id)
      updatedHouse.append('description', values.description)
      updatedHouse.append('amenities', values.amenities.join(','))
      updatedHouse.append('area', values.area)

      try {
        const response = await API.patch(`/houses/${house.id}`, updatedHouse, {
          withCredentials: true,
          ...configForm,
        })

        setTimeout(() => {
          setStatus('idle')
          closeModal()
          setHouse((prev) => {
            return {
              ...prev,
              ...response.data.data,
            }
          })
          invokeAlert('success', 'Success Mengedit Rumah')
        }, 500)
      } catch (err) {
        invokeAlert('error', `Gagal Mengedit Rumah: ${err.response.data.error}`)
        setStatus('idle')
      }
    },
  })

  const handleChangeFile = (e) => {
    const files = e.target.files
    formik.setFieldValue('featured_image', Array.from(files))

    if (files && files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <form className="modal-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <div className="form-error">
          {formik.errors.title && formik.errors.title}
        </div>
      </div>
      <div className="form-group form-image">
        <label>Featured Image</label>
        <label className="button">
          <input
            type="file"
            name="featured_image"
            id="featured_image"
            accept="image/*"
            onChange={handleChangeFile}
            className="v-hidden"
          />
          <div className="button-content">Choose an image</div>
        </label>
        <img src={imagePreview} alt="" className="form-preview-image" />
        <div className="form-error">
          {formik.errors.featured_image && formik.errors.featured_image}
        </div>
      </div>
      <div className="d-flex gap-1">
        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
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
          <label htmlFor="bathrooms">Bathrooms</label>
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
      <div className="d-flex gap-1">
        <div className="form-group w-100">
          <label htmlFor="type_rent">Type Rent</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.type_rent}
              name="type_rent"
            >
              <option value="day">Harian</option>
              <option value="month">Bulanan</option>
              <option value="year">Tahunan</option>
            </select>
          </div>
          <div className="form-error">
            {formik.errors.type_rent && formik.errors.type_rent}
          </div>
        </div>
        <div className="form-group w-100">
          <label htmlFor="area">Area</label>
          <input
            type="number"
            name="area"
            id="area"
            onChange={formik.handleChange}
            value={formik.values.area}
          />
          <div className="form-error">
            {formik.errors.area && formik.errors.area}
          </div>
        </div>
      </div>
      <div className="d-flex gap-1">
        <div className="form-group w-100">
          <label htmlFor="province_id">Province</label>
          <div className="form-select">
            <select
              onChange={(e) => {
                formik.handleChange(e)
                setChoosedProvince(e.target.value)
              }}
              value={formik.values.province_id}
              name="province_id"
            >
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
          <label htmlFor="city_id">City</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.city_id}
              name="city_id"
            >
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
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
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
              checked={formik.values.amenities.includes('Shared Accomodation')}
              onChange={formik.handleChange}
            />
            <label htmlFor="Shared Accomodation">Shared Accomodation</label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="descriptiton"
          className="form-textarea"
          rows="5"
          onChange={formik.handleChange}
          value={formik.values.description}
        ></textarea>
        <div className="form-error">
          {formik.errors.description && formik.errors.description}
        </div>
      </div>
      <button
        className={`modal-submit button  ${
          status !== 'idle' ? 'disabled' : ''
        }`}
        type="submit"
      >
        <div className="button-content">{buttonContent[status]}</div>
      </button>
    </form>
  )
}

const buttonContent = {
  idle: 'Edit House',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
