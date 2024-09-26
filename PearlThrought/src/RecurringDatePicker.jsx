import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const RecurringDatePicker = ({ onDateSelect }) => {
    const [startDate, setStartDate] = useState(null);
    const [recurrenceType, setRecurrenceType] = useState('none');
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = (date) => {
        setStartDate(date);
        onDateSelect(date);  // Pass the date to parent
    };

    const handleRecurrenceChange = (e) => {
        setRecurrenceType(e.target.value);
    };

    const handleCustomDateSelection = (date) => {
        if (!selectedDates.includes(format(date, 'yyyy-MM-dd'))) {
            setSelectedDates([...selectedDates, format(date, 'yyyy-MM-dd')]);
        }
    };

    return (
        <div className="p-6 bg-gray-400 shadow-md rounded-lg max-w-md mx-auto mt-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Date and Recurrence</h2>
            
            {/* Date Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <DatePicker 
                    selected={startDate} 
                    onChange={handleDateChange} 
                    dateFormat="yyyy/MM/dd"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholderText="Pick a date"
                />
            </div>
            
            {/* Recurrence Options */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence Type</label>
                <select 
                    value={recurrenceType} 
                    onChange={handleRecurrenceChange} 
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="none">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Custom Date Selection for "Custom" Recurrence */}
            {recurrenceType === 'custom' && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Multiple Custom Dates</label>
                    <DatePicker
                        selected={null}
                        onChange={handleCustomDateSelection}
                        dateFormat="yyyy/MM/dd"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholderText="Pick additional dates"
                    />
                    <div className="mt-4 space-y-1">
                        <p className="text-sm font-medium text-gray-700">Selected Dates:</p>
                        {selectedDates.length === 0 ? (
                            <p className="text-sm text-gray-500">No dates selected.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {selectedDates.map((date, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                                        {date}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Output recurring dates */}
            {startDate && recurrenceType !== 'none' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Recurring Dates:</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        {recurrenceType === 'daily' && `Every day starting from ${format(startDate, 'yyyy/MM/dd')}`}
                        {recurrenceType === 'weekly' && `Every week on ${format(startDate, 'EEEE')}`}
                        {recurrenceType === 'monthly' && `Every month on the ${format(startDate, 'do')} day`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecurringDatePicker;
