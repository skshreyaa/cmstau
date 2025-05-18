import React from 'react';
import { useParams } from 'react-router-dom';
import { mockTasks } from '../data/mockData';
import TaskDetailComponent from '../components/tasks/TaskDetail';
import PageTitle from '../components/common/PageTitle';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const task = mockTasks.find(task => task.id === id);
  
  if (!task) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h2>
        <p className="text-gray-600">The task you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Apollo Compliance Record" />
      <TaskDetailComponent task={task} />
    </div>
  );
};

export default TaskDetail;