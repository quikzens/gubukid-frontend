import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Alert from './components/Alert/Alert'
import Navbar from './components/Navbar/Navbar'
import { AlertProvider } from './contexts/AlertContext'
import { UserProvider } from './contexts/UserContext'

import PrivatePage from './pages/PrivateRoute'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Booking from './pages/Booking/Booking'
import History from './pages/History/History'
import House from './pages/House/House'
import Transaction from './pages/Transaction/Transaction'
import HouseDetail from './pages/HouseDetail/HouseDetail'

export default function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <PrivatePage allowedRoles={['tenant', 'owner']}>
                  <Profile />
                </PrivatePage>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivatePage allowedRoles={['tenant']}>
                  <Booking />
                </PrivatePage>
              }
            />
            <Route
              path="/histories"
              element={
                <PrivatePage allowedRoles={['tenant', 'owner']}>
                  <History />
                </PrivatePage>
              }
            />
            <Route
              path="/houses"
              element={
                <PrivatePage allowedRoles={['owner']}>
                  <House />
                </PrivatePage>
              }
            />
            <Route
              path="/houses/:id"
              element={
                <PrivatePage allowedRoles={['tenant', 'owner']}>
                  <HouseDetail />
                </PrivatePage>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivatePage allowedRoles={['owner']}>
                  <Transaction />
                </PrivatePage>
              }
            />
          </Routes>
          <Alert />
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  )
}
