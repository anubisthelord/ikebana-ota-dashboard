
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPostLoginPath } from '../utils/getPostLoginPath';

export default function PostLoginRedirect() {
  const { user, vendorMemberships, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading your workspace...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const destination = getPostLoginPath(user, vendorMemberships);

  return <Navigate to={destination} replace />;
}
