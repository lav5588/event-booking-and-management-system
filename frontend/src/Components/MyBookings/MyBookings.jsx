import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function MyBookings() {
    const [mybookings, setMybookings] = useState([]);
    const { fullName } = useSelector(state => state.authReducer.userData || "");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingres = await axios.get(`${import.meta.env.VITE_BASE_URI}/bookings/my-bookings`, { withCredentials: true });
                setMybookings(bookingres.data.data);
                console.log(bookingres.data.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handlePrint = (index) => {
        const booking = mybookings[index];
        const printableContent = `
            <div style="margin: 0 auto; width: 25rem; padding: 1rem; border: 2px solid #000; border-radius: 10px; background-color: #21787333;">
                <h1 style="color: #217873; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 1rem;">Event crafter</h1>
                <h1 style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 0.5rem;">${booking.event.eventName}</h1>
                <h1 style="text-align: center; margin-bottom: 0.5rem;">${booking.event.category}</h1>
                <div style="display: flex; justify-content: space-between; text-align: center; margin-bottom: 0.5rem;">
                    <p>${booking.event.eventDate}</p>
                    <p>${booking.event.startTime}</p>
                </div>
                <p>Location: ${booking.event.location}</p>
                <div style="display: flex; justify-content: space-between;">
                    <p style="color: #217873; font-size: 24px; font-weight: bold;">₹${booking.event.price}</p>
                    <h3 style="font-weight: bold;">${fullName}</h3>
                </div>
            </div>`;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printableContent);

        const printStyles = `
            <style>
                @media print {
                    body * {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            </style>`;
        printWindow.document.write(printStyles);

        printWindow.document.close();
        printWindow.print();
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/bookings/delete-bookings`, { eventId: bookingId }, { withCredentials: true });
            console.log(res.data);
            setMybookings(mybookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    return (
        <div className='flex gap-x-20 justify-center flex-wrap'>
            {mybookings.map((booking, index) => (
                <div key={booking._id} id={booking._id} className='my-5 border border-black rounded-lg bg-[#21787333] p-5 w-[25rem]'>
                    <h1 className='text-center text-[#217873] text-2xl font-semibold'>Event crafter</h1>
                    <h1 className='text-center  text-xl font-semibold'>{booking.event.eventName}</h1>
                    <h1 className='text-center '>{booking.event.category}</h1>
                    <div className='flex justify-between'>
                        <p>{booking.event.eventDate}</p>
                        <p>{booking.event.startTime}</p>
                    </div>
                    <p>Location: {booking.event.location}</p>
                    <div className='flex justify-between'>
                        <p className=' text-[#217873] text-2xl font-semibold'> ₹{booking.event.price}</p>
                        <h3 className='font-bold'>{fullName}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <button
                            className='bg-[#217873] text-white p-2 flex gap-2 items-center rounded-lg'
                            onClick={() => handleCancelBooking(booking._id)}
                        >
                            Cancel Booking
                        </button>
                        <button
                            className='bg-[#217873] text-white p-2 flex gap-2 items-center rounded-lg'
                            onClick={() => handlePrint(index)}
                        >
                            Print Ticket
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyBookings;
