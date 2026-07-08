import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Doctors from './pages/Doctors.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import Specialties from './pages/Specialties.jsx'
import Packages from './pages/Packages.jsx'
import IVF from './pages/IVF.jsx'
import IvfServiceDetail from './pages/IvfServiceDetail.jsx'
import Contact from './pages/Contact.jsx'
import { PatientLogin, PatientRegister, AdminLogin } from './pages/AuthPages.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-ink-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/book/:id" element={<BookAppointment />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/ivf" element={<IVF />} />
          <Route path="/ivf/:serviceId" element={<IvfServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
