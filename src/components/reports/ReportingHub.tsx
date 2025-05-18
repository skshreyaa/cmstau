import React, { useState } from 'react';
import { DepartmentReport } from '../../types';
import { FileSpreadsheet, File as FilePdf, BarChartBig, PieChart } from 'lucide-react';

interface ReportingHubProps {
  reports: DepartmentReport[];
}

const ReportingHub: React.FC<ReportingHubProps> = ({ reports }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  const totalsByCategory = {
    total: reports.reduce((sum, report) => sum + report.total, 0),
    completed: reports.reduce((sum, report) => sum + report.completed, 0),
    overdue: reports.reduce((sum, report) => sum + report.overdue, 0),
    escalations: reports.reduce((sum, report) => sum + report.escalations, 0),
  };
  
  // Filter reports if department is selected
  const filteredReports = selectedDepartment === 'all' 
    ? reports 
    : reports.filter(report => report.name === selectedDepartment);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Compliance Reporting Hub</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Report Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {reports.map((report) => (
                  <option key={report.name} value={report.name}>
                    {report.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-4 py-2 bg-[#F8B817] text-white font-medium rounded hover:bg-[#e6a915] transition-colors">
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Compliance Status Summary</h3>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Export to Excel
              </button>
              <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50">
                <FilePdf className="h-4 w-4 mr-1" />
                Export to PDF
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Compliance Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliances Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overdue Compliances
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Escalations Recorded
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.completed} ({((report.completed / report.total) * 100).toFixed(0)}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.overdue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.escalations}
                    </td>
                  </tr>
                ))}
                
                {selectedDepartment === 'all' && (
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totalsByCategory.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totalsByCategory.completed} ({((totalsByCategory.completed / totalsByCategory.total) * 100).toFixed(0)}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totalsByCategory.overdue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totalsByCategory.escalations}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <PieChart className="h-5 w-5 text-[#31A7BC] mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Compliance Status</h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-[#31A7BC] relative">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-[#31A7BC]">
                    {selectedDepartment === 'all' 
                      ? ((totalsByCategory.completed / totalsByCategory.total) * 100).toFixed(0)
                      : ((filteredReports[0]?.completed / filteredReports[0]?.total) * 100).toFixed(0)
                    }%
                  </span>
                  <span className="text-sm text-gray-500">Completed</span>
                </div>
                {/* This is a placeholder for the actual chart */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 border-t-8 border-r-8 rounded-tr-full border-[#059669]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-8 border-r-8 rounded-br-full border-[#DC2626]"></div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#31A7BC] rounded-full mr-1"></div>
                <span className="text-sm">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#059669] rounded-full mr-1"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full mr-1"></div>
                <span className="text-sm">Overdue</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChartBig className="h-5 w-5 text-[#31A7BC] mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Department-wise Compliance</h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              {/* This is a placeholder for the actual chart */}
              <div className="w-full h-48 flex items-end justify-around px-4">
                {reports.slice(0, 5).map((report, index) => (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <div 
                      className="w-full bg-[#31A7BC]" 
                      style={{ height: `${(report.completed / report.total) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-2 truncate w-full">{report.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingHub;