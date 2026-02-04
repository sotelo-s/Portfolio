import './App.css';
import { useTranslation, initReactI18next } from 'react-i18next';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { Home } from './containers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

function AppContent() {
  const { language, setLanguage } = useLanguage();
  const { t, i18n, ready } = useTranslation();

  if (!ready) return <div>Loading translations...</div>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;700&display=swap" rel="stylesheet"></link>

      <div className="min-vh-100 d-flex flex-column ">
        <div className="main-body flex-grow-1 ">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  );
}