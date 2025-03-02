import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format, addDays, isWeekend } from 'date-fns';

interface AppointmentType {
  id: string;
  name: string;
  duration: string;
}

interface Dentist {
  id: string;
  name: string;
  specialty: string;
}

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rescheduleId = queryParams.get('reschedule');

  // Mock data
  const appointmentTypes: AppointmentType[] = [
    { id: '1', name: 'Regular Checkup', duration: '30 min' },
    { id: '2', name: 'Teeth Cleaning', duration: '45 min' },
    { id: '3', name: 'Dental Filling', duration: '60 min' },
    { id: '4', name: 'Root Canal', duration: '90 min' },
    { id: '5', name: 'Tooth Extraction', duration: '60 min' }
  ];

  const dentists: Dentist[] = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatric Dentistry' },
    { id: '4', name: 'Dr. James Wilson', specialty: 'Endodontics' }
  ];

  // Generate available dates (next 14 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    
    while (dates.length < 10) {
      currentDate = addDays(currentDate, 1);
      if (!isWeekend(currentDate)) {
        dates.push(format(currentDate, 'yyyy-MM-dd'));
      }
    }
    
    return dates;
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    
    return slots;
  };

  const [appointmentType, setAppointmentType] = useState('');
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [availableDates] = useState(generateAvailableDates());
  const [availableTimes] = useState(generateTimeSlots());
  const [isRescheduling, setIsRescheduling] = useState(false);

  useEffect(() => {
    if (rescheduleId) {
      setIsRescheduling(true);
      // In a real app, you would fetch the appointment details
      // For now, we'll just pre-fill with mock data
      setAppointmentType('1');
      setSelectedDentist('1');
      setSelectedDate(availableDates[0]);
      setSelectedTime(availableTimes[2]);
      setReason('Need to reschedule due to conflict');
    }
  }, [rescheduleId, availableDates, availableTimes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!appointmentType || !selectedDentist || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would send this data to your backend
    const appointmentData = {
      type: appointmentTypes.find(type => type.id === appointmentType)?.name,
      dentist: dentists.find(dentist => dentist.id === selectedDentist)?.name,
      date: selectedDate,
      time: selectedTime,
      reason
    };
    
    console.log('Appointment data:', appointmentData);
    
    // Show success message and redirect
    if (isRescheduling) {
      toast.success('Appointment rescheduled successfully!');
    } else {
      toast.success('Appointment booked successfully!');
    }
    
    navigate('/appointments');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isRescheduling ? 'Reschedule Appointment' : 'Book New Appointment'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700">
                Appointment Type *
              </label>
              <select
                id="appointmentType"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select type</option>
                {appointmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.duration})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dentist" className="block text-sm font-medium text-gray-700">
                Dentist *
              </label>
              <select
                id="dentist"
                value={selectedDentist}
                onChange={(e) => setSelectedDentist(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select dentist</option>
                {dentists.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {dentist.name} ({dentist.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select date</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time *
              </label>
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Visit
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Please describe the reason for your visit"
            ></textarea>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Please arrive 15 minutes before your scheduled appointment time. If you need to cancel, please do so at least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isRescheduling ? 'Reschedule Appointment' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;