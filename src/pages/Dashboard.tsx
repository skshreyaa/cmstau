import React from 'react';
import { FileText, CheckCircle, Clock, AlertTriangle, BellRing } from 'lucide-react';
import { mockTasks } from '../data/mockData';
import StatisticCard from '../components/dashboard/StatisticCard';
import DeadlinesTable from '../components/dashboard/DeadlinesTable';
import Notifications from '../components/dashboard/Notifications';
import PageTitle from '../components/common/PageTitle';

const Dashboard: React.FC = () => {
  // Calculate stats
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = mockTasks.filter(task => task.status === 'Pending').length;
  const overdueTasks = mockTasks.filter(task => task.status === 'Overdue').length;
  const escalatedTasks = 2; // Example value
  
  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Apollo Compliance Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatisticCard 
          title="Total Compliance Records" 
          value={totalTasks} 
          icon={<FileText className="h-6 w-6 text-[#31A7BC]" />}
        />
        <StatisticCard 
          title="Compliances Completed" 
          value={completedTasks} 
          icon={<CheckCircle className="h-6 w-6 text-[#059669]" />}
        />
        <StatisticCard 
          title="Pending Compliances" 
          value={pendingTasks} 
          icon={<Clock className="h-6 w-6 text-[#F8B817]" />}
        />
        <StatisticCard 
          title="Overdue Compliances" 
          value={overdueTasks} 
          icon={<AlertTriangle className="h-6 w-6 text-[#DC2626]" />}
        />
        <StatisticCard 
          title="Escalations Triggered" 
          value={escalatedTasks} 
          icon={<BellRing className="h-6 w-6 text-[#EF4444]" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeadlinesTable tasks={mockTasks} />
        </div>
        <div>
          <Notifications tasks={mockTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;