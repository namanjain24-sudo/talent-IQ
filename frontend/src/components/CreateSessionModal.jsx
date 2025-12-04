import React, { useEffect } from 'react';

const CreateSessionModal = ({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRoom();
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setRoomConfig({ problem: '', difficulty: 'easy' });
    }
  }, [isOpen, setRoomConfig]);

  if (!isOpen) return null;

  return (
    <dialog id="create_session_modal" className="modal modal-open">
      <div className="modal-box bg-base-200 border border-primary/10">
        <form method="dialog">
          <button 
            type="button" 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-base-300"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-6">Create New Session</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-base-content mb-2">
              Problem
            </label>
            <input
              type="text"
              name="problem"
              value={roomConfig.problem}
              onChange={handleChange}
              placeholder="Enter coding problem"
              className="w-full px-4 py-2.5 bg-base-300/50 border border-primary/10 rounded-lg text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-base-content mb-2">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={roomConfig.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-base-300/50 border border-primary/10 rounded-lg text-base-content focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <button 
              type="button" 
              className="px-4 py-2 bg-base-300/50 hover:bg-base-300 rounded-lg text-base-content font-semibold transition-all duration-200"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg text-base-100 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateSessionModal;