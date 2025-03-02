import React, { useState } from 'react';
import { User, Mail, Phone, Home, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

const Profile: React.FC = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    dateOfBirth: '1985-06-15'
  });

  // Mock emergency contact
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543'
  });

  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [editedEmergencyContact, setEditedEmergencyContact] = useState<EmergencyContact>({...emergencyContact});

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmergencyContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEmergencyContact = () => {
    // Validate
    if (!editedEmergencyContact.name || !editedEmergencyContact.phone) {
      toast.error('Name and phone number are required');
      return;
    }
    
    // Update emergency contact
    setEmergencyContact(editedEmergencyContact);
    setIsEditingEmergency(false);
    
    // Show success message
    toast.success('Emergency contact updated successfully');
  };

  const handleCancelEdit = () => {
    setEditedEmergencyContact({...emergencyContact});
    setIsEditingEmergency(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Your personal and contact details.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                Full Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userData.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                Email Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userData.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userData.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(userData.dateOfBirth).toLocaleDateString()}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Home className="h-4 w-4 mr-2 text-gray-400" />
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userData.address}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              To update your personal information, please contact our office directly.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Contact</h3>
            {!isEditingEmergency && (
              <button
                onClick={() => setIsEditingEmergency(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
            )}
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Contact information for emergencies.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {!isEditingEmergency ? (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{emergencyContact.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                <dd className="mt-1 text-sm text-gray-900">{emergencyContact.relationship}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{emergencyContact.phone}</dd>
              </div>
            </dl>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedEmergencyContact.name}
                  onChange={handleEmergencyContactChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  value={editedEmergencyContact.relationship}
                  onChange={handleEmergencyContactChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedEmergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmergencyContact}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;