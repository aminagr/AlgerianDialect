import React from 'react';
import { AppProvider } from './context/AppContext.jsx';
import AppContent from './AppContent'; 

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
