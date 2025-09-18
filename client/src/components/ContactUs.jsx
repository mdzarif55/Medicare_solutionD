import React, { useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { FaFacebookSquare, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaInstagram } from 'react-icons/fa'


const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
    };

    return (
        <div className="mt-16 flex flex-col md:flex-row gap-10 p-6 bg-white">
            {/* Left Side: Contact Info */}
            <div className="flex flex-col w-full md:w-1/2">
                <p className='text-2xl font-medium uppercase'>Contact Us</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>

                <div className="mt-1 text-xl">

                    <div className="mt-16 text-xl">
                        {/* Email Icon and Text */}
                        <div className="flex items-center text-gray-800 mb-4">
                            <FaEnvelope className="mr-2 text-xl" /> {/* Email Icon */}
                            <p>Email: info@medicare.net</p>
                        </div>

                        {/* Phone Icon and Text */}
                        <div className="flex items-center text-gray-800 mb-4">
                            <FaPhoneAlt className="mr-2 text-xl" /> {/* Phone Icon */}
                            <p>Phone: +880 1797-146055</p>
                        </div>

                        {/* WhatsApp Icon and Text */}
                        <div className="flex items-center text-gray-800 mb-4">
                            <FaWhatsapp className="mr-2 text-xl" /> {/* WhatsApp Icon */}
                            <p>WhatsApp: +880 1797-146055</p>
                        </div>

                        <p className="mt-8 font-medium text-gray-800">Follow Us</p>
                        <div className="flex items-center mt-2 space-x-4 text-gray-800">
                            {/* Facebook Icon */}
                            <FaFacebookSquare className="text-xl" />
                            <a href="https://www.facebook.com/mdzarif55" target="_blank" rel="noopener noreferrer">
                                <p className='hover:text-blue-500 transition-colors'>Facebook</p>
                            </a>
                        </div>
                        <div className="flex items-center mt-2 space-x-4 text-gray-800">
                            {/* Facebook Icon */}
                            <FaInstagram className="text-xl" />
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <p className='hover:text-blue-500 transition-colors'>Instagram</p>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block border-l-2 border-gray-300 h-auto mx-6"></div>

            {/* Right Side: Contact Form */}
            <div className="flex flex-col w-full md:w-1/2">
                <h2 className="text-2xl font-medium">CONTACT US FOR ANY QUESTIONS</h2>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 text-white bg-primary rounded-md hover:bg-primary-dull"
                    >
                        ASK A QUESTION
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
