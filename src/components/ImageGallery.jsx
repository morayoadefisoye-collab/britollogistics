import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

function ImageGallery({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextImage, prevImage, isFullscreen, onClose]);

  

  return (
    <div 
      className={`image-gallery-overlay ${isFullscreen ? 'fullscreen' : ''}`}
      onClick={onClose}
    >
      <div className="image-gallery-container" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close" onClick={onClose} aria-label="Close gallery">
          <X size={24} />
        </button>

        <div className="gallery-main">
          <button 
            className="gallery-nav gallery-prev" 
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="gallery-image-container">
            <img 
              src={images[currentIndex]} 
              alt={`Gallery image ${currentIndex + 1}`}
              className="gallery-main-image"
              onClick={toggleFullscreen}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%23f0f0f0" width="400" height="400"/><text x="200" y="200" text-anchor="middle" dy=".3em" fill="%23999" font-size="24">Image not found</text></svg>';
              }}
              style={{ cursor: 'zoom-in' }}
              title="Click to fullscreen"
            />
            <button 
              className="gallery-zoom" 
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <ZoomIn size={20} />
            </button>
          </div>

          <button 
            className="gallery-nav gallery-next" 
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>

        <div className="gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;