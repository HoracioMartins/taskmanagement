import React from "react";
import { IBatch, IInspector } from "./types";

interface Props {
  batches: IBatch[];
  inspectors: IInspector[];
  handleTaskCreation: (batchId: number) => void;
  handleInspectorSelection: (inspectorName: string) => void;
  showNewTask: boolean;
  handleNewTaskClick: () => void;
}


const NewTask: React.FC<Props> = ({
  batches,
  inspectors,
  showNewTask,
  handleTaskCreation,
  handleInspectorSelection,
  handleNewTaskClick
}) => {
  


  return (
    <>
      {showNewTask && (
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-900 leading-tight m-6">
            Create New Task
          </h2>

          <table className="md:w-11/12 w-12/12 m-auto border-collapse block md:table sm:shadow-md shadow-none rounded bg-white px-4">
            <thead className="block md:table-header-group border-gray-200 bg-gray-100 text-gray-600">
              <tr className="border border-grey-500 text-center md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="text-lg font-semibold text-center p-2 text-left block md:table-cell text-gray-900 ">
                  Product
                </th>
                <th className="text-lg font-semibold text-center p-2 text-left block md:table-cell text-gray-900 ">
                  Variety
                </th>
                <th className="text-lg font-semibold text-center p-2 text-left block md:table-cell text-gray-900 ">
                  Arrival Timestamp
                </th>
                <th className="text-lg font-semibold text-center p-2 text-left block md:table-cell text-gray-900 ">
                  Inspector
                </th>
                <th className="text-lg font-semibold text-center p-2 text-left block md:table-cell text-gray-900 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group flex items-center flex-col">
              {batches.map((batch) => (
                <tr className="bg-white w-full sm:border-b border-b-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left">
                  <td className="p-2  block md:table-cell sm:text-center text-left sm:border-r-0 border text-base text-gray-900 whitespace-no-wrap text-left">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Product:
                    </span>
                    {batch.product}
                  </td>
                  <td className="p-2  block md:table-cell sm:text-center text-left  sm:border-0 border text-base text-gray-900 whitespace-no-wrap text-left">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Variety:
                    </span>
                    {batch.variety}
                  </td>
                  <td className="p-2  block md:table-cell sm:text-center text-left sm:border-0 border text-base text-gray-900 whitespace-no-wrap text-left">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Arrival:
                    </span>
                    {batch.arrivalTimestamp}
                  </td>
                  <td className="p-2  text-left block md:table-cell text-center  sm:border-0 text-left border text-base text-gray-900 whitespace-no-wrap">
                    <span className="inline-block w-1/3 md:hidden font-bold text-base">
                      Inspector:
                    </span>
                    <select
                      defaultValue={inspectors[0].name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) =>
                        handleInspectorSelection(event.target.value)
                      }
                    >
                      {inspectors.map((inspector) => (
                        <option key={inspector.id} value={inspector.name}>
                          {inspector.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2  text-left block md:table-cell text-center mb-6">
                    <button
                      className="py-2 px-4 shadow-md no-underline rounded-full hover:border-[#b6e8e3] hover:text-[#854dff] border-2 border-gray-200 font-semibold text-sm border-blue    mr-2 text-gray-900"
                      onClick={() => handleTaskCreation(batch.id)}
                    >
                      Create Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleNewTaskClick}
            className="px-8 sm:mx-2 py-2.5 text-sm ext-sm text-base text-white bg-gray-800 rounded hover:bg-gray-700 min-w-104 font-medium sm:mt-4 sm:mb-auto mb-6 text-gray-700 transition-colors duration-300 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default NewTask;
