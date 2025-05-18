import React from 'react';
import { mockDepartmentReports } from '../data/mockData';
import ReportingHub from '../components/reports/ReportingHub';
import PageTitle from '../components/common/PageTitle';

const Reports: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Apollo Compliance Reporting Hub" />
      <ReportingHub reports={mockDepartmentReports} />
    </div>
  );
};

export default Reports;