import React, { useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { ITask } from "./types";

interface Props {
  tasks: ITask[];
  handleViewMore: (task: ITask) => void;
  showTask: boolean;
  isLoading: boolean;
}

const ShowCards: React.FC<Props> = ({ isLoading, tasks, handleViewMore, showTask }) => {
  const toDoTasks = useMemo(
    () => tasks.filter((task) => task.status === "TODO"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "IN_PROGRESS"),
    [tasks]
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.status === "DONE"),
    [tasks]
  );
  
  return (
    <>
    
      {showTask && (
        <main className="md:p-3 p-0 block md:flex md:inline-flex">
          <div className="md:my-0 md:mx-0 md:ml-3 mx-auto my-4 flex-shrink-0 p-3 w-80 bg-gray-100 rounded sm:shadow-md ">
            <h3 className="text-sm text-base text-gray-900 font-bold">To do</h3>
            
            <ul className="mt-2">
              {toDoTasks.map((task) => (
                  <a key={task.id} onClick={() => handleViewMore(task)} >
                    <li
                      className="mt-3 block p-5 bg-white rounded shadow hover:scale-105 duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm text-base leading-snug text-gray-900 text-left">
                          <span className="font-semibold">
                            {task.product} - {task.variety}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <div className="text-sm text-gray-600">
                          <time dateTime={task.arrivalTimestamp}>
                            {task.arrivalTimestamp}
                          </time>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm leading-snug text-gray-900 text-left underline cursor-pointer">
                            View More
                          </p>
                        </div>
                      </div>
                    </li>
                  </a>
                ))}
            </ul>
          </div>

          <div className="flex-shrink-0 p-3 w-80 bg-gray-100 rounded md:ml-3 mx-auto my-4 md:my-0 sm:shadow-md">
            <h3 className="text-sm text-base text-gray-900 font-bold">
              In Progress
            </h3>
            <ul className="mt-2">
              
              {isLoading && <LoadingSpinner />}
              {inProgressTasks.map((task) => (
                  <a key={task.id} onClick={() => handleViewMore(task)} >
                    <li
                      className="mt-3 block p-5 bg-white rounded shadow hover:scale-105 duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm text-base leading-snug text-gray-900 text-left">
                          <span className="font-semibold">
                            {task.product} - {task.variety}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <div className="text-sm text-gray-600">
                          <time dateTime={task.arrivalTimestamp}>
                            {task.arrivalTimestamp}
                          </time>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm leading-snug text-gray-900 text-left underline cursor-pointer">
                            View More
                          </p>
                        </div>
                      </div>
                    </li>
                  </a>
                ))}
            </ul>
          </div>

          <div className="flex-shrink-0 p-3 w-80 bg-gray-100 rounded md:ml-3 mx-auto my-4 md:my-0 sm:shadow-md">
            <h3 className="text-sm text-base text-gray-900 font-bold">Done</h3>
            <ul className="mt-2">
              {doneTasks.map((task) => (
                  <a key={task.id} onClick={() => handleViewMore(task)} >
                    <li
                      className="mt-3 block p-5 bg-white rounded shadow hover:scale-105 duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm text-base leading-snug text-gray-900 text-left">
                          <span className="font-semibold line-through ">
                            {task.product} - {task.variety}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <div className="text-sm text-gray-600  line-through ">
                          <time dateTime={task.arrivalTimestamp}>
                            {task.arrivalTimestamp}
                          </time>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm leading-snug text-gray-900 text-left underline">
                            View More
                          </p>
                        </div>
                      </div>
                    </li>
                  </a>
                ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default ShowCards;
