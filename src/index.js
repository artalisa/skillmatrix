import React from 'react';
import ReactDOM from 'react-dom';

import sl from 'servicelocator';
import SkillMatrixAPI from './lib/backend/SkillMatrixAPI';
sl.register('SkillMatrixAPI', new SkillMatrixAPI('user', 'user', 'http://api-skillmatrix.cloud.baksa.lt'));

import App from './App';
import './css/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
