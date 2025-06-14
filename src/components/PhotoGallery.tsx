import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

// Replace these with actual image URLs
const photos = [
  {
    id: 1,
    url: '/images2/1.JPG',
    caption: 'Fighter Doggo'
  },
  {
    id: 2,
    url: '/images2/2.JPG',
    caption: 'Colorful Doggos'
  },
  {
    id: 3,
    url: '/images2/3.JPG',
    caption: 'Location Selfie Doggo'
  },
  {
    id: 4,
    url: '/images2/4.JPG',
    caption: 'Ulti se Nahata hua Doggo'
  },
  {
    id: 5,
    url: '/images2/5.JPG',
    caption: 'Balle Balle Doggo'
  },
  {
    id: 6,
    url: '/images2/6.JPG',
    caption: '3 Big and 1 fat doggo (guess the fat one)'
  },
  {
    id: 7,
    url: '/images2/7.JPG',
    caption: 'Trying to be cute Doggos'
  },
  
  {
    id: 8,
    url: '/images2/8.jpeg',
    caption: 'Possessed Doggo'
  },
  {
    id: 9,
    url: '/images2/9.jpeg',
    caption: 'Seth Ji Doggo'
  },
  {
    id: 10,
    url: '/images2/10.jpeg',
    caption: 'Pareshaan Doggo'
  },
  {
    id: 11,
    url: '/images2/11.jpeg',
    caption: 'Phas gya badmosh'
  },
  {
    id: 12,
    url: '/images2/12.jpeg',
    caption: 'Which one is the Kid?'
  },
  {
    id: 13,
    url: '/images2/13.jpeg',
    caption: 'Smort Doggo'
  },
  
  {
    id: 14,
    url: '/images2/14.jpeg',
    caption: 'Doggo in hotel'
  },
  
  {
    id: 15,
    url: '/images2/15.jpeg',
    caption: 'Gift dega Doggo'
  },
  {
    id: 16,
    url: '/images2/16.jpeg',
    caption: 'Doggo in Air'
  },

  {
    id: 17,
    url: '/images2/17.jpeg',
    caption: 'Jokers Doggos'
  },
  
];

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85)
  );
  border-radius: 24px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(
        circle at 20% 20%,
        rgba(46, 125, 50, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(67, 160, 71, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(102, 187, 106, 0.1) 0%,
        transparent 50%
      );
    animation: rotate 30s linear infinite;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
      rgba(46, 125, 50, 0.05),
      rgba(67, 160, 71, 0.05),
      rgba(102, 187, 106, 0.05)
    );
    animation: pulse 8s ease-in-out infinite;
    z-index: 0;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2e7d32;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, 
    #2e7d32 0%, 
    #43a047 25%,
    #66bb6a 50%,
    #43a047 75%,
    #2e7d32 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: gradientFlow 8s ease infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, 
      #2e7d32,
      #43a047,
      #66bb6a,
      #43a047,
      #2e7d32
    );
    background-size: 200% 100%;
    border-radius: 2px;
    animation: gradientFlow 8s ease infinite;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

const PhotoCard = styled(motion.div)<{ aspectRatio: number }>`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  aspect-ratio: ${props => props.aspectRatio};
  background: #f5f5f5;
  transform-style: preserve-3d;
  perspective: 1000px;
  border: 3px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(46, 125, 50, 0.3), 
      rgba(67, 160, 71, 0.3),
      rgba(102, 187, 106, 0.3)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    border-color: #43a047;
    transform: translateY(-5px);
    box-shadow: 
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.1);
    &::before {
      opacity: 1;
    }
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${PhotoCard}:hover & {
    transform: scale(1.1) rotate(2deg);
    filter: brightness(1.2) contrast(1.1) saturate(1.3);
  }
`;

const Caption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.8) 30%,
    rgba(0, 0, 0, 0.4)
  );
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  z-index: 2;
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CaptionText = styled.span`
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  opacity: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(12px);
`;

const ModalContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
  }
`;

const ModalCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  color: white;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.8) 30%,
    transparent
  );
  backdrop-filter: blur(8px);
`;

const CloseButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #2e7d32;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: white;
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const NavigationButton = styled(motion.button)`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #2e7d32;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 2rem;
`;

const NextButton = styled(NavigationButton)`
  right: 2rem;
`;

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [imageAspectRatios, setImageAspectRatios] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
      img.onload = () => {
        setImageAspectRatios(prev => ({
          ...prev,
          [photo.id]: img.width / img.height
        }));
      };
    });
  }, []);

  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  return (
    <GalleryContainer>
      <Title>Our Memories Together</Title>
      <PhotoGrid>
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            aspectRatio={imageAspectRatios[photo.id] || 4/3}
          >
            <Photo src={photo.url} alt={photo.caption} />
            <Caption>
              <CaptionText>{photo.caption}</CaptionText>
            </Caption>
          </PhotoCard>
        ))}
      </PhotoGrid>

      <AnimatePresence>
        {selectedPhoto && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={() => setSelectedPhoto(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
              <PrevButton
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ‹
              </PrevButton>
              <NextButton
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ›
              </NextButton>
              <ModalImage src={selectedPhoto.url} alt={selectedPhoto.caption} />
              <ModalCaption>{selectedPhoto.caption}</ModalCaption>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default PhotoGallery; 