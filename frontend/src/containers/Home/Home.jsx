import './Home.css';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { About, Projects, CV, Contact, Experience } from '../../components';
import profileImg from "../../assets/profile.png";
import enFlag from '../../assets/flags/en.svg';
import esFlag from '../../assets/flags/es.svg';
import enCV from '../../assets/cv/EN.pdf';
import esCV from '../../assets/cv/ES.pdf';

const cv = {
  en: enCV,
  es: esCV
}

const flags = {
  en: enFlag,
  es: esFlag,
}

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('about');
  const [headerVisible, setHeaderVisible] = useState(false);
  const contentRef = useRef(null);
  const navbarRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 992) {
      const navbar = document.getElementById('navbarNav');
      if (navbar && navbar.classList.contains('show')) {
        const toggleBtn = document.querySelector('[data-bs-target="#navbarNav"]');
        if (toggleBtn) {
          toggleBtn.click();
        }
      }
    }


    

  }, [activeSection]);


  const scrollToContent = () => {
    if (!contentRef.current) return;

    const navbarHeight = navbarRef.current?.offsetHeight || 56;

    const contentRect = contentRef.current.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + contentRect.top;

    const targetPosition = absoluteTop - navbarHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  const renderContent = () => {
    const sections = {
      about: <About />,
      experience: <Experience />,
      projects: <Projects />,
      cv: <CV />,
      contact: <Contact />
    };

    return sections[activeSection] || <div className="content-section"><h2>Select a section</h2></div>;
  };

  const handleDownload = () => {
    const pdfUrl = cv[language];
    const fileName = `SoteloPenedoSabrina_CV_${language.toUpperCase()}.pdf`;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="portfolio-container">
      {/*cabecera*/}
      <div
        ref={headerRef}
        className={`header-section pt-1 pb-3 w-100 container-1 ${headerVisible ? 'header-visible' : 'header-hidden'}`}
      >
        <div className="container mt-5 mb-4">
          <div className="row align-items-center">
            {/*columna izquierda: imagen*/}
            <div className="col-lg-4 col-md-12 text-center mb-4 mb-lg-0">
              <div className="profile">
                <img src={profileImg} alt="Profile Picture" className="profile-img" />
              </div>
            </div>

            {/*columna derecha*/}
            <div className="col-lg-8 col-md-12">
              <h2 className="h-animated">
                {t("i_helloText")} <span className="text-primary">Sabrina Sotelo Penedo</span>
              </h2>
              <h1 className="h-animated">{t("i_titleText")}</h1>
              <p className="lead mt-3 h-animated">
                {t("i_extraText")}
              </p>
              <div>

                <button onClick={handleDownload}
                  className="btn btn-primary btn-style-2 h-animated">
                  {t("i_download_cv")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*navbar*/}
      <nav className="navbar navbar-expand-lg sticky-top" ref={navbarRef}>
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('about');
                    setTimeout(scrollToContent, 100);
                  }}
                  data-bs-target="#navbarNav"
                >
                  {t("i_about")}
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('experience');
                    setTimeout(scrollToContent, 100);
                  }}
                  data-bs-target="#navbarNav"
                >
                  {t("i_experience")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('projects');
                    setTimeout(scrollToContent, 100);
                  }}
                  data-bs-target="#navbarNav"
                >
                  {t("i_projects")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'cv' ? 'active' : ''}`}
                  href="#cv"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('cv');
                    setTimeout(scrollToContent, 100);
                  }}
                  data-bs-target="#navbarNav"
                >
                  {t("i_viewcv")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('contact');
                    setTimeout(scrollToContent, 100);
                  }}
                  data-bs-target="#navbarNav"
                >
                  {t("i_contact")}
                </a>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  className="menu-link nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <img src={flags[language]} alt={language} width="20" className="me-1" />
                  {language ? language.toUpperCase() : "EN"}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => {
                      e.preventDefault();
                      setLanguage("en");
                      if (window.innerWidth < 992) {
                        const navbar = document.getElementById('navbarNav');
                        if (navbar && navbar.classList.contains('show')) {
                          const toggleBtn = document.querySelector('[data-bs-target="#navbarNav"]');
                          if (toggleBtn) {
                            toggleBtn.click();
                          }
                        }
                      }
                    }}>
                      <img src={flags.en} alt="en" width="20" className="me-2" />EN
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => {
                      e.preventDefault();
                      setLanguage("es");

                      //cerrar navbar en movil
                      if (window.innerWidth < 992) {
                        const navbar = document.getElementById('navbarNav');
                        if (navbar && navbar.classList.contains('show')) {
                          const toggleBtn = document.querySelector('[data-bs-target="#navbarNav"]');
                          if (toggleBtn) {
                            toggleBtn.click();
                          }
                        }
                      }
                    }}>
                      <img src={flags.es} alt="es" width="20" className="me-2" />ES
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*contenido (componentes)*/}
      <div ref={contentRef} className="content-container container py-5">
        {renderContent()}
      </div>
    </div >
  );
}