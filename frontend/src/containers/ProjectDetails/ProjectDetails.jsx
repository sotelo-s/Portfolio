import "./ProjectDetails.css";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import projectsData from '../../assets/data/projects.json';
import { getProjectImage } from '../../utils/imageImporter';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import enFlag from '../../assets/flags/en.svg';
import esFlag from '../../assets/flags/es.svg';

const flags = {
    en: enFlag,
    es: esFlag,
};

const ProjectDetails = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    useEffect(() => {
        const foundProject = projectsData.find(p => {
            if (p.slug) {
                return p.slug === projectName;
            }

            const name = p.name[language] || p.name.en || '';
            const urlFriendlyName = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            return urlFriendlyName === projectName;
        });

        if (foundProject) {
            //extrae todas las imagenes
            const extractImagesFromContent = (content) => {
                const images = [];
                if (Array.isArray(content)) {
                    content.forEach(item => {
                        if (typeof item === 'object' && item.type === 'image') {
                            const imgSrc = getProjectImage(item.src);
                            if (imgSrc) {
                                images.push({
                                    src: imgSrc,
                                    alt: item.alt || '',
                                    caption: item.caption || ''
                                });
                            }
                        }
                    });
                }
                return images;
            };

            const localizedContent = foundProject['expanded-description']?.[language] ||
                foundProject['expanded-description']?.en;
            const images = extractImagesFromContent(localizedContent);
            setGalleryImages(images);
        }

        setProject(foundProject);
        setLoading(false);
        window.scrollTo(0, 0);
    }, [projectName, language]);

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

    const openImageGallery = (imageIndex) => {
        setGalleryStartIndex(imageIndex);
        setIsGalleryOpen(true);
    };

    const renderExpandedContent = (content) => {
        if (!content) return null;

        if (typeof content === 'string') {
            return content?.split('\n\n')?.map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                    {paragraph}
                </p>
            ));
        }


        if (Array.isArray(content)) {
            let imageIndex = 0;

            return content?.map((item, idx) => {
                if (typeof item === 'string') {
                    return (
                        <p key={idx} className="mb-4 text-content">
                            {item}
                        </p>
                    );
                } else if (typeof item === 'object') {
                    switch (item.type) {
                        case 'image':
                            const currentImageIndex = imageIndex;
                            imageIndex++;
                            const imageSrc = getProjectImage(item.src);

                            if (!imageSrc) {
                                return (
                                    <div key={idx} className="content-image-container my-4">
                                        <div className="image-placeholder bg-light p-5 text-center rounded">
                                            <p className="text-muted">Image not found: {item.src}</p>
                                        </div>
                                        {item.caption && (
                                            <p className="text-muted text-center mt-2 small">
                                                {item.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <div key={idx} className="content-image-container my-4">
                                    <div className="image-wrapper position-relative">
                                        <img
                                            src={imageSrc}
                                            alt={item.alt || ''}
                                            className="img-fluid rounded shadow-sm content-image"
                                            onClick={() => openImageGallery(currentImageIndex)}
                                        />
                                        {/*<button
                                            className="expand-btn btn btn-sm btn-light"
                                            onClick={() => openImageGallery(currentImageIndex)}
                                            title="Expand image"
                                        >
                                            <i className="fas fa-expand-alt"></i>
                                        </button>*/}
                                    </div>
                                    {item.caption && (
                                        <p className="text-muted text-center mt-2 small">
                                            {item.caption}
                                        </p>
                                    )}
                                </div>
                            );

                        case 'link':
                            const iconClass = {
                                'github': 'fab fa-github',
                                'external': 'fas fa-external-link-alt',
                                'globe': 'fas fa-globe',
                                'code': 'fas fa-code'
                            }[item.icon] || 'fas fa-link';

                            return (
                                <div key={idx} className="content-link-container my-3">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`btn ${item.variant || 'btn-outline-secondary'} d-inline-flex align-items-center`}
                                    >
                                        <i className={`${iconClass} me-2`}></i>
                                        {item.text}
                                    </a>
                                </div>
                            );

                        case 'code':
                            return (
                                <div key={idx} className="content-code-container my-4">
                                    <div className="code-header d-flex justify-content-between align-items-center bg-dark text-light p-2 rounded-top">
                                        <span className="small">{item.language || 'code'}</span>
                                        <button
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => navigator.clipboard.writeText(item.code)}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <pre className="bg-dark text-light p-3 rounded-bottom mb-0">
                                        <code>{item.code}</code>
                                    </pre>
                                </div>
                            );

                        case 'quote':
                            return (
                                <div key={idx} className="content-quote-container my-4 p-4 bg-light rounded border-start border-4 border-primary">
                                    <blockquote className="mb-0">
                                        <p className="fst-italic">{item.text}</p>
                                        {item.author && (
                                            <footer className="blockquote-footer mt-2">
                                                {item.author}
                                            </footer>
                                        )}
                                    </blockquote>
                                </div>
                            );

                        case 'list':
                            return (
                                <div key={idx} className="content-list-container my-3">
                                    {item.title && <h5 className="mb-3">{item.title}</h5>}
                                    <ul className="list-group list-group-flush">
                                        {item?.items?.map((listItem, listIdx) => (
                                            <li key={listIdx} className="list-group-item border-0 px-0 py-2">
                                                {listItem}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );

                        case 'divider':
                            return <hr key={idx} className="my-4" />;

                        default:
                            return null;
                    }
                }
                return null;
            });
        }

        return null;
    };

    const getProjectFeatures = () => {
        if (!project?.features) return [];

        if (typeof project.features === 'object' && !Array.isArray(project.features)) {
            return project.features[language] || project.features.en || [];
        }

        return project.features || [];
    };

    if (loading) {
        return (
            <div className="project-details-loading content-section text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">{t("i_loading_project", "Loading project details...")}</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-details content-section">
                <div className="project-not-found text-center py-5">
                    <h3>{t("i_project_not_found", "Project not found")}</h3>
                    <p className="text-muted mb-4">
                        {t("i_project_not_found_desc", "The project you're looking for doesn't exist or has been moved.")}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-arrow-left me-2"></i>
                        {t("i_back_to_projects", "Go back")}
                    </button>
                </div>
            </div>
        );
    }

    const name = getLocalizedText(project, 'name');
    const date = getLocalizedText(project, 'date');
    const description = getLocalizedText(project, 'description');
    const achievements = getLocalizedText(project, 'achievements');
    const expandedDescription = getLocalizedText(project, 'expanded-description');
    const technologies = project.technologies || [];
    const github = project.github || '';
    const demo = project.demo || '';
    const features = getProjectFeatures();

    return (
        <>
            <div className="project-details-container">
                {/*barra navegacion*/}
                <nav className="navbar navbar-expand-lg sticky-top project-details-navbar">
                    <div className="container">
                        {/*volver a atras*/}
                        <div className="navbar-left">
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-outline-secondary back-btn"
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                {t("i_go_back", "Go Back")}
                            </button>
                        </div>

                        {/*titulo del proyecto*/}
                        <div className="navbar-center d-none d-md-block">
                            <h4 className="navbar-title mb-0">
                                {name}
                            </h4>
                        </div>

                        {/*cambiar idioma*/}
                        <div className="navbar-right">
                            <div className="nav-item dropdown">
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
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setLanguage("en");
                                        }}>
                                            <img src={flags.en} alt="en" width="20" className="me-2" />EN
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setLanguage("es");
                                        }}>
                                            <img src={flags.es} alt="es" width="20" className="me-2" />ES
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="project-details">

                    {/*contenido principal*/}
                    <div className="project-details-content">
                        {/*cabecera del proyecto*/}
                        <div className="project-hero">
                            <div className="project-title-section">
                                <h1 className="project-title">{name}</h1>
                            </div>

                            {/*logros*/}
                            {project.achievements && (
                                <p className="project-achievements mt-3">
                                    ★ {achievements}
                                </p>
                            )}

                            {/*descripcion corta*/}
                            {description && (
                                <p className="project-subtitle lead">
                                    {description}
                                </p>
                            )}

                            {/*colaboraciones*/}
                            {project.colaboration && project.colaboration.length > 0 && (
                                <div className="project-collaboration mb-4">
                                    <h6 className="collaboration-title mb-3">
                                        {t("i_collaboration", "Collaboration with")}:
                                    </h6>
                                    <div className="collaboration-partners">
                                        {project?.colaboration?.map((partner, idx) => {
                                            const partnerName = getLocalizedCollaboration(partner);
                                            return (
                                                <div className="collaboration-partner" key={idx}>
                                                    {partner.img && (
                                                        <img
                                                            src={partner.img}
                                                            alt={partnerName}
                                                            className="collaboration-logo me-2"
                                                            style={{ width: '30px', height: '30px' }}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <span><a href={partner.link}>{partnerName}</a></span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/*contenido del proyecto*/}
                        <div className="project-main-grid">
                            {/*columna izquierda: contenido*/}
                            <div className="project-content-column">
                                {/*descripcion expandida*/}
                                <div className="project-section content-section">
                                    <h3 className="section-title">
                                        {t("i_project_details", "Project Details")}
                                    </h3>
                                    <div className="expanded-description-content">
                                        {renderExpandedContent(expandedDescription)}
                                    </div>
                                </div>


                            </div>

                            {/*columna derecha*/}
                            <div className="project-sidebar">
                                {/* info del proyecto*/}
                                <div className="sidebar-section info-section">
                                    <h4 className="sidebar-title">
                                        {t("i_project_info", "Project Info")}
                                    </h4>
                                    <ul className="project-info-list">
                                        {date && (
                                            <li>
                                                <span className="info-label">
                                                    {t("i_year", "Year")}:
                                                </span>
                                                <span className="info-value">{date}</span>
                                            </li>
                                        )}
                                        {project.category && (
                                            <li>
                                                <span className="info-label">
                                                    {t("i_category", "Category")}:
                                                </span>
                                                <span className="info-value">
                                                    {getLocalizedText(project, 'category')}
                                                </span>
                                            </li>
                                        )}
                                        {project.status && (
                                            <li>
                                                <span className="info-label">
                                                    {t("i_status", "Status")}:
                                                </span>
                                                <span className="info-value">
                                                    {getLocalizedText(project, 'status')}
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/*enlaces rapidos*/}
                                <div className="sidebar-section links-section">
                                    <h4 className="sidebar-title">
                                        {t("i_quick_links", "Quick Links")}
                                    </h4>
                                    <div className="project-links-buttons">
                                        {github && (
                                            <a
                                                href={github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary w-100 mb-2 d-flex align-items-center justify-content-center"
                                            >
                                                <i className="fab fa-github me-2"></i>
                                                {t("i_view_code", "View Code")}
                                            </a>
                                        )}
                                        {demo && (
                                            <a
                                                href={demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                            >
                                                <i className="fas fa-external-link-alt me-2"></i>
                                                {t("i_live_demo", "Live Demo")}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/*caracteristicas*/}
                                {features?.length > 0 && (
                                    <div className="sidebar-section features-section">
                                        <h3 className="section-title">
                                            {t("i_key_features", "Key Features")}
                                        </h3>
                                        <ul className="features-list">
                                            {features?.map((feature, idx) => (
                                                <li key={idx} className="feature-item">
                                                    <span className="feature-text">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}



                                {/*tecnologias*/}
                                {technologies?.length > 0 && (
                                    <div className="sidebar-section tech-section">
                                        <h4 className="sidebar-title">
                                            {t("i_technologies", "Technologies")}
                                        </h4>
                                        <div className="tech-stack">
                                            {technologies?.map((tech, techIdx) => (
                                                <span className="tech-badge" key={techIdx}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}



                                {/*preview galeria*/}
                                {galleryImages.length > 0 && (
                                    <div className="sidebar-section gallery-preview">
                                        <h4 className="sidebar-title">
                                            {t("i_gallery", "Gallery")}
                                        </h4>
                                        <p className="text-muted small mb-3">
                                            {t("i_click_to_expand", "Click on images to view full size")}
                                        </p>
                                        <div className="gallery-preview-grid">
                                            {galleryImages?.slice(0, 4)?.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    className="gallery-preview-item"
                                                    onClick={() => openImageGallery(idx)}
                                                >
                                                    <img
                                                        src={img.src}
                                                        alt={img.alt}
                                                        className="preview-img"
                                                    />
                                                </button>
                                            ))}
                                            {galleryImages.length > 4 && (
                                                <button
                                                    className="gallery-preview-more"
                                                    onClick={() => openImageGallery(0)}
                                                >
                                                    +{galleryImages.length - 4} more
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </div>

                {/*galeria*/}
                {isGalleryOpen && galleryImages.length > 0 && (
                    <ImageGallery
                        images={galleryImages}
                        isOpen={isGalleryOpen}
                        onClose={() => setIsGalleryOpen(false)}
                        startIndex={galleryStartIndex}
                    />
                )}
            </div>
        </>
    );
};

export default ProjectDetails;