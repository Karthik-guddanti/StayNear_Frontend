import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const HostelListPage: React.FC = () => {
    // This hook allows us to easily get and set URL parameters
    const [searchParams] = useSearchParams();

    // State to hold the display message
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(() => {
        // Get the parameters from the URL
        const locationName = searchParams.get('location');
        const latitude = searchParams.get('lat');
        const longitude = searchParams.get('lon');

        if (locationName) {
            // If a location name was provided, use that
            setDisplayMessage(`Displaying hostels in ${locationName}...`);
            // TO-DO: Call your backend API to fetch hostels by location name
            console.log(`Searching for hostels in ${locationName}`);

        } else if (latitude && longitude) {
            // If coordinates were provided, use those
            setDisplayMessage(`Displaying hostels near your current location...`);
            // TO-DO: Call your backend API to fetch hostels by coordinates
            console.log(`Searching for hostels at Lat: ${latitude}, Lon: ${longitude}`);

        } else {
            // If no valid parameters are found, show an error message
            setDisplayMessage('No search location provided. Please go back and try again.');
        }

    }, [searchParams]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Hostel Listings</h1>
            <p>{displayMessage}</p>

            {/* TO-DO: This is where you'll render the list of hostels */}
        </div>
    );
};

export default HostelListPage;