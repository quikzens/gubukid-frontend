import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAlert } from '../../../contexts/AlertContext'
import { API, configForm } from '../../../config/api'
import { BsCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Loading from '../../../components/Loading/Loading'
import 'react-datepicker/dist/react-datepicker.css'

export default function BookHouseForm(props) {
  const { invokeAlert } = useAlert()
  const { closeModal, house } = props
  const [status, setStatus] = useState('idle')

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      house_id: house.id,
      check_in: new Date(),
      time_rent: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      check_in: Yup.date().required('Masukkan tanggal Check In'),
      time_rent: Yup.number().required('Berapa lama kamu mau menetap?'),
    }),
    onSubmit: async (values) => {
      console.log(values)
      setStatus('loading')

      const bookHouse = new FormData()
      bookHouse.append('house_id', values.house_id)
      bookHouse.append('check_in', values.check_in.toJSON())
      bookHouse.append('time_rent', values.time_rent)

      try {
        const response = await API.post(`/transactions`, bookHouse, {
          withCredentials: true,
          ...configForm,
        })

        setTimeout(() => {
          setStatus('idle')
          closeModal()
          invokeAlert('success', 'Success Mengajukan Sewa Rumah')
          navigate('/bookings', { replace: true })
        }, 500)
      } catch (err) {
        invokeAlert('error', `Gagal Mengajukan Sewa Rumah`)
        setStatus('idle')
      }
    },
  })

  return (
    <form className="modal-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="check_in">Check In</label>
        <DatePicker
          selected={formik.values.check_in}
          onChange={(date) => formik.setFieldValue('check_in', date)}
        />
        <div className="form-error">
          {formik.errors.check_in && formik.errors.check_in}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="time_rent">
          Berapa {typeRent[house.type_rent]} kamu ingin menyewa?
        </label>
        <input
          type="number"
          name="time_rent"
          id="time_rent"
          onChange={formik.handleChange}
          value={formik.values.time_rent}
        />
        <div className="form-error">
          {formik.errors.time_rent && formik.errors.time_rent}
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

const typeRent = {
  day: 'hari',
  month: 'bulan',
  year: 'tahun',
}

const buttonContent = {
  idle: 'Book House',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
