import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAlert } from '../../../contexts/AlertContext'
import { useUser } from '../../../contexts/UserContext'
import { capitalize } from '../../../utils/formatting'

export default function Register(props) {
  const { invokeAlert } = useAlert()
  const { register } = useUser()

  const { closeModal } = props

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
      role: '',
      gender: '',
      phone_number: '',
      address: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      fullname: Yup.string().required('Fullname harus diisi'),
      username: Yup.string()
        .required('Username harus diisi')
        .min(3, 'Username minimal 3 karakter'),
      email: Yup.string()
        .email('Masukkan email dengan format yang benar')
        .required('Email harus diisi'),
      password: Yup.string()
        .required('Password harus diisi')
        .min(8, 'Password minimal 8 karakter'),
      role: Yup.string().required('Pilih Role'),
      gender: Yup.string().required('Pilih Gender'),
      phone_number: Yup.string().required('Nomor Telephone harus diisi'),
      address: Yup.string().required('Alamat harus diisi'),
    }),
    onSubmit: async (values) => {
      const response = await register(values)
      if (response.isError) {
        return invokeAlert(
          'error',
          `Error Register: ${capitalize(response.message)}`
        )
      }

      invokeAlert('success', 'Berhasil Register')
      formik.handleReset()
      closeModal()
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <div className="form-error">
            {formik.errors.username && formik.errors.username}
          </div>
        </div>
      </div>
      <div className="d-flex gap-1">
        <div className="form-group w-100">
          <label htmlFor="role">Pilih Role</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.role}
              name="role"
              className="form-select"
            >
              <option value=""></option>
              <option value="tenant">Penyewa</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <div className="form-error">
            {formik.errors.role && formik.errors.role}
          </div>
        </div>
        <div className="form-group w-100">
          <label htmlFor="gender">Gender</label>
          <div className="form-select">
            <select
              onChange={formik.handleChange}
              value={formik.values.gender}
              name="gender"
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-error">
            {formik.errors.gender && formik.errors.gender}
          </div>
        </div>
      </div>
      <div className="d-flex gap-1">
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
        <div className="form-group">
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="form-error">
          {formik.errors.password && formik.errors.password}
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
      <button className="modal-submit" type="submit">
        Register
      </button>
    </form>
  )
}
