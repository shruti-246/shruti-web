import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Journey from "./components/journey/Journey";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Research from "./components/research/Research";
import Teaching from "./components/teaching/Teaching";
import Achievements from "./components/achievements/Achievements";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Research />
        <Teaching />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;