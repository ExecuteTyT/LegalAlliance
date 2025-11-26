import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Problems } from './sections/Problems';
import { Solution } from './sections/Solution';
import { Process } from './sections/Process';
import { Advantages } from './sections/Advantages';
import { Cases } from './sections/Cases';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { ExitIntentModal } from './components/ExitIntentModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Phone } from 'lucide-react';

function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openModal = () => setIsConsultationModalOpen(true);
  const closeModal = () => setIsConsultationModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header onOpenModal={openModal} />
      <main className="flex-grow">
        <Hero onOpenModal={openModal} />
        <Problems />
        <Solution />
        <Process />
        <Cases />
        <Advantages />
        <Pricing onOpenModal={openModal} />
        <FAQ />
      </main>
      <Footer onOpenModal={openModal} />
      
      <ExitIntentModal />
      <ConsultationModal isOpen={isConsultationModalOpen} onClose={closeModal} />

      {/* Sticky Phone Button Mobile */}
      <a 
        href="tel:+74951234567"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-success text-white rounded-full flex items-center justify-center shadow-2xl z-40 animate-pulse-slow hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}

export default App;