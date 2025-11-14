import authService from '../services/authService';

const Dashboard = ({ onLogout }) => {
  const user = authService.getUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, still call onLogout to update UI state
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              Logout
            </button>
          </div>
          <div className="dashboard-content">
            <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Welcome, {user?.name}!</h3>
              <p className="text-gray-300 mb-1">Email: {user?.email}</p>
              <p className="text-gray-400">You are now logged in and can access protected content.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h4 className="text-xl font-semibold text-white mb-3">Your Profile</h4>
                <p className="text-gray-300">Manage your account settings and preferences.</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h4 className="text-xl font-semibold text-white mb-3">Interview Practice</h4>
                <p className="text-gray-300">Start practicing coding interviews with our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;