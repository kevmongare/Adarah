import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChatModal from "./components/ChatModal";
import AboutAdarah from "./components/AboutAdarah";
import ContactAdarah from "./components/ContactAdarah";
import Footer from "./components/Footer";
// import FloatingChatButton from "./components/FloatingChatButton";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Add padding-top because Navbar is fixed */}
      <main className="pt-28">

        <Hero onOpenChat={() => setOpen(true)} />

        <AboutAdarah />

        <ContactAdarah />

        <Footer />

      </main>

      {/* Chat Modal */}
      <ChatModal isOpen={open} onClose={() => setOpen(false)} />

      {/* Floating Chat Button now opens modal */}
      {/* <FloatingChatButton onClick={() => setOpen(true)} /> */}
    </>
  );
}

export default App;
