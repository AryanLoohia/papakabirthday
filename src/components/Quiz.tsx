import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: "What is doggo's class and section?",
    options: ["Class 8H", "Class 7H", "Class 8I", "Class 8C"],
    correctAnswer: 2
  },
  {
    question: "Who is the dumbest person in the family?",
    options: ["DOGGO", "DoGgO", "doggo", "doGgO"],
    correctAnswer:2
  },
  {
    question: "What is Mummy's favourite animal ?",
    options: ["🐼", "🐻", "🦊", "🐱"],
    correctAnswer: 2
  },
  {
    question: "What is my next semester ?",
    options: ["3", "7", "4", "5"],
    correctAnswer: 2
  },
  {
    question: " if big doggo buys gold every Diwali “for future security” but never tells you, under which head should it be classified?",
    options: [
      "A. Hidden Current Asset",
      "B. Unrecorded Capital Reserve",
      "C. Contingent Liability (to be discovered in future audit)",
      "D. Off-Balance Sheet Item under 'Wife's Investments'"
    ],
    correctAnswer: 3
  },
  {
    question: "Ye wala aadmi quiz khatam karne wala hai, saamne wale aadmi ko koi dikkat?",
    options: ["YES","yOS"],
    correctAnswer: 2
  }
];

const QuizContainer = styled.div`
  max-width: 800px;
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
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const QuestionCard = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h2`
  color: #1b5e20;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const Option = styled(motion.button)<{ isSelected?: boolean; isCorrect?: boolean }>`
  padding: 1.2rem;
  border: 2px solid #4caf50;
  border-radius: 12px;
  background: ${props => {
    if (props.isCorrect) return '#4caf50';
    if (props.isSelected) return '#ffd700';
    return 'white';
  }};
  color: ${props => (props.isSelected || props.isCorrect) ? 'white' : '#2e7d32'};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

const Result = styled(motion.div)`
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background: #e8f5e9;
  border-radius: 16px;
  color: #2e7d32;
  font-size: 1.4rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled(motion.button)`
  display: block;
  margin: 1.5rem auto 0;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled(motion.div)<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #2e7d32 0%, #43a047 100%);
  width: ${props => props.progress}%;
  border-radius: 4px;
`;

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <QuizContainer>
        <Title>Quiz Results</Title>
        <Result
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Kul Milakar {calculateScore()} aaye hai  {questions.length} se! 🎉
        </Result>
        <Button
          onClick={restartQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </Button>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <Title>Dad Quiz</Title>
      <ProgressBar>
        <Progress
          progress={(currentQuestion / questions.length) * 100}
          initial={{ width: 0 }}
          animate={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>
      <QuestionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Question>
          {currentQuestion + 1}. {questions[currentQuestion].question}
        </Question>
        <OptionsContainer>
          {questions[currentQuestion].options.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleAnswer(index)}
              isSelected={selectedAnswers[currentQuestion] === index}
              isCorrect={isAnswered && index === questions[currentQuestion].correctAnswer}
              disabled={isAnswered}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
        {isAnswered && (
          <Button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </QuestionCard>
    </QuizContainer>
  );
};

export default Quiz; 