import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAlert } from '../../../contexts/AlertContext'
import { useUser } from '../../../contexts/UserContext'
import { capitalize } from '../../../utils/formatting'

export default function LoginForm(props) {
  const { invokeAlert } = useAlert()
  const { login } = useUser()

  const { closeModal } = props

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string().required('Username harus diisi'),
      password: Yup.string().required('Password harus diisi'),
    }),
    onSubmit: async (values) => {
      const response = await login(values)
      if (response.isError) {
        return invokeAlert(
          'error',
          `Error Login: ${capitalize(response.message)}`
        )
      }

      invokeAlert('success', 'Berhasil Login')
      formik.handleReset()
      closeModal()
    },
  })

  return (
    <form className="modal-form" onSubmit={formik.handleSubmit}>
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
      <button className="modal-submit" type="submit">
        Login
      </button>
    </form>
  )
}
