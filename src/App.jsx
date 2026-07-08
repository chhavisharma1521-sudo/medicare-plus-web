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
import VideoConsult from './pages/VideoConsult.jsx'

const TITLES = {
  '/': 'ShiKhar Hospital — Multi-Speciality Healthcare',
  '/about': 'About Us — ShiKhar Hospital',
  '/services': 'Our Services — ShiKhar Hospital',
  '/doctors': 'Find a Doctor — ShiKhar Hospital',
  '/book': 'Book Appointment — ShiKhar Hospital',
  '/ivf': 'IVF & Fertility — ShiKhar Hospital',
  '/contact': 'Contact Us — ShiKhar Hospital',
  '/patient-login': 'Patient Login — ShiKhar Hospital',
  '/patient-dashboard': 'My Dashboard — ShiKhar Hospital',
  '/admin-dashboard': 'Admin — ShiKhar Hospital',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = TITLES[pathname] || 'ShiKhar Hospital — Multi-Speciality Healthcare'
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="container-px grid place-items-center py-28 text-center dark:text-slate-100">
      <div className="text-7xl font-extrabold text-brand-600">404</div>
      <h1 className="mt-4 text-2xl font-extrabold text-ink-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist or has moved.</p>
      <a href="/" className="btn-primary mt-6">← Back to Home</a>
    </div>
  )
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
          <Route path="/consult" element={<VideoConsult />} />
          <Route path="/consult/:room" element={<VideoConsult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
