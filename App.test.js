import React from 'react';
import App from './App';
import Calculator from './calculatorMod'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Calculator />).toJSON();
  expect(rendered).toBeTruthy();
});
