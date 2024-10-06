import React from 'react';

 

const ResetButton = ({ resetAll }: { resetAll: () => void }) => {
    return (
        <button 
            className="fixed bottom-5 right-5 bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
                // Add your reset logic here
                resetAll();
                console.log('Reset button clicked');
            }}
        >
            reset
        </button>
    );
}

export default ResetButton;