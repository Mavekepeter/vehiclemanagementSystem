import React, { useState } from 'react';
import { Minus, Plus, Trash, CalendarPlus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCartStore } from '../stores/useCartStore';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity, extendReservationPeriod } = useCartStore();

    // State for selecting a new end date
    const [newEndDate, setNewEndDate] = useState(new Date(item.reservation?.endDate || Date.now()));

    const handleExtendReservation = () => {
        if (newEndDate <= new Date(item.reservation?.endDate)) {
            return alert("New end date must be later than the current end date!");
        }
        extendReservationPeriod(item._id, newEndDate);
    };

    return (
        <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
            <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
                
                {/* Product Image */}
                <div className='shrink-0 md:order-1'>
                    <img className='h-20 md:h-32 rounded object-cover' src={item.image} alt="" />
                </div>

                {/* Quantity Controls */}
                <div className='flex items-center justify-between md:order-3 md:justify-end'>
                    <div className='flex items-center gap-2'>
                        <button
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                            border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
                            focus:ring-emerald-500'
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                            <Minus className='text-gray-300' />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                            border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                            focus:ring-2 focus:ring-emerald-500'
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                            <Plus className='text-gray-300' />
                        </button>
                    </div>
                </div>

                {/* Price */}
                <div className='text-end md:order-4 md:w-32'>
                    <p className='text-base font-bold text-emerald-400'>Ksh {item.price}</p>
                </div>

                {/* Product Details */}
                <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                    <p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
                        {item.name}
                    </p>
                    <p className='text-sm text-gray-400'>{item.description}</p>

                    {/* Reservation Dates */}
                    <p className='text-sm text-gray-300'>
                        BookingDate: {new Date(item.reservation?.startDate).toLocaleDateString()} - {new Date(item.reservation?.endDate).toLocaleDateString()}
                    </p>

                    {/* Extend Reservation Section */}
                    <div className="flex items-center gap-3">
                        <DatePicker
                            selected={newEndDate}
                            onChange={(date) => setNewEndDate(date)}
                            minDate={new Date(item.reservation?.endDate)}
                            className="w-32 p-1 rounded border bg-gray-800 text-white"
                        />
                        <button
                            className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                            onClick={handleExtendReservation}
                        >
                            <CalendarPlus size={16} />
                            Extend
                        </button>
                    </div>

                    {/* Remove Button */}
                    <div className='flex items-center gap-4'>
                        <button
                            className='inline-flex items-center text-sm font-medium text-red-400
                            hover:text-red-300 hover:underline'
                            onClick={() => removeFromCart(item._id)}
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
