const React = require('react');

function Link({ to, children, ...rest }) {
  return React.createElement('a', { href: typeof to === 'string' ? to : '#', ...rest }, children);
}

function BrowserRouter({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function Routes({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function Route() {
  return null;
}

function useNavigate() {
  return jest.fn();
}

module.exports = {
  __esModule: true,
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
};

