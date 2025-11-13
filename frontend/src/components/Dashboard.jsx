import authService from '../services/authService';

const Dashboard = ({ onLogout }) => {
  const user = authService.getUser();

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
      <div className="dashboard-content">
        <h3>Welcome, {user?.name}!</h3>
        <p>Email: {user?.email}</p>
        <p>You are now logged in and can access protected content.</p>
      </div>
    </div>
  );
};

export default Dashboard;