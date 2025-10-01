'use client'
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ChatSection from "./components/ChatSection";

export default function Home() {
  return (
   <>
   <Navbar />
   <Header />
   <About />
   <Projects />
   <ChatSection />
   <Footer />
   </>
  );
}
