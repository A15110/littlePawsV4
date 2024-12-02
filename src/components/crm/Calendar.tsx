import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  client_name: string;
  pet_type: string;
  service_type: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchMonthBookings(currentDate);
  }, [currentDate]);

  async function fetchMonthBookings(date: Date) {
    try {
      setLoading(true);
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .gte('start_date', start.toISOString())
        .lte('end_date', end.toISOString())
        .not('status', 'eq', 'cancelled');

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      return date >= start && date <= end;
    });
  };

  const isDateAvailable = (date: Date) => {
    const dateBookings = getBookingsForDate(date);
    return dateBookings.length < 2; // Maximum capacity of 2 concurrent bookings
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(prev => addMonths(prev, -1))}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
          
          {days.map((day, dayIdx) => {
            const dateBookings = getBookingsForDate(day);
            const isAvailable = isDateAvailable(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <div
                key={day.toString()}
                className={`
                  relative p-2 border hover:bg-gray-50 transition-colors
                  ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : ''}
                  ${isToday(day) ? 'border-primary-500' : 'border-gray-200'}
                  ${isSelected ? 'bg-primary-50' : ''}
                `}
                onClick={() => setSelectedDate(day)}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={`block text-sm ${
                    isToday(day) ? 'font-semibold text-primary-600' : 'text-gray-900'
                  }`}
                >
                  {format(day, 'd')}
                </time>
                
                {dateBookings.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {dateBookings.map(booking => (
                      <div
                        key={booking.id}
                        className="text-xs px-1 py-0.5 rounded bg-primary-100 text-primary-700 truncate"
                      >
                        {booking.client_name}
                      </div>
                    ))}
                  </div>
                )}

                {/* Availability indicator */}
                <div
                  className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
                    isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          {getBookingsForDate(selectedDate).map(booking => (
            <div
              key={booking.id}
              className="bg-gray-50 rounded-lg p-3 mb-2 last:mb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{booking.client_name}</p>
                  <p className="text-sm text-gray-500">
                    {booking.service_type} - {booking.pet_type}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {format(new Date(booking.start_date), 'h:mm a')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}