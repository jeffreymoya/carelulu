import React, { useState, useCallback } from 'react';
import TaskList from './TaskList';
import { useTaskHandlers } from "../../hooks/useTaskHandlers"
import Modal from "../common/Modal"
import DeleteConfirmation from "./DeleteConfirmation"
import {AddTaskModal} from "./AddTaskModal"

const TaskContainer = ({queryReference}) => {
    const {
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
        handleCheckboxChange,
    } = useTaskHandlers(queryReference)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [newTaskName, setNewTaskName] = useState(''); // Add a new state for the new task name

    const handleDelete = useCallback((taskId) => {
        setTaskToDelete(taskId);
        setIsModalOpen(true);
    }, []);

    const confirmDelete = useCallback(() => {
        if (taskToDelete !== null) {
            handleDeleteTask(taskToDelete);
        }
        setIsModalOpen(false);
        setTaskToDelete(null);
    }, [taskToDelete, handleDeleteTask]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleAdd = useCallback(() => {
        setIsModalOpen(true); // Open the modal
    }, []);

    const handleSubmit = useCallback(() => {
        handleAddTask({newName: newTaskName});
        setIsModalOpen(false); // Close the modal
        setNewTaskName(''); // Clear the new task name
    }, [newTaskName, handleAddTask]);

    return (
        <>
            <TaskList
                queryReference={queryReference}
                handleCheckboxChange={handleCheckboxChange}
                handleAddTask={handleAdd}
                handleDeleteTask={handleDelete}
                handleEditTask={handleEditTask}
            />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {taskToDelete ? (
                    <DeleteConfirmation onConfirm={confirmDelete} onCancel={closeModal} />
                ) : ( <AddTaskModal name={newTaskName} onSubmit={handleSubmit} onNameChange={setNewTaskName} /> )}
            </Modal>
        </>
    );
};

export default TaskContainer;