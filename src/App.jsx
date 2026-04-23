import './index.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'

import AboutSection from "./components/AboutSection"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import HighlightsSection from "./components/HighlightsSection"
import PartnersSection from "./components/PartnersSection"
import ScrollToTop from "./components/ScrollToTop"
import ContactSection from './components/ContactSection'
import PostDetail from "./pages/PostDetail"
import ProjectList from './components/ProjectList'
import ProjectDetail from './pages/ProductDetail'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'

const Home = () => (
  <>
    <HeroSection />
    <AboutSection />
    <HighlightsSection />
    <ProjectList />
    <PartnersSection />
    <ContactSection />
  </>
)

function App() {
  return (
    <HelmetProvider>
      {/* 🔥 QUAN TRỌNG: dùng HashRouter */}
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tin-tuc/:slug" element={<PostDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <ScrollToTop />
        <Footer />
      </HashRouter>
    </HelmetProvider>
  )
}

export default App