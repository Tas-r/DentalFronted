import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, BookOpen, Upload, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data
  const upcomingAppointment = {
    date: 'June 15, 2025',
    time: '10:00 AM',
    dentist: 'Dr. Sarah Johnson',
    type: 'Regular Checkup'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome back, {user?.name}</h2>
        <p className="text-gray-600">
          Welcome to your dental patient portal. Here you can manage your appointments, 
          view your dental records, and access educational resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-4 py-3">
            <h3 className="text-lg font-medium text-white">Next Appointment</h3>
          </div>
          <div className="p-4">
            {upcomingAppointment ? (
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium">{upcomingAppointment.date}</p>
                    <p className="text-sm text-gray-600">{upcomingAppointment.time}</p>
                  </div>
                </div>
                <p className="text-gray-700">{upcomingAppointment.type}</p>
                <p className="text-gray-700">With: {upcomingAppointment.dentist}</p>
                <div className="pt-2 flex space-x-2">
                  <Link
                    to="/appointments"
                    className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-xs font-medium rounded text-blue-600 bg-white hover:bg-blue-50"
                  >
                    Reschedule
                  </Link>
                  <Link
                    to="/appointments"
                    className="inline-flex items-center px-3 py-1.5 border border-red-600 text-xs font-medium rounded text-red-600 bg-white hover:bg-red-50"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No upcoming appointments</p>
                <Link
                  to="/book-appointment"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Treatment */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-green-600 px-4 py-3">
            <h3 className="text-lg font-medium text-white">Recent Treatment</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Dental Cleaning</p>
                  <p className="text-sm text-gray-600">May 10, 2025</p>
                </div>
              </div>
              <p className="text-gray-700">Regular cleaning and fluoride treatment</p>
              <div className="pt-2">
                <Link
                  to="/treatment-history"
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-green-600 bg-green-50 hover:bg-green-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-purple-600 px-4 py-3">
            <h3 className="text-lg font-medium text-white">Quick Actions</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <Link
                to="/book-appointment"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
              >
                <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">Book New Appointment</span>
              </Link>
              <Link
                to="/documents"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
              >
                <Upload className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">Upload Documents</span>
              </Link>
              <Link
                to="/dental-records"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">View Dental Records</span>
              </Link>
              <Link
                to="/education"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
              >
                <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">Educational Resources</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Remember to floss daily and brush twice a day for optimal dental health!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;