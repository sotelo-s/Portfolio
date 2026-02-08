import "./Projects.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import projectsData from '../../assets/data/projects.json';
import { getProjectImage } from '../../utils/imageImporter';

const Projects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log('Available projects data:', projectsData); //Debug
    
    const processedProjects = projectsData.map(project => {
      console.log('Processing project:', project.name[language]); //Debug
      
      let imgSrc = null;
      if (project.img) {
        console.log('Project image path:', project.img); //debug
        imgSrc = getProjectImage(project.img);
        console.log('Image source resolved to:', imgSrc); //Debug
      }

      return {
        ...project,
        img: imgSrc
      };
    });

    console.log('Processed projects:', processedProjects); //Debug
    setProjects(processedProjects);
  }, [language]);

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


  const handleProjectClick = (project) => {
    const projectName = getLocalizedText(project, 'name');
    const slug = project.slug;
    navigate(`/projects/${slug}`);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
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
            const achievements = getLocalizedText(project,'achievements')
            const technologies = project.technologies || [];
            const github = project.github || '';
            const demo = project.demo || '';

            return (
              <div 
                className="project-card" 
                key={index}
                onClick={() => handleProjectClick(project)}
                style={{ cursor: 'pointer' }}
              >
                {/*imagen del proyecto*/}
                {project.img && (
                  <div className="project-image-container">
                    <img
                      src={project.img}
                      alt={name}
                      className="project-image"
                      onError={(e) => {
                        console.error('Image failed to load:', project.img);
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'rgba(121, 235, 255, 0.1)';
                      }}
                      loading="lazy"
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

                {/*logros*/}
                {project.achievements && (
                  <p className="project-achievements mt-3">
                   ★ {achievements}
                </p>
                )}

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
                                loading="lazy"
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
                {/*technologies.length > 0 && (
                  <div className="project-tech mt-3">
                    {technologies.map((tech, techIdx) => (
                      <span className="tech-tag" key={techIdx}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )*/}

                {/*links*/}
                <div className="project-links mt-3" onClick={handleLinkClick}>
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary me-2"
                      onClick={handleLinkClick}
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
                      onClick={handleLinkClick}
                    >
                      {t("i_live_demo", "Live Demo")}
                    </a>
                  )}
                </div>

                {/*ver detalles*/}
                <div className="project-view-details mt-3" onClick={handleLinkClick}>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    {t("i_view_details", "View Details")} →
                  </button>
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