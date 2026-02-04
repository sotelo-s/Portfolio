import "./About.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import educationData from '../../assets/data/education.json';


import spanishFlag from '../../assets/flags/es.svg';
import englishFlag from '../../assets/flags/en.svg';
import galicianFlag from '../../assets/flags/gl.svg';
import germanFlag from '../../assets/flags/de.svg';

import profileImage from '../../assets/profile-2.jpg';

const About = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [education, setEducation] = useState([]);

  useEffect(() => {
    setEducation(educationData);
  }, []);

  const getLocalizedText = (item, key) => {
    if (!item || !item[key]) return '';
    
    if (typeof item[key] === 'object') {
      return item[key][language] || item[key]['en'] || '';
    }
    
    return item[key];
  };

  const skills = {
    dataScience: {
      title: {
        en: "Data Science & Analysis",
        es: "Ciencia de Datos & Análisis"
      },
      items: [
        "Python: Web Scraping (Beautiful Soup, Scrapy)",
        "Python: Pandas, NumPy",
        "Python: Visualization (Matplotlib)",
        "R: Stadistical Analysis",
        "R: Visualization (ggplot2)",
        "Jupyter Notebook",
        "Tableau",
        "Power BI"
      ]
    },
    fullStack: {
      title: {
        en: "Full Stack Development",
        es: "Desarrollo Full Stack"
      },
      items: [
        "Frontend: React",
        "Frontend: JavaScript (ES6+)",
        "Frontend: HTML5, CSS3, Bootstrap 5",
        "Backend: Node.js, Express.js",
        "Databases: MongoDB, Mongoose",
        "Databases: PostgreSQL",
        "APIs: RESTful APIs"
      ]
    },
    programmingLanguages: {
      title: {
        en: "Programming Languages",
        es: "Lenguajes de Programación"
      },
      items: [
        "Python",
        "JavaScript (ES6+)",
        "Java",
        "C",
        "C++",
        "R"
      ]
    },
    tools: {
      title: {
        en: "Development Tools",
        es: "Herramientas de Desarrollo"
      },
      items: [
        "Git",
        "npm",
        "Visual Studio Code",
        "Postman",
        "Docker"
      ]
    }
  };

  const languages = {
    spanish: {
      name: {
        en: "Spanish",
        es: "Español"
      },
      level: {
        en: "Native",
        es: "Nativo"
      },
      levelClass: "level-native",
      flag: spanishFlag,
      countryCode: "es"
    },
    galician: {
      name: {
        en: "Galician",
        es: "Gallego"
      },
      level: {
        en: "Native",
        es: "Nativo"
      },
      levelClass: "level-native",
      flag: galicianFlag,
      countryCode: "gal"
    },
    english: {
      name: {
        en: "English",
        es: "Inglés"
      },
      level: {
        en: "C1 (Advanced)",
        es: "C1 (Avanzado)"
      },
      levelClass: "level-c1",
      flag: englishFlag,
      countryCode: "gb"
    },
    german: {
      name: {
        en: "German",
        es: "Alemán"
      },
      level: {
        en: "A1 (Beginner)",
        es: "A1 (Principiante)"
      },
      levelClass: "level-a1",
      flag: germanFlag,
      countryCode: "de"
    }
  };

  const getProficiencyPercentage = (level) => {
    const levels = {
      'native': 100,
      'c1': 85,
      'a1': 25
    };
    
    if (level.includes('Native') || level.includes('Nativo')) return 100;
    if (level.includes('C1')) return 85;
    if (level.includes('A1')) return 25;
    return 0;
  };

  return (
    <div className="content-section">
      <div className="about-header-section mb-5">
        <div className="row align-items-start">
          <h2>{t("i_about_title")}</h2>
          {/*columna izquierda: imagen*/}
          <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
            <div className="about-image-container text-center text-md-start">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="about-profile-img"
              />
            </div>
          </div>
          
          {/*columna derecha: texto about me*/}
          <div className="col-lg-8 col-md-7">
            
            <p>{t("i_about_text_1")}</p>
            <p>{t("i_about_text_2")}</p>
          </div>
        </div>
      </div>

      {/*educacion*/}
      <div className="education-container mt-5">
        <h4>{t("i_education_title", "Education")}</h4>
        <div className="education-timeline">
          {education.map((edu, index) => {
            const place = getLocalizedText(edu, 'place');
            const title = getLocalizedText(edu, 'title');
            const dates = getLocalizedText(edu, 'dates');
            const description = getLocalizedText(edu, 'description');
            const gpa = edu.gpa;

            return (
              <div className="education-item" key={index}>
                <div className="education-header">
                  <div className="d-flex align-items-start">
                    {edu.place?.img && (
                      <img 
                        src={edu.place.img} 
                        alt={place}
                        className="institution-logo me-3"
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{title}</h5>
                      <div className="education-place text-primary">{place}</div>
                    </div>
                  </div>
                  <div className="education-info text-end">
                    <div className="education-dates">{dates}</div>
                    {gpa && (
                      <div className="education-gpa">
                        GPA: <span className="text-primary">{gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="education-description mt-2 mb-0">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/*idiomas*/}
      <div className="languages-container mt-5">
        <h4>{t("i_languages_title", "Languages")}</h4>
        <div className="languages-grid">
          {Object.values(languages).map((lang, index) => {
            const langName = lang.name[language] || lang.name.en;
            const langLevel = lang.level[language] || lang.level.en;
            const proficiency = getProficiencyPercentage(langLevel);
            
            return (
              <div className="language-item" key={index}>
                <div className="language-header">
                  <div className="d-flex align-items-center">
                      <img 
                        src={lang.flag} 
                        alt={`${langName} flag`}
                        className="language-flag me-3"
                      />
                    <div className="language-name">{langName}</div>
                  </div>
                  <div className={`language-level ${lang.levelClass}`}>
                    {langLevel}
                  </div>
                </div>
                <div className="proficiency-bar">
                  <div 
                    className="proficiency-fill" 
                    style={{ width: `${proficiency}%` }}
                    data-proficiency={proficiency + '%'}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*skills*/}
      <div className="skills-container mt-5">
        <h4>{t("i_skills_title")}</h4>
        <div className="skills-categories">
          {/*data science*/}
          <div className="category">
            <h5>{skills.dataScience.title[language] || skills.dataScience.title.en}</h5>
            <ul>
              {skills.dataScience.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/*fullstack*/}
          <div className="category">
            <h5>{skills.fullStack.title[language] || skills.fullStack.title.en}</h5>
            <ul>
              {skills.fullStack.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/*lenguajes programacion*/}
          <div className="category">
            <h5>{skills.programmingLanguages.title[language] || skills.programmingLanguages.title.en}</h5>
            <ul>
              {skills.programmingLanguages.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/*herramientas desarrollo*/}
          <div className="category">
            <h5>{skills.tools.title[language] || skills.tools.title.en}</h5>
            <ul>
              {skills.tools.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;