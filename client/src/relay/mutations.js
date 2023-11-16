import graphql from "babel-plugin-relay/macro"

export const AddTaskMutation = graphql`
    mutation mutationsAddTaskMutation($name: String!, $userId: ID!) {
        createTask(name: $name, userId: $userId) {
            id
            name
            done
        }
    }
`;

export const DeleteTaskMutation = graphql`
    mutation mutationsDeleteTaskMutation($taskId: ID!) {
        deleteTask(id: $taskId)
    }
`;

export const UpdateTaskMutation = graphql`
    mutation mutationsUpdateTaskMutation($taskId: ID!, $name: String, $done: Boolean) {
        updateTask(id: $taskId, name: $name, done: $done) {
            id
            name
            done
        }
    }
`;