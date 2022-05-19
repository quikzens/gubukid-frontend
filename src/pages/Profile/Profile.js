import { useAlert } from '../../contexts/AlertContext'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import Modal from '../../components/Modal/Modal'
import UpdateAvatarBtn from './UpdateAvatarBtn/UpdateAvatarBtn'
import UpdatePasswordForm from './UpdatePasswordForm/UpdatePasswordForm'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import {
  BsLockFill,
  BsPersonCircle,
  BsGenderAmbiguous,
  BsGeoAltFill,
  BsTelephoneFill,
  BsFillHouseFill,
  BsEnvelopeFill,
} from 'react-icons/bs'
import './Profile.css'

export default function Profile() {
  const { invokeAlert } = useAlert()

  const [profile, setProfile] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [isUpdatePasswordActive, setUpdatePasswordActive] = useState(false)
  const [isEditProfileActive, setEditProfileActive] = useState(false)

  const fetchProfile = () => {
    fetchData('/user', setProfile, setLoading, invokeAlert)
  }

  useEffect(() => {
    fetchProfile()
    return () => {
      setProfile(null)
    }
  }, [])

  return (
    <div className="page-profile">
      <div className="profile-content">
        {isLoading ? (
          <div className="w-100 d-flex jc-center">
            <Loading size="medium" color="gray" />
          </div>
        ) : (
          <>
            <div className="profile-info">
              <div className="d-flex gap-1 ai-center">
                <h3>Profile</h3>
                <p
                  className="profile-edit-btn"
                  onClick={() => setEditProfileActive(true)}
                >
                  Edit
                </p>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsPersonCircle />
                </div>
                <div className="profile-text">
                  <h4>{profile.fullname}</h4>
                  <p>Full name</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsEnvelopeFill />
                </div>
                <div className="profile-text">
                  <h4>{profile.email}</h4>
                  <p>Email</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsLockFill />
                </div>
                <div className="profile-text">
                  <p
                    className="profile-text-btn"
                    onClick={() => setUpdatePasswordActive(true)}
                  >
                    Change Password
                  </p>
                  <p>Password</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsFillHouseFill />
                </div>
                <div className="profile-text">
                  <h4 style={{ textTransform: 'capitalize' }}>
                    {profile.role}
                  </h4>
                  <p>Role</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsGenderAmbiguous />
                </div>
                <div className="profile-text">
                  <h4 style={{ textTransform: 'capitalize' }}>
                    {profile.gender}
                  </h4>
                  <p>Gender</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsTelephoneFill />
                </div>
                <div className="profile-text">
                  <h4>{profile.phone_number}</h4>
                  <p>Phone Number</p>
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-icon">
                  <BsGeoAltFill />
                </div>
                <div className="profile-text">
                  <h4>{profile.address}</h4>
                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="profile-photo">
              <img
                src={
                  profile.avatar
                    ? profile.avatar
                    : 'https://res.cloudinary.com/quikzens/image/upload/v1652685905/avatar/default.png'
                }
                alt=""
              />
              <UpdateAvatarBtn setProfile={setProfile} />
            </div>
          </>
        )}
      </div>

      <Modal
        isActive={isUpdatePasswordActive}
        closeModal={() => setUpdatePasswordActive(false)}
        title={
          <>
            Change <br /> Password
          </>
        }
      >
        <UpdatePasswordForm closeModal={() => setUpdatePasswordActive(false)} />
      </Modal>

      {!isLoading && (
        <Modal
          isActive={isEditProfileActive}
          closeModal={() => setEditProfileActive(false)}
          title="Edit Profile"
        >
          <EditProfileForm
            closeModal={() => setEditProfileActive(false)}
            profile={profile}
            setProfile={setProfile}
          />
        </Modal>
      )}
    </div>
  )
}
