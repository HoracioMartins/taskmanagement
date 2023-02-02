import React, { useCallback } from "react";
interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleNewTaskClick: () => void;
}

const Navbar: React.FC<Props> = ({ setSearchInput, handleNewTaskClick }) => {
    const handleSearchInput = (event: any) => {
        setSearchInput(event.target.value);
      };
    
      return(
        <>
    <div className="flex-shrink-0 border-b-2 border-gray-200">
                  <header className="px-6">
                    <div className="flex justify-between items-center py-2">
                      <div className="flex">
                        <h2 className="text-lg sm:text-2xl sm:block hidden font-semibold text-gray-900 leading-tight">
                          Task Management
                        </h2>
                      </div>
                      <div className="flex sm:mx-0 mx-auto">
                  <div className="relative sm:w-ful w-42 ">
                          <span className="absolute pl-3 inset-y-0 left-0 flex items-center">
                            <svg
                              className="h-6 w-6 text-gray-600"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                              </svg>
                  </span>
                  <input
                    className="block sm:w-50 w-40 rounded border border-gray-400 pl-10 pr-4 py-2 text-gray-900 text-sm placeholder-gray-600"
                    placeholder="Search"
                    onChange={handleSearchInput}
                  />
                </div>
              </div>
              <div className="flex sm:mx-0 mx-auto">
                <button
                  className="flex items-center pl-2 pr-4 py-2.5 text-sm text-base text-white bg-gray-800 rounded hover:bg-gray-700 min-w-104 max-h-10"
                  onClick={handleNewTaskClick}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M12 7v10m5-5H7"
                    />
                  </svg>
                  <span className="ml-1">New Task</span>
                </button>
              </div>
            </div>
          </header>
        </div>
    </>
    );
  };
  
  export default Navbar;