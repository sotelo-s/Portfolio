import "./Projects.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import projectsData from '../../assets/data/projects.json';

import gatewayImage from '../../assets/projects/gateway.png';
import portfolioImage from '../../assets/projects/portfolio.png';

const Projects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);

    const imageMap = {
    'gateway.png': gatewayImage,
    'portfolio.png': portfolioImage,
  };

  useEffect(() => {
    const processedProjects = projectsData.map(project => ({
      ...project,
      img: project.img ? imageMap[project.img] || null : null
    }));
    
    setProjects(processedProjects);
  }, []);

  const getLocalizedText = (item, key) => {
    if (!item || !item[key]) return '';
    
    if (typeof item[key] === 'object') {
      return item[key][language] || item[key]['en'] || '';
    }
    
    return item[key];
  };

  const getLocalizedCollaboration = (collab) => {
    if (!collab) return '';
    return collab[language] || collab['en'] || '';
  };

  return (
    <div className="content-section">
      <h2>{t("i_projects_title")}</h2>
      
      {projects.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">{t("i_no_projects", "No projects available yet.")}</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => {
            const name = getLocalizedText(project, 'name');
            const date = getLocalizedText(project, 'date');
            const description = getLocalizedText(project, 'description');
            const technologies = project.technologies || [];
            const github = project.github || '';
            const demo = project.demo || '';

            return (
              <div className="project-card" key={index}>
                {/*imagen proyecto*/}
                {project.img && (
                  <div className="project-image-container">
                    <img 
                      src={project.img} 
                      alt={name}
                      className="project-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/*cabecera*/}
                <div className="project-header">
                  <h4>{name}</h4>
                  {date && (
                    <span className="project-date">
                      {date}
                    </span>
                  )}
                </div>
                
                {/*colaboracion*/}
                {project.colaboration && project.colaboration.length > 0 && (
                  <div className="project-collaboration mt-2">
                    <div className="collaboration-label">
                      {t("i_collaboration", "Collaboration with")}:
                    </div>
                    <div className="collaboration-partners">
                      {project.colaboration.map((partner, idx) => {
                        const partnerName = getLocalizedCollaboration(partner);
                        return (
                          <div className="collaboration-partner" key={idx}>
                            {partner.img && (
                              <img 
                                src={partner.img} 
                                alt={partnerName}
                                className="collaboration-logo me-2"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            )}
                            <span>{partnerName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/*descripcion*/}
                <p className="project-description mt-3">
                  {description}
                </p>
                
                {/*tecnologias*/}
                {technologies.length > 0 && (
                  <div className="project-tech mt-3">
                    {technologies.map((tech, techIdx) => (
                      <span className="tech-tag" key={techIdx}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/*urls*/}
                <div className="project-links mt-3">
                  {github && (
                    <a 
                      href={github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary me-2"
                    >
                      {t("i_view_code", "View Code")}
                    </a>
                  )}
                  {demo && (
                    <a 
                      href={demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {t("i_live_demo", "Live Demo")}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Projects;