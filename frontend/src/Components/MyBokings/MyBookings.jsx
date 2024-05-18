import axios from 'axios'
import html2pdf from 'html2pdf.js';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Mybookings() {

    const [mybookings, setMybookings] = useState([]);
    const { fullName } = useSelector(state => state.authReducer.userData || "");

    useEffect(() => {
        (async () => {
            const bookingres = await axios.get(`${import.meta.env.VITE_BASE_URI}/bookings/my-bookings`, { withCredentials: true })
            setMybookings(bookingres.data.data);
            console.log(bookingres.data.data);
        })()
    }, [])




    const handlePrint = (index) => {
        const printableContent = `
        <div style="margin: 0 auto; width: 25rem; padding: 1rem; border: 2px solid #000; border-radius: 10px; background-color: #21787333;">
            <h1 style="color: #217873; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 1rem;">Event crafter</h1>
            <h1 style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 0.5rem;">${mybookings[index].event.eventName}</h1>
            <h1 style="text-align: center; margin-bottom: 0.5rem;">${mybookings[index].event.category}</h1>
            <div style="display: flex; justify-content: space-between; text-align: center; margin-bottom: 0.5rem;">
                <p>${mybookings[index].event.eventDate}</p>
                <p>${mybookings[index].event.startTime}</p>
            </div>
            <p>Location: ${mybookings[index].event.location}</p>
            <div style="display: flex; justify-content: space-between;">
                <p style="color: #217873; font-size: 24px; font-weight: bold;">₹${mybookings[index].event.price}</p>
                <h3 style="font-weight: bold;">${fullName}</h3>
            </div>
        </div>`;

        const ele = document.createElement('div');
        ele.innerHTML = printableContent;

        // Create a new window to print the content
        const printWindow = window.open('', '_blank');
        printWindow.document.body.innerHTML = ele.innerHTML;

        // Add print-specific CSS to ensure background colors are printed
        const printStyles = `
            <style>
                @media print {
                    body * {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            </style>`;
        printWindow.document.head.innerHTML += printStyles;

        // Wait for the content to be rendered before printing
        printWindow.print();
    };





    return (
        <div className='flex gap-x-20 justify-center flex-wrap'>
            {
                mybookings.map((booking, index) => {
                    return (
                        <div key={booking._id} id={booking._id} className='my-5 border border-black rounded-lg bg-[#21787333] p-5 w-[25rem]'>

                            <h1 className='text-center text-[#217873] text-2xl font-semibold'>Event crafter</h1>
                            <h1 className='text-center  text-xl font-semibold'>{booking.event.eventName}</h1>
                            <h1 className='text-center '>{booking.event.category}</h1>
                            <div className='flex justify-between'>
                                <p>{booking.event.eventDate}</p>
                                <p>{booking.event.startTime}</p>

                            </div>
                            <p>Location : {booking.event.location}</p>
                            <div className='flex justify-between'>
                                <p className=' text-[#217873] text-2xl font-semibold'> ₹{booking.event.price}</p>
                                <h3 className='font-bold'>{fullName}</h3>
                            </div>
                            <div className='flex justify-between'>
                                <button className='bg-[#217873] text-white p-2 flex gap-2 items-center rounded-lg' onClick={async () => {
                                    const res=await axios.post(`${import.meta.env.VITE_BASE_URI}/bookings/delete-bookings`, { eventId: booking.event._id }, { withCredentials: true })
                                    console.log(res.data);
                                    setMybookings(mybookings.filter(book =>book._id != booking._id));
                                }}>Cancel Booking</button>
                                <button className='bg-[#217873] text-white p-2 flex gap-2 items-center rounded-lg' onClick={() => { handlePrint(index) }} >Print Ticket</button>

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Mybookings
