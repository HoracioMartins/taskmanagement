import React from "react";
import { ITask } from "./types";

interface Props {
  modalOpen: boolean;
  selectedTask: ITask | null;
  handleCloseModal: () => void;
  handleStatusChange: (taskId: number, status: string, task: ITask) => void;
  handleTaskDeletion: (taskId: number) => void;
}

const TaskInfo: React.FC<Props> = ({
  modalOpen,
  selectedTask,
  handleCloseModal,
  handleStatusChange,
  handleTaskDeletion,
}) => {
  return (
    <>
      {modalOpen && selectedTask ? (
        <div className="modal relative flex justify-center items-center ">
          <div
            id="menu"
            className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0"
          >
            <div className="2xl:container2xl:mx-auto sm:py-40 py-4 px-4 md:px-28 flex justify-center items-center">
              <div className="w-full md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-gray-100 p-4 md:p-8 text-gray-600 rounded">
                <div className="modal-content text-base">
                  <h2 className="text-xl mb-4">
                    <b>Task Information</b>
                  </h2>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 font-semibold">
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Product:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Variety:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Number Boxes:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Responsible:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Arrival:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Latest Inspection:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Quality Score:
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-r-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-right">
                        Status:
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.product}
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.variety}
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.numBoxes}
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.inspectorName}
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.arrivalTimestamp}
                      </p>
                      <p className="p-2 border dark:bg-gray-800 dark:border-gray-700 border-l-0 hover:bg-gray-50 dark:hover:bg-gray-600 sm:text-left">
                        {selectedTask.latestInspectionTimestamp}
                      </p>
                      <p
                        className={`p-2 border text-white font-bold ${
                          selectedTask.latestQualityScore === "A"
                            ? "bg-green-600"
                            : selectedTask.latestQualityScore === "B"
                            ? "bg-green-400"
                            : selectedTask.latestQualityScore === "C"
                            ? "bg-yellow-300"
                            : selectedTask.latestQualityScore === "D"
                            ? "bg-orange-400"
                            : ""
                        }`}
                      >
                        {selectedTask.latestQualityScore}
                      </p>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedTask.status}
                        onChange={(e) =>
                          handleStatusChange(
                            selectedTask.id,
                            e.target.value,
                            selectedTask
                          )
                        }
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </select>
                    </div>
                  </div>

                 {/*<button
                    onClick={() => handleTaskDeletion(selectedTask.id)}
                    className="bg-red-500 text-white px-4 sm:mx-2 py-2.5 text-sm font-medium mt-4 transition-colors duration-300 border border-gray-200 rounded-md "
                  >
                    Delete
                      </button>*/}
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  aria-label="close"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TaskInfo;
