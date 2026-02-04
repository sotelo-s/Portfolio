import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import enCV from '../../assets/cv/EN.pdf';
import esCV from '../../assets/cv/ES.pdf';

const cv = {
  en: enCV,
  es: esCV
}

const CV = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

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
    <div className="content-section">
      <h2>{t("i_cv_title")}</h2>
      <div className="cv-download-container text-center mb-4">
        <button onClick={handleDownload}
          className="btn btn-primary btn-style-1">
          {t("i_download_cv")}
        </button>
      </div>
      <iframe 
        className='cv'
        src={cv[language]}
        width="80%"
        height="500px"
        title="Curriculum Vitae"
      />
    </div>
  );
};

export default CV;