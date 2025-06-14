import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingImage = styled(motion.img)`
  position: fixed;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  object-fit: cover;

  &:hover {
    opacity: 0.8;
  }
`;

interface Image {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const FloatingImages: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const maxImages = 6; // Reduced number of images

  const imageSources = [
    '/images/3.JPG',
    '/images/4.JPG',
    '/images/5.JPG',
    '/images/6.JPG',
    '/images/7.JPG',
    '/images/8.jpeg',
    '/images/9.jpeg',
    '/images/10.jpeg',
  ];

  useEffect(() => {
    const createRandomImage = (): Image => ({
      id: Math.random(),
      src: imageSources[Math.floor(Math.random() * imageSources.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 120 + Math.random() * 80, // Slightly larger images
      rotation: Math.random() * 20 - 10,
    });

    // Initial images
    const initialImages = Array.from({ length: maxImages }, createRandomImage);
    setImages(initialImages);

    // Update images less frequently
    const interval = setInterval(() => {
      setImages(prevImages => {
        // Keep more existing images
        const filteredImages = prevImages.filter(() => Math.random() > 0.3);
        
        // Add new image if below max
        if (filteredImages.length < maxImages) {
          return [...filteredImages, createRandomImage()];
        }
        
        return filteredImages;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {images.map((image) => (
        <FloatingImage
          key={image.id}
          src={image.src}
          style={{
            width: image.size,
            height: image.size,
            left: `${image.x}%`,
            top: `${image.y}%`,
            rotate: image.rotation,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            x: [0, Math.random() * 30 - 15, 0], // Reduced movement range
            y: [0, Math.random() * 30 - 15, 0],
            rotate: [image.rotation, image.rotation + 5, image.rotation],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 12, // Slower animation
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default FloatingImages; 