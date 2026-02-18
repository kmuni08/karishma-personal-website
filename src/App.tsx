'use client';
import './App.css'
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { About } from './components/About/About'
import { WorkExperience } from './components/WorkExperience/WorkExperience';
import { VolunteerExperience } from './components/VolunteerExperience/VolunteerExperience';
import { PawPrints } from "./components/PawPrints/PawPrint";
import { ConversationWithKarishma } from './components/ConversationWithKarishma/ConversationWithKarishma';
import { Contact } from "./components/Contact/Contact";

function App() {

  return (
    <>
      <div className="app-container">
      <WelcomePage />
      <PawPrints >
        <About />
        <WorkExperience />
        <VolunteerExperience />
        <ConversationWithKarishma />
        <Contact />
      </PawPrints>
      </div>
    </>
  )
   
  
}

export default App