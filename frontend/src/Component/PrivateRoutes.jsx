import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const hasValidResetState = location.state && location.state.email && location.state.resetCode;

  if (!hasValidResetState) {
    return <Navigate to="/forgotPassword" replace />;
  }

  return children;
};

export default PrivateRoute;