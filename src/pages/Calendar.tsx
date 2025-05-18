import React from 'react';
import { mockTasks } from '../data/mockData';
import ComplianceCalendar from '../components/calendar/ComplianceCalendar';
import PageTitle from '../components/common/PageTitle';

const Calendar: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Apollo Compliance Calendar View" />
      <ComplianceCalendar tasks={mockTasks} />
    </div>
  );
};

export default Calendar;