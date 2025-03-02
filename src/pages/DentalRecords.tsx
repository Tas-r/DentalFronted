import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface DentalRecord {
  id: string;
  date: string;
  type: string;
  dentist: string;
  notes: string;
  attachments?: { name: string; url: string }[];
}

const DentalRecords: React.FC = () => {
  const records: DentalRecord[] = [
    {
      id: '1',
      date: 'May 10, 2025',
      type: 'Regular Checkup',
      dentist: 'Dr. Sarah Johnson',
      notes: "Patient's teeth are in good condition. Recommended regular flossing to maintain gum health.",
      attachments: [
        { name: 'X-Ray Results.pdf', url: '#' },
        { name: 'Treatment Plan.pdf', url: '#' }
      ]
    },
    {
      id: '2',
      date: 'February 15, 2025',
      type: 'Cavity Filling',
      dentist: 'Dr. Michael Chen',
      notes: 'Filled cavity on lower right molar. Patient tolerated procedure well. No complications.',
      attachments: [
        { name: 'Procedure Details.pdf', url: '#' }
      ]
    },
    {
      id: '3',
      date: 'November 5, 2024',
      type: 'Teeth Cleaning',
      dentist: 'Dr. Emily Rodriguez',
      notes: 'Routine cleaning performed. Slight plaque buildup on lower incisors. Advised patient on proper brushing techniques.',
    }
  ];

  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);

  const toggleRecord = (id: string) => {
    setExpandedRecords(prev =>
      prev.includes(id)
        ? prev.filter(recordId => recordId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Dental Records</h2>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id}>
              <div className="px-4 py-4 sm:px-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRecord(record.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">{record.type}</p>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                  </div>
                  <div>
                    {expandedRecords.includes(record.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedRecords.includes(record.id) && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Dentist</h4>
                      <p className="mt-1 text-sm text-gray-900">{record.dentist}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-1 text-sm text-gray-900">{record.notes}</p>
                    </div>

                    {record.attachments && record.attachments.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Attachments</h4>
                        <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                          {record.attachments.map((attachment, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a
                                  href={attachment.url}
                                  className="font-medium text-blue-600 hover:text-blue-500 flex items-center"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-500">
          This page displays your dental records. Click on a record to view more details. If you need a complete copy of your records, please contact our office.
        </p>
      </div>
    </div>
  );
};

export default DentalRecords;