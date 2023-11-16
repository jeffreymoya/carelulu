import { loadQuery, useMutation, usePreloadedQuery} from "react-relay"
import {AddTaskMutation, DeleteTaskMutation, UpdateTaskMutation} from "../relay/mutations"
import {TasksQuery} from "../relay/queries"
import {useCallback} from 'react';
import RelayEnvironment from "../relay/RelayEnvironment"

export const useTaskHandlers = (queryReference) => {

    const {tasks} = usePreloadedQuery(TasksQuery, queryReference);
    const {id: userId} = JSON.parse(localStorage.getItem('user'));

    const [addTask] = useMutation(AddTaskMutation);
    const [deleteTask] = useMutation(DeleteTaskMutation);
    const [updateTask] = useMutation(UpdateTaskMutation);

    const handleCheckboxChange = useCallback((taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            updateTask({ variables: { taskId, done: !task.done, name: task.name } });
        }
    }, [updateTask, tasks]);

    const handleAddTask = useCallback(({newName}) => {
        if (newName) {
            addTask({
                variables: { name: newName, userId },
                onCompleted: (response) => {
                    loadQuery(RelayEnvironment, TasksQuery, {userId}, {fetchPolicy: 'store-and-network'});
                }
            });
        }
    }, [addTask, userId]);

    const handleDeleteTask = useCallback((taskId) => {
        deleteTask({
            variables: { taskId },
            onCompleted: () => {
                loadQuery(RelayEnvironment, TasksQuery, {userId}, {fetchPolicy: 'store-and-network'});
            }
        });
    }, [deleteTask, userId]);

    const handleEditTask = useCallback((taskId, newName, done) => {
        updateTask({ variables: { taskId, name: newName, done } });
    }, [updateTask]);

    return {
        handleCheckboxChange,
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
    }
}