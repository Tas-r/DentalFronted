import React, { useState } from 'react';
import { FileText, Calendar, User, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface Treatment {
  id: string;
  date: string;
  procedure: string;
  dentist: string;
  description: string;
  followUp?: string;
  careInstructions?: string[];
}

const TreatmentHistory: React.FC = () => {
  // Mock data
  const treatments: Treatment[] = [
    {
      id: '1',
      date: 'May 10, 2025',
      procedure: 'Dental Cleaning',
      dentist: 'Dr. Sarah Johnson',
      description: 'Regular cleaning and fluoride treatment',
      careInstructions: [
        'Avoid eating or drinking for 30 minutes after fluoride treatment',
        'Continue regular brushing and flossing',
        'Use fluoride toothpaste'
      ]
    },
    {
      id: '2',
      date: 'February 15, 2025',
      procedure: 'Cavity Filling',
      dentist: 'Dr. Michael Chen',
      description: 'Composite filling on lower right molar (tooth #30)',
      followUp: 'No immediate follow-up needed. Regular checkup in 6 months.',
      careInstructions: [
        'Avoid chewing on the filled tooth for 24 hours',
        'If you experience pain lasting more than 24 hours, contact our office',
        'Avoid very hot or cold foods for the first few days'
      ]
    },
    {
      id: '3',
      date: 'November 5, 2024',
      procedure: 'Root Canal',
      dentist: 'Dr. James Wilson',
      description: 'Root canal treatment on upper left premolar (tooth #12)',
      followUp: 'Return in 2 weeks for crown placement',
      careInstructions: [
        'Take prescribed antibiotics as directed',
        'Use over-the-counter pain medication as needed',
        'Avoid chewing on the treated tooth until the permanent crown is placed',
        'Call our office if you experience severe pain or swelling'
      ]
    }
  ];

  const [expandedTreatments, setExpandedTreatments] = useState<string[]>([]);

  const toggleTreatment = (id: string) => {
    setExpandedTreatments(prev => 
      prev.includes(id) 
        ? prev.filter(treatmentId => treatmentId !== id) 
        : [...prev, id]
    );
  };

  // Calculate summary statistics
  const totalProcedures = treatments.length;
  const lastTreatmentDate = treatments.length > 0 ? treatments[0].date : 'None';
  const procedureTypes = [...new Set(treatments.map(t => t.procedure))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Treatment History</h2>
      </div>

      {/* Summary Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Total Procedures</p>
            <p className="text-2xl font-bold text-blue-600">{totalProcedures}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Last Treatment</p>
            <p className="text-lg font-bold text-green-600">{lastTreatmentDate}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Procedure Types</p>
            <p className="text-lg font-bold text-purple-600">{procedureTypes.length}</p>
          </div>
        </div>
      </div>

      {/* Treatment List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {treatments.map((treatment) => (
            <li key={treatment.id}>
              <div className="px-4 py-4 sm:px-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTreatment(treatment.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">{treatment.procedure}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{treatment.date}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {expandedTreatments.includes(treatment.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedTreatments.includes(treatment.id) && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Dentist</h4>
                      <div className="flex items-center mt-1">
                        <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{treatment.dentist}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1 text-sm text-gray-900">{treatment.description}</p>
                    </div>
                    
                    {treatment.followUp && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Follow-up</h4>
                        <p className="mt-1 text-sm text-gray-900">{treatment.followUp}</p>
                      </div>
                    )}
                    
                    {treatment.careInstructions && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Care Instructions</h4>
                        <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertCircle className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                              <ul className="list-disc pl-5 space-y-1">
                                {treatment.careInstructions.map((instruction, index) => (
                                  <li key={index} className="text-sm text-yellow-700">{instruction}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TreatmentHistory;