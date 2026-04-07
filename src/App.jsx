
import './index.css'

import AboutSection from "./components/AboutSection"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import HighlightsSection from "./components/HighlightsSection"
import PartnersSection from "./components/PartnersSection"
import ScrollToTop from "./components/ScrollToTop"
import ContactSection from './components/ContactSection'



function App() {


  return (
    <>
      <Header/>
      <HeroSection/>
      <AboutSection/>
      <HighlightsSection/>
      <PartnersSection/>
      <ContactSection/>
      <ScrollToTop/>
      <Footer/>
    </>
  )
}

export default App
