import React from 'react';
import { mockTasks } from '../data/mockData';
import TaskList from '../components/tasks/TaskList';
import PageTitle from '../components/common/PageTitle';

const TaskManagement: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Manage Compliance Tasks" />
      <TaskList tasks={mockTasks} />
    </div>
  );
};

export default TaskManagement;