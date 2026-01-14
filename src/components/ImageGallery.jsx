import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

function ImageGallery({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log('ImageGallery rendered with images:', images);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    console.log('Toggling fullscreen from', isFullscreen, 'to', !isFullscreen);
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') {
      if (isFullscreen) {
        setIsFullscreen(false);
      } else {
        onClose();
      }
    }
  };

  const handleClose = () => {
    console.log('Closing gallery');
    onClose();
  };

  return (
    <div 
      className={`image-gallery-overlay ${isFullscreen ? 'fullscreen' : ''}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
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
            />
            <button 
              className="gallery-zoom" 
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
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