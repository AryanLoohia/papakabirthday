import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

// Extended word list with longer words
const WORDS = [
  'IDIOT', 'DOGGO', 'POTTY'
];

const MAX_ATTEMPTS = 5;

const WordleContainer = styled.div`
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

const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
`;

const Tile = styled(motion.div)<{ status?: 'correct' | 'present' | 'absent' }>`
  width: 70px;
  height: 70px;
  border: 2px solid #ccc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'correct': return '#4caf50';
      case 'present': return '#ffd700';
      case 'absent': return '#9e9e9e';
      default: return 'white';
    }
  }};
  color: ${props => props.status ? 'white' : 'black'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Input = styled.input`
  margin: 2rem auto;
  display: block;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  width: 300px;
  border: 2px solid #4caf50;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
    border-color: #2e7d32;
  }
`;

const Message = styled(motion.div)`
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 500;
  background: #e8f5e9;
  color: #2e7d32;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled(motion.button)`
  display: block;
  margin: 1rem auto;
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

const Wordle: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setAttempts([]);
    setCurrentAttempt('');
    setMessage('');
    setGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const checkWord = (word: string) => {
    if (word.length !== targetWord.length) {
      setMessage(`Word must be ${targetWord.length} letters long!`);
      return;
    }

    const newAttempts = [...attempts, word];
    setAttempts(newAttempts);
    setCurrentAttempt('');

    if (word === targetWord) {
      setMessage('Congratulations! You found the word! 🎉');
      setGameOver(true);
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setMessage(`Game Over! The word was ${targetWord}`);
      setGameOver(true);
    }
  };

  const getTileStatus = (letter: string, index: number, attempt: string) => {
    if (letter === targetWord[index]) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  return (
    <WordleContainer>
      <Title>Dad Wordle</Title>
      <GameBoard>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => (
          <Row key={rowIndex}>
            {Array.from({ length: targetWord.length }).map((_, colIndex) => {
              const letter = attempts[rowIndex]?.[colIndex] || '';
              const status = attempts[rowIndex] ? getTileStatus(letter, colIndex, attempts[rowIndex]) : undefined;
              return (
                <Tile
                  key={colIndex}
                  status={status}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: colIndex * 0.1 }}
                >
                  {letter}
                </Tile>
              );
            })}
          </Row>
        ))}
      </GameBoard>
      <Input
        value={currentAttempt}
        onChange={(e) => setCurrentAttempt(e.target.value.toUpperCase())}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !gameOver) {
            checkWord(currentAttempt);
          }
        }}
        maxLength={targetWord.length}
        placeholder={`Enter ${targetWord.length}-letter word`}
        disabled={gameOver}
      />
      <AnimatePresence>
        {message && (
          <Message
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {message}
          </Message>
        )}
      </AnimatePresence>
      {gameOver && (
        <Button
          onClick={startNewGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </Button>
      )}
    </WordleContainer>
  );
};

export default Wordle; 