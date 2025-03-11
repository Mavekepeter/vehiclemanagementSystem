import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    // State for date selection
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to book a vehicle", { id: "login" });
            return;
        }
        if (!startDate || !endDate) {
            toast.error("Please select a booking period!", { id: "date-missing" });
            return;
        }
        
        // Adding selected reservation period to the cart
        addToCart({ ...product, reservation: { startDate, endDate } });
    };

    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
            {/* Product Image */}
            <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
                <img className='object-cover w-full' src={product.image} alt='product' />
                <div className='absolute inset-0 bg-black bg-opacity-20' />
            </div>

            {/* Product Details */}
            <div className='mt-4 px-5 pb-5'>
                <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
                <p className='text-3xl font-bold text-emerald-400'>Ksh {product.price}</p>

                {/* Date Picker */}
                <div className="mt-3">
                    <label className="text-white block">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        className="w-full mt-1 p-2 rounded border bg-gray-800 text-white"
                    />
                </div>
                <div className="mt-3">
                    <label className="text-white block">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="w-full mt-1 p-2 rounded border bg-gray-800 text-white"
                    />
                </div>

                {/* Reserve Button */}
                <button
                    className='mt-4 flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium
                     text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 w-full'
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={22} className='mr-2' />
                    Booking
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
