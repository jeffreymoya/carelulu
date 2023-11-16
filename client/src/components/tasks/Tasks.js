import React, { Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import { TasksQuery } from '../../relay/queries';
import Header from '../common/Header';
import TaskContainer from './TaskContainer';
import Footer from '../common/Footer';
import Loader from '../common/Loader'; // Import the Loader component

export const Tasks = () => {
    const [queryReference, loadQuery] = useQueryLoader(TasksQuery);
    const {id: userId} = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        loadQuery({userId});
    }, [loadQuery, userId]);

    if(queryReference === null) return <Loader />; // Use the Loader component

    return (
        <Suspense fallback={<Loader />}> {/* Use the Loader component */}
            <Header />
            <TaskContainer queryReference={queryReference} />
            <Footer />
        </Suspense>
    );
};

export default Tasks;