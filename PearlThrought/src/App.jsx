import React from 'react';
import RecurringDatePicker from './RecurringDatePicker';

const App = () => {
  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
  };

  return (
    <div className="p-10">
      <RecurringDatePicker onDateSelect={handleDateSelect} />
    </div>
  );
};

export default App;
