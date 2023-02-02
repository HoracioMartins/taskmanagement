import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import LeftInfo from "./LeftInfo";
import TaskCreateSuccess from "./TaskCreateSuccess";
import NavBar from "./NavBar";
import ShowCards from "./ShowCards";
import TaskInfo from "./TaskInfo";
import NewTask from "./NewTask";
import { IBatch, IInspector, ITask } from "./types";
import axios from "axios";

function TaskManagement() {
  const [batches, setBatches] = useState<IBatch[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectors, setInspectors] = useState<IInspector[]>([]);
  const [showTask, setShowTask] = useState(true);
  const [showNewTask, setShowNewTask] = useState(false);
  const [createTaskSuccess, setCreateTaskSuccess] = useState(false);
  const [selectedInspectorName, setSelectedInspectorName] = useState("Inspector A");
  const [searchInput, setSearchInput] = useState("");
  const selectedBatchIdRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/inspectors")
      .then((response) => setInspectors(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  
    axios.get("http://localhost:3001/batches")
      .then((response) => setBatches(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  
    axios.get("http://localhost:3001/tasks")
      .then((response) => setTasks(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleInspectorSelection = useCallback((inspectorName: string) => {
    setSelectedInspectorName(inspectorName);
  }, [setSelectedInspectorName]);

  const handleViewMore = (task: ITask) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNewTaskClick = useCallback(() => {
    setShowNewTask(!showNewTask);
    setShowTask(!showTask);
  }, [showNewTask, setShowNewTask]);


  const filteredTasks = useMemo(() => {
    if (searchInput.length < 3) return tasks;
    return tasks.filter((task) => {
      return (
        task.product.toLowerCase().includes(searchInput.toLowerCase()) ||
        task.inspectorName.toLowerCase().includes(searchInput.toLowerCase()) ||
        task.variety.toLowerCase().includes(searchInput.toLowerCase()) ||
        task.arrivalTimestamp.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  }, [searchInput, tasks]);

  const taskCount = tasks.length;

  const handleStatusChange = async (taskId: number, status: string, task: ITask) => {
    const updatedTask = { ...task, status };
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return updatedTask;
      }
      return t;
    });
    setTasks(updatedTasks);
    handleCloseModal();

    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask);
    } 
    
    catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTaskDeletion = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTaskCreation = async (batchId: number) => {
    selectedBatchIdRef.current = batchId;

    setCreateTaskSuccess(true);
    setTimeout(() => setCreateTaskSuccess(false), 5000);

    if (inspectors.length > 0 && !selectedInspectorName) {
      setSelectedInspectorName(inspectors[0].name);
    }
    const selectedBatch = batches.find(
      (batch) => batch.id === selectedBatchIdRef.current
    );
    if (!selectedBatch) return;
    const newTask = {
      inspectorName: selectedInspectorName,
      batchId: selectedBatch.id,
      numBoxes: selectedBatch.numBoxes,
      product: selectedBatch.product,
      variety: selectedBatch.variety,
      arrivalTimestamp: selectedBatch.arrivalTimestamp,
      latestInspectionTimestamp: selectedBatch.latestInspectionTimestamp,
      latestQualityScore: selectedBatch.latestQualityScore,
      status: "TODO",
    };
    await axios.post("http://localhost:3001/tasks", newTask);
    const tasks = await axios.get("http://localhost:3001/tasks").then((response) => response.data);
    setTasks(tasks);
    selectedBatchIdRef.current = null;
    setSelectedInspectorName("Inspector A");
    setShowNewTask(!showNewTask);
    setShowTask(!showTask);
  };

  return (
    <>
      <TaskCreateSuccess createTaskSuccess={createTaskSuccess} />

      <div className="w-full">
        <div className="h-screen flex">
          <LeftInfo
            tasks={tasks}
            taskCount={taskCount}
            handleNewTaskClick={handleNewTaskClick}
          />

          <div className="flex-1 min-w-0 bg-white flex flex-col">
            <NavBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleNewTaskClick={handleNewTaskClick}
            />

            <div className="block md:flex md:inline-flex">
              <ShowCards
                isLoading={isLoading}
                showTask={showTask}
                tasks={filteredTasks}
                handleViewMore={handleViewMore}
              />

              <NewTask
                batches={batches}
                inspectors={inspectors}
                showNewTask={showNewTask}
                handleTaskCreation={handleTaskCreation}
                handleInspectorSelection={handleInspectorSelection}
                handleNewTaskClick={handleNewTaskClick}
              />
            </div>
          </div>
        </div>

        <TaskInfo
          modalOpen={modalOpen}
          selectedTask={selectedTask}
          handleCloseModal={handleCloseModal}
          handleStatusChange={handleStatusChange}
          handleTaskDeletion={handleTaskDeletion}
        />
      </div>
    </>
  );
}

export default TaskManagement;
