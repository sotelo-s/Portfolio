import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Download } from 'lucide-react';
import './ImageGallery.css';

const ImageGallery = ({ images, isOpen, onClose, startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  //navegacion con teclado
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrev(e);
        break;
      case 'ArrowRight':
        handleNext(e);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        handleToggleFullscreen();
        break;
      default:
        break;
    }
  }, [onClose]);

  //imagen anterior
  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageLoaded(false);
  };

  //imagen siguiente
  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  };

  //fullscreen
  const handleToggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };


  //cargar imagen
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  //error imagen
  const handleImageError = () => {
    setImageLoaded(true);
  };

  //click thumbnail
  const handleThumbnailClick = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
    setImageLoaded(false);
  };

  //listeners de eventos de teclado
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleKeyDown]);


  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
      setImageLoaded(false);
    }
  }, [isOpen, startIndex]);


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="image-gallery-overlay" onClick={onClose}>
      <div className="image-gallery-container" onClick={(e) => e.stopPropagation()}>
        
        {/*boton cerrado*/}
        <button 
          className="gallery-close-btn" 
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X size={28} />
        </button>

        {/*contador de imagenes*/}
        <div className="gallery-toolbar">
          <span className="gallery-counter">
            {currentIndex + 1} / {images.length}
          </span>
          
          
        </div>

        {/*contenedor de la imagen*/}
        <div className="gallery-main-container">
          {/*botones de navegacion*/}
          {images.length > 1 && (
            <>
              <button 
                className="gallery-nav-btn gallery-prev-btn" 
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>
              
              <button 
                className="gallery-nav-btn gallery-next-btn" 
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          {/*imagen principal*/}
          <div className="gallery-image-container">
            <div className={`image-loading ${imageLoaded ? 'loaded' : ''}`}>
              {!imageLoaded && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            
            {currentImage?.src && (
              <img
                src={currentImage.src}
                alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
                className="gallery-main-image"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="eager"
              />
            )}
          </div>
        </div>

        {/*info de la imagen*/}
        {currentImage && (
          <div className="gallery-info">
            <h4 className="gallery-image-title">
              {currentImage.alt || `Image ${currentIndex + 1}`}
            </h4>
            {currentImage.caption && (
              <p className="gallery-image-caption">
                {currentImage.caption}
              </p>
            )}
          </div>
        )}

        {/*thumbnails*/}
        {images.length > 1 && (
          <div className="thumbnail-strip">
            <div className="thumbnail-scroll-container">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(e) => handleThumbnailClick(idx, e)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default ImageGallery;