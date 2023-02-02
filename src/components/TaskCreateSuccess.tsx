import React from "react";

interface Props {
  createTaskSuccess: boolean;
}

const TaskCreateSuccess: React.FC<Props> = ({ createTaskSuccess }) => {
  return (
    <>
      {createTaskSuccess && (
        <div
          className="px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg"
          role="alert"
        >
          <p className="font-bold">You have created a new task</p>
        </div>
      )}
    </>
  );
};

export default TaskCreateSuccess;
