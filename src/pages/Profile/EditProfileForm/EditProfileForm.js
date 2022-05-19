import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAlert } from '../../../contexts/AlertContext'
import { API, configForm } from '../../../config/api'
import Loading from '../../../components/Loading/Loading'
import { BsCheck } from 'react-icons/bs'

export default function EditProfileForm(props) {
  const { invokeAlert } = useAlert()
  const { closeModal, profile, setProfile } = props
  const [status, setStatus] = useState('idle')

  const formik = useFormik({
    initialValues: {
      fullname: profile.fullname,
      email: profile.email,
      gender: profile.gender,
      phone_number: profile.phone_number,
      address: profile.address,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      fullname: Yup.string().required('Fullname harus diisi'),
      email: Yup.string()
        .email('Masukkan email dengan format yang benar')
        .required('Email harus diisi'),
      gender: Yup.string().required('Pilih Gender'),
      phone_number: Yup.string().required('Nomor Telephone harus diisi'),
      address: Yup.string().required('Alamat harus diisi'),
    }),
    onSubmit: async (values) => {
      setStatus('loading')

      try {
        const response = await API.patch('/user', values, {
          withCredentials: true,
          ...configForm,
        })

        setTimeout(() => {
          setStatus('idle')
          closeModal()
          setProfile((prev) => {
            return {
              ...prev,
              ...values,
            }
          })
          invokeAlert('success', 'Success Edit Profile')
        }, 500)
      } catch (err) {
        invokeAlert('error', `Gagal Edit Profile: ${err.response.data.error}`)
        setStatus('idle')
      }
    },
  })

  return (
    <form className="modal-form" onSubmit={formik.handleSubmit}>
      <div className="d-flex gap-1">
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />
          <div className="form-error">
            {formik.errors.fullname && formik.errors.fullname}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="form-error">
            {formik.errors.email && formik.errors.email}
          </div>
        </div>
      </div>
      <div className="d-flex gap-1">
        <div className="form-group w-100">
          <label htmlFor="gender">Gender</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.gender}
              name="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-error">
            {formik.errors.gender && formik.errors.gender}
          </div>
        </div>
        <div className="form-group w-100">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
          />
          <div className="form-error">
            {formik.errors.phone_number && formik.errors.phone_number}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          name="address"
          id="address"
          className="w-100"
          rows={5}
          onChange={formik.handleChange}
          value={formik.values.address}
        ></textarea>
        <div className="form-error">
          {formik.errors.address && formik.errors.address}
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
  idle: 'Edit Profile',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
