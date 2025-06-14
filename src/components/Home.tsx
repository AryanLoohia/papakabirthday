import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import FloatingImages from './FloatingImages';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(46, 204, 113, 0.1) 0%, transparent 50%);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
`;

const WelcomeSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 3;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Message = styled(motion.p)`
  font-size: 1.1rem;
  color: #7f8c8d;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
`;

const NavigationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const NavCard = styled(motion(Link))`
  text-decoration: none;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  text-align: center;
  color: #2c3e50;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.12),
      0 1px 3px rgba(0, 0, 0, 0.05);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HomeContainer>
      <BackgroundPattern />
      <FloatingImages />
      <ContentWrapper>
        <WelcomeSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Happy Big Doggo's Day!
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            To the most bawakoof pitaji
          </Subtitle>
          <Message
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
              Thank you doggo for taking care of two skmol doggos and one more big dangerous doggo. This website both for birthday and father's day hehehehe.<b> Kul Milakar Yahi hai.</b>
          </Message>
        </WelcomeSection>

        <NavigationGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <NavCard
            to="/gallery"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconWrapper>📸</IconWrapper>
            <CardTitle>Photo Gallery</CardTitle>
            <CardDescription>
              Dekho khud ko kitni mosti ki hai
            </CardDescription>
          </NavCard>

          

          <NavCard
            to="/quiz"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconWrapper>❓</IconWrapper>
            <CardTitle>Quiz</CardTitle>
            <CardDescription>
              Memory check karlo, galti se mummy jaise na hogyi ho
            </CardDescription>
          </NavCard>

          <NavCard
            to="/wordle"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconWrapper>🎮</IconWrapper>
            <CardTitle>Wordle Game</CardTitle>
            <CardDescription>
              English bhi check karlo, galti se mere jaisi na hogyi ho
            </CardDescription>
          </NavCard>
        </NavigationGrid>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home; 