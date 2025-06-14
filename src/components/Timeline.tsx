import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2000',
    title: 'The Beginning',
    description: 'The day I was born and you became a father.'
  },
  {
    year: '2005',
    title: 'First Steps',
    description: 'Teaching me to ride a bike and never giving up.'
  },
  {
    year: '2010',
    title: 'School Days',
    description: 'Helping me with homework and encouraging my curiosity.'
  },
  {
    year: '2015',
    title: 'Growing Up',
    description: 'Supporting my dreams and always being there.'
  },
  {
    year: '2020',
    title: 'New Adventures',
    description: 'Starting new chapters together as father and child.'
  },
  {
    year: '2024',
    title: 'Today',
    description: 'Celebrating our bond and creating new memories.'
  }
];

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  color: #2e7d32;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TimelineWrapper = styled.div`
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #2e7d32, #43a047);
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(46, 125, 50, 0.3);
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineContent = styled(motion.div)<{ isLeft?: boolean }>`
  width: 45%;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  margin-left: ${props => props.isLeft ? '0' : 'auto'};
  margin-right: ${props => props.isLeft ? 'auto' : '0'};
  border: 1px solid rgba(46, 125, 50, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 8px 12px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.isLeft ? 'right: -20px' : 'left: -20px'};
    width: 20px;
    height: 20px;
    background: #4caf50;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    
    &::before {
      left: -40px;
    }
  }
`;

const Year = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #2e7d32;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MilestoneTitle = styled.h3`
  color: #1b5e20;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Timeline: React.FC = () => {
  return (
    <TimelineContainer>
      <Title>Our Journey Together</Title>
      <TimelineWrapper>
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={milestone.year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <TimelineContent
              isLeft={index % 2 === 0}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Year>{milestone.year}</Year>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
              <Description>{milestone.description}</Description>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline; 