import "./About.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import educationData from '../../assets/data/education.json';
import skillData from '../../assets/data/skills.json';
import lanData from '../../assets/data/languages.json';


import spanishFlag from '../../assets/flags/es.svg';
import englishFlag from '../../assets/flags/en.svg';
import galicianFlag from '../../assets/flags/gl.svg';
import germanFlag from '../../assets/flags/de.svg';

import profileImage from '../../assets/profile-2.jpg';

const About = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState(null);
  const [skills, setSkills] = useState(null);

  const flagImageMap = {
    'es': spanishFlag,
    'en': englishFlag,
    'gl': galicianFlag,
    'de': germanFlag
  };



  useEffect(() => {
    const languagesWithFlags = {};

    Object.keys(lanData).forEach(key => {
      languagesWithFlags[key] = {
        ...lanData[key],
        flag: flagImageMap[lanData[key].flagCode] || null
      };
    });
    setEducation(educationData);
    setLanguages(languagesWithFlags);
    setSkills(skillData);
  }, []);

  const getLocalizedText = (item, key) => {
    if (!item || !item[key]) return '';

    if (typeof item[key] === 'object') {
      return item[key][language] || item[key]['en'] || '';
    }

    return item[key];
  };



  const getProficiencyPercentage = (level) => {
    const levels = {
      'native': 100,
      'c1': 85,
      'a1': 25
    };

    if (level.includes('Native') || level.includes('Nativo')) return 100;
    if (level.startsWith('C2')) return 100;
    if (level.startsWith('C')) return 85;
    if (level.startsWith('B')) return 50;
    if (level.startsWith('A')) return 25;
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
                      <a href={edu.place.link}> <div className="education-place text-primary">{place}</div> </a>
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
          {languages ? Object.values(languages).map((lang, index) => {
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
          }) : <></>}
        </div>
      </div>

      {/*skills*/}
      <div className="skills-container mt-5">
        <h4>{t("i_skills_title")}</h4>
        <div className="skills-categories">
          {/*data science*/}
          <div className="category">
            <h5>{skills ? skills.dataScience.title[language] || skills.dataScience.title.en : ""}</h5>
            <ul>
              {skills ? skills.dataScience.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) : <></>}
            </ul>
          </div>

          {/*fullstack*/}
          <div className="category">
            <h5>{skills ? skills.fullStack.title[language] || skills.fullStack.title.en : ""}</h5>
            <ul>
              {skills ? skills.fullStack.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) : <></>}
            </ul>
          </div>

          {/*lenguajes programacion*/}
          <div className="category">
            <h5>{skills ? skills.programmingLanguages.title[language] || skills.programmingLanguages.title.en : ""}</h5>
            <ul>
              {skills ? skills.programmingLanguages.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) : <></>}
            </ul>
          </div>

          {/*herramientas desarrollo*/}
          <div className="category">
            <h5>{skills ? skills.tools.title[language] || skills.tools.title.en : ""}</h5>
            <ul>
              {skills ? skills.tools.items.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;