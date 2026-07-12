import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import LearningLog from "./components/LearningLog";
import ChatSection from "./components/ChatSection";
import SideRail from "./components/SideRail";

export default function Home() {
  return (
   <>
   <Navbar />
   <SideRail />
   <Header />
   <About />
   <Skills />
   <Projects />
   <LearningLog />
   <ChatSection />
   <Footer />
   </>
  );
}
