import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/Header.js';
import FreeSevenDay from './components/FreeSevenDay.js';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <Header />
         <div className="pt-20">
            <Routes>
               <Route path="/" element={<App />} />
               <Route path="/free-seven-day" element={<FreeSevenDay />} />
            </Routes>
         </div>
      </BrowserRouter>
   </StrictMode>
);
