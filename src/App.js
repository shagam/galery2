import React, {useState, useEffect} from 'react';

import './App.css';

import { AuthProvider, } from './contexts/AuthContext';
import { MainRout } from './MainRout';

function App() { 
 
  return (
    <div>

      <AuthProvider>
        <MainRout/>
      </AuthProvider>

     </div>
  );
}

export default App;
