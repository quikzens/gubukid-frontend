import { useState } from 'react'
import { useAlert } from '../../../contexts/AlertContext'
import { useUser } from '../../../contexts/UserContext'
import { API, configForm } from '../../../config/api'
import Loading from '../../../components/Loading/Loading'
import { BsCheck } from 'react-icons/bs'

export default function UpdateAvatarBtn(props) {
  const { setLoggedInUser } = useUser()
  const { invokeAlert } = useAlert()
  const [status, setStatus] = useState('idle')

  const { setProfile } = props

  const handleUpdateAvatar = async (e) => {
    setStatus('loading')

    const { files } = e.target

    const data = new FormData()
    data.append('avatar', files[0], files[0].name)

    try {
      const response = await API.patch(`/user/avatar`, data, {
        withCredentials: true,
        ...configForm,
      })
      const newAvatar = response.data.data.new_image
      setLoggedInUser((prev) => {
        return {
          ...prev,
          user_avatar: newAvatar,
        }
      })
      setProfile((prev) => {
        return {
          ...prev,
          avatar: newAvatar,
        }
      })
      invokeAlert('success', 'Success mengganti avatar')

      setStatus('success')
      setTimeout(() => setStatus('idle'), 750)
    } catch (err) {
      invokeAlert('error', 'Gagal mengganti avatar')
      setStatus('idle')
    }
  }

  return (
    <label className={`button ${status !== 'idle' ? 'disabled' : ''}`}>
      <input
        type="file"
        name="avatar"
        id="avatar"
        accept="image/*"
        onChange={handleUpdateAvatar}
        className="v-hidden"
        disabled={status !== 'idle'}
        required
      />
      <div className="button-content">{buttonContent[status]}</div>
    </label>
  )
}

const buttonContent = {
  idle: 'Change Avatar',
  loading: <Loading size="small" color="white" />,
  success: <BsCheck size={20} />,
}
