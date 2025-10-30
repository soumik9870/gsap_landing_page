import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import { ScrollTrigger } from 'gsap/all'
import { gsap } from 'gsap'
import Showcase from './components/Showcase'
import Performance from './components/Performance'
import Features from './components/Features'
import Highlights from './components/Highlights'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  )
}

export default App