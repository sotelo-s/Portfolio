import "./Experience.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import experienceData from '../../assets/data/experience.json';

const Experience = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    setExperiences(experienceData);
  }, []);

  const getLocalizedText = (item, key) => {
    if (!item || !item[key]) return '';

    if (typeof item[key] === 'object') {
      return item[key][language] || item[key]['en'] || '';
    }

    return item[key];
  };


  return (
    <div className="content-section">
      <h2>{t("i_experience_title")}</h2>

      <div className="experience-timeline">
        {experiences.map((exp, index) => {
          const place = getLocalizedText(exp, 'place');
          const role = getLocalizedText(exp, 'role');
          const date = getLocalizedText(exp, 'date');
          const description = getLocalizedText(exp, 'description');
          const technologies = exp.technologies || [];

          return (
            <div className="experience-item" key={index}>
              <div className="experience-header">
                <div className="d-flex align-items-center">
                  {exp.place?.img && (
                    <img
                      src={exp.place.img}
                      alt={place}
                      className="company-logo me-3"
                      style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h4>{role}</h4>
                    <a href={exp.place.link}><div className="experience-company">{place}</div></a>
                  </div>
                </div>
                <span className="experience-date">{date}</span>
              </div>
              <p className="experience-description">
                {description}
              </p>
              <div className="experience-tech">
                {technologies.map((tech, techIndex) => (
                  <span className="tech-badge" key={techIndex}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;