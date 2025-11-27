import React, { useState } from 'react';
import ClickerGame from './components/ClickerGame';
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <ClickerGame 
        isDarkTheme={isDarkTheme} 
        setIsDarkTheme={setIsDarkTheme} 
      />
    </div>
  );
}

export default App;