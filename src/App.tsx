import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import Quiz from './components/Quiz';
import Wordle from './components/Wordle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f9 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 5rem 1rem 1rem;
  }
`;

const PageTransition = styled(motion.div)`
  width: 100%;
`;

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition {...pageTransition}>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/gallery"
                element={
                  <PageTransition {...pageTransition}>
                    <PhotoGallery />
                  </PageTransition>
                }
              />
              <Route
                path="/timeline"
                element={
                  <PageTransition {...pageTransition}>
                    <Timeline />
                  </PageTransition>
                }
              />
              <Route
                path="/quiz"
                element={
                  <PageTransition {...pageTransition}>
                    <Quiz />
                  </PageTransition>
                }
              />
              <Route
                path="/wordle"
                element={
                  <PageTransition {...pageTransition}>
                    <Wordle />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App; 