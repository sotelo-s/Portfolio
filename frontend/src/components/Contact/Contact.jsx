import "./Contact.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import contactData from '../../assets/data/contact.json';

const Contact = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    setContact(contactData);
  }, []);

  if (!contact) {
    return <div className="content-section">Loading...</div>;
  }

  return (
    <div className="content-section">
      <h2>{t("i_contact_title")}</h2>
      <p>{t("i_contact_text")}</p>
      
      <div className="social-links-container mt-4">
        <h4>{t("i_connect_with_me")}</h4>
        <div className="social-links-grid">
          {contact.socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
              style={{ 
                '--social-color': social.color,
                borderColor: social.color
              }}
            >
              <div className="social-icon-container">
                <img 
                  src={social.icon} 
                  alt={social.name}
                  className="social-icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span>${social.name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="contact-info mt-5">
        <h4>{t("i_contact_details")}</h4>
        <div className="contact-details-grid">
            
          <div className="contact-item">
            <div className="contact-label">Phone:</div>
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="contact-value">
              {contact.phone}
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-label">{t("i_location")}:</div>
            <div className="contact-value">
              {contact.location[language] || contact.location.en}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Contact;