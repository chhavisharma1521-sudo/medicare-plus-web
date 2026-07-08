# MediCare Plus — Hospital Website (React + Tailwind)

A modern, premium multi-speciality hospital website inspired by the *interface flow & features* of
Kailash Healthcare (not its design). Built with **React.js + Vite + Tailwind CSS**, fully responsive
for mobile / tablet / desktop, with a clean reusable-component structure.

## ✨ Features
- **Home** — hero, quick actions, specialities, top-rated doctors, home-care services, stats, CTA
- **Find a Doctor** — premium doctor cards with **search + specialty/hospital filters + sorting + availability**
- **Doctor Profile** — photo, credentials, experience, ratings, fee, languages, booking sidebar
- **Book Appointment** — date + time-slot picker, patient form, confirmation screen
- **Specialities**, **Health Packages**, **Contact / Callback** pages
- Reusable components: `Navbar`, `Footer`, `DoctorCard`, `StarRating`, `SectionHeading`

## 🎨 Unique design
Custom palette (deep teal `brand` + warm amber `accent`), Poppins + Inter fonts, rounded corners,
soft shadows, hover animations — completely original, not copied from the reference.

## 🚀 Run locally
You need **Node.js 18+** installed (https://nodejs.org).

```bash
cd hospital-web
npm install
npm run dev        # open the printed http://localhost:5173
```

Build for production:
```bash
npm run build
npm run preview
```

## 📁 Structure
```
hospital-web/
├─ index.html
├─ tailwind.config.js
├─ src/
│  ├─ main.jsx / App.jsx        # router + layout
│  ├─ index.css                 # Tailwind + component classes
│  ├─ components/               # Navbar, Footer, DoctorCard, StarRating, SectionHeading
│  ├─ pages/                    # Home, Doctors, DoctorProfile, BookAppointment, Specialties, Packages, Contact
│  └─ data/                     # doctors.js, specialties.js (swap with real API later)
```

## 🔌 Next steps
- Connect doctor data to a real API/backend
- Wire the appointment form to your existing FastAPI booking endpoint
- Add real doctor photos and hospital info
