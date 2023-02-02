import React, { useMemo } from "react";
import { ITask } from "./types";

interface Props {
  tasks: ITask[];
  taskCount: number;
  handleNewTaskClick: () => void;
}

const LeftInfo: React.FC<Props> = React.memo(({
  tasks,
  taskCount,
  handleNewTaskClick
}) => {
  
  const countTasksByInspector = useMemo(() => 
    (inspectorName: string) => {
    const tasksByInspector = tasks.filter(
      (task) => task.inspectorName === inspectorName
      );
      return tasksByInspector.length;
    }, [tasks]);


  return (
    <>
      <div className="w-64 px-8 py-4 border-r overflow-auto xs_hidden sm:hidden bg-gray-100 md:hidden lg:block">
        <nav className="mt-8">
          <h3 className="text-base font-bold text-gray-600 uppercase tracking-wide text-left">
            Task
          </h3>
          <div className="mt-2 -mx-3">
            <div className="flex justify-between items-center px-3 py-2 bg-gray-200 rounded">
              <span className="text-sm text-base text-gray-900 ">All</span>
              <span className="text-xs font-semibold text-gray-700 ">
                {taskCount}
              </span>
            </div>
            <div className="flex justify-between items-center px-3 py-2 rounded-lg">
              <span className="text-xs text-gray-700 ">Inspector A</span>
              <span className="text-xs font-semibold text-gray-700 ">
                {countTasksByInspector("Inspector A")}
              </span>
            </div>
            <div className="flex justify-between items-center px-3 py-2 rounded-lg">
              <span className="text-xs  text-gray-700 ">Inspector B</span>
              <span className="text-xs font-semibold text-gray-700 ">
                {countTasksByInspector("Inspector B")}
              </span>
            </div>
            <div className="flex justify-between items-center px-3 py-2 rounded-lg">
              <span className="text-xs text-gray-700 ">Inspector C</span>
              <span className="text-xs font-semibold text-gray-700 ">
                {countTasksByInspector("Inspector C")}
              </span>
            </div>
          </div>
          <button
            onClick={handleNewTaskClick}
            className=" mt-4 -ml-1 flex items-center text-sm text-base text-gray-600"
          >
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 7v10m5-5H7"
              />
            </svg>
            <span className="ml-1">New Task</span>
          </button>
        </nav>
      </div>
    </>
  );
});

export default LeftInfo;
