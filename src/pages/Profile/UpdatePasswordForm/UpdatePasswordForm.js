import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { API, configForm } from '../../../config/api'
import { useAlert } from '../../../contexts/AlertContext'
import { useUser } from '../../../contexts/UserContext'
import Loading from '../../../components/Loading/Loading'
import { BsCheck } from 'react-icons/bs'

export default function UpdatePasswordForm(props) {
  const { invokeAlert } = useAlert()
  const { invokeAuth } = useUser()
  const { closeModal } = props
  const [status, setStatus] = useState('idle')

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      password: Yup.string().required('Password harus diisi'),
      new_password: Yup.string()
        .required('New Password harus diisi')
        .min(8, 'Password minimal 8 karakter'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await API.patch('/user/password', values, {
          withCredentials: true,
          ...configForm,
        })

        closeModal()
        formik.handleReset()
        invokeAlert(
          'success',
          'Berhasil Mengganti Password, silahkan login ulang'
        )
        invokeAuth()
      } catch (err) {
        invokeAlert('error', `Error Change Password`)
      }
    },
  })

  return (
    <form className="modal-form" onSubmit={formik.handleSubmit}>
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
        <label htmlFor="new_password">New Password</label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          onChange={formik.handleChange}
          value={formik.values.new_password}
        />
        <div className="form-error">
          {formik.errors.new_password && formik.errors.new_password}
        </div>
      </div>
      <button className="modal-submit button" type="submit">
        Change Password
      </button>
    </form>
  )
}

const buttonContent = {
  idle: 'Change Password',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
