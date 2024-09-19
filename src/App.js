import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropertyTabs from './components/Property/PropertyTabs'; // Import the new PropertyTabs component
import Login from './components/Auth/Login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Default route redirects to /login */}
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<PropertyTabs />} /> {/* Render PropertyTabs here */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
