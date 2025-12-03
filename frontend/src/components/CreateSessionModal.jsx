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
      <div className="modal-box bg-base-100">
        <form method="dialog">
          <button 
            type="button" 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-4">Create New Session</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Problem</span>
            </label>
            <input
              type="text"
              name="problem"
              value={roomConfig.problem}
              onChange={handleChange}
              placeholder="Enter coding problem"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Difficulty</span>
            </label>
            <select
              name="difficulty"
              value={roomConfig.difficulty}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="modal-action">
            <button 
              type="button" 
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ${isCreating ? 'loading' : ''}`}
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