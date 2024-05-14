import React, { useState } from 'react';

const Taskitem = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(newContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewContent(task.content);
    setIsEditing(false);
  };

  return (
    <div className="w-80 lg:w-1/2 px-10 py-4 mx-auto">
      <div className="flex items-center justify-between border-b border-gray-400 pb-2 mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full mr-2 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        ) : (
          <input
            type="text"
            value={task.content}
            className="w-full mr-2 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            readOnly
          />
        )}
        <div className="flex">
          {isEditing ? (
            <>
              <button
                className="text-green-500 hover:text-green-700 focus:outline-none"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={onDelete}
              >
                delete
              </button>
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskitem;
