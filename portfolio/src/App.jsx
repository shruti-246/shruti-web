import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Journey from "./components/journey/Journey";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import RecommendationForm from "./components/recommendations/RecommendationForm";
import Recommendations from "./components/recommendations/Recommendations";

function App() {
  if (window.location.pathname === "/recommend") {
    return (
      <div className="min-h-screen text-[var(--text-main)]">
        <RecommendationForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text-main)]">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        {/* <Recommendations /> */}
      </main>

      <Footer />
    </div>
  );
}

export default App;