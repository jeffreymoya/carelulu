import graphql from "babel-plugin-relay/macro"

export const TasksQuery = graphql`
    query queriesComponentTasksQuery($userId: ID) {
        tasks(userId: $userId) {
            id
            name
            done
        }
    }
`;