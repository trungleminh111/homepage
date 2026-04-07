import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AboutSection from "./components/AboutSection"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import HighlightsSection from "./components/HighlightsSection"
import PartnersSection from "./components/PartnersSection"
import ScrollToTop from "./components/ScrollToTop"
import ContactSection from './components/ContactSection'
import PostDetail from "./pages/PostDetail"

const Home = () => (
  <>
    <HeroSection />
    <AboutSection />
    <HighlightsSection />
    <PartnersSection />
    <ContactSection />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tin-tuc/:slug" element={<PostDetail />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  )
}

export default App