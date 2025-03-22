import React, { useState } from 'react';
import CookingGameMode from './CookingGameMode';
import ARMode from './ARMode';

function CookingSimulation() {
  const [mode, setMode] = useState(null);

  return (
    <div className="cooking-simulation">
      {!mode ? (
        <div className="mode-selection">
          <h1>Choose Your Mode</h1>
          <button onClick={() => setMode('game')}>Cooking Game Mode</button>
          <button onClick={() => setMode('ar')}>Markerless AR Mode</button>
        </div>
      ) : (
        <>
          {mode === 'game' && <CookingGameMode />}
          {mode === 'ar' && <ARMode />}
        </>
      )}
    </div>
  );
}

export default CookingSimulation;