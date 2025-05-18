import React, { useState } from 'react';
import { ComplianceTask } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Upload, Download, Clock } from 'lucide-react';

interface TaskDetailProps {
  task: ComplianceTask;
  onStatusChange?: (id: string, status: 'Pending' | 'Completed' | 'Overdue') => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onStatusChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleStatusChange = (status: 'Pending' | 'Completed' | 'Overdue') => {
    if (onStatusChange) {
      onStatusChange(task.id, status);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Placeholder for document upload functionality
    console.log('Uploading:', selectedFile);
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Compliance Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="text-base">{task.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-base">{task.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Due Date</p>
                <p className="text-base">{formatDate(task.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Recurrence</p>
                <p className="text-base">{task.recurrence}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Assignment Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Assigned Officer</p>
                <p className="text-base">{task.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Status</p>
                <div className="mt-1">
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                    ${task.status === 'Pending' ? 'bg-[#FEF3C7] text-[#D97706]' : ''}
                    ${task.status === 'Completed' ? 'bg-[#D1FAE5] text-[#059669]' : ''}
                    ${task.status === 'Overdue' ? 'bg-[#FEE2E2] text-[#DC2626]' : ''}`
                  }>
                    {task.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status Actions</p>
                <div className="mt-2 flex space-x-2">
                  <button 
                    onClick={() => handleStatusChange('Completed')}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      task.status === 'Completed' 
                        ? 'bg-[#059669] text-white' 
                        : 'bg-white border border-[#059669] text-[#059669] hover:bg-[#D1FAE5]'
                    } transition-colors`}
                  >
                    Mark Complete
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Pending')}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      task.status === 'Pending' 
                        ? 'bg-[#D97706] text-white' 
                        : 'bg-white border border-[#D97706] text-[#D97706] hover:bg-[#FEF3C7]'
                    } transition-colors`}
                  >
                    Mark Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Document Management</h3>
          
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Upload className="h-5 w-5 text-gray-400 mr-2" />
              <h4 className="text-base font-medium">Upload Supporting Document</h4>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                id="fileUpload"
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#31A7BC] file:text-white hover:file:bg-[#2897ab] focus:outline-none"
                onChange={handleFileChange}
              />
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedFile 
                    ? 'bg-[#F8B817] text-white hover:bg-[#e6a915]' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                Upload
              </button>
            </div>
          </div>
          
          {task.documents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {task.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doc.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(doc.uploadDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#31A7BC] hover:text-[#2590a3] flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No documents uploaded yet</p>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Audit Trail</h3>
          
          <div className="space-y-4 pl-6 border-l-2 border-gray-200">
            {task.auditTrail.map((entry) => (
              <div key={entry.id} className="relative">
                <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-[#31A7BC] border-2 border-white"></div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(entry.date)} by {entry.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
        <button className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors">
          Back
        </button>
        <button className="px-4 py-2 bg-[#F8B817] text-white font-medium rounded hover:bg-[#e6a915] transition-colors">
          Reassign Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;