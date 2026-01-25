import React, { useEffect } from 'react';

export default function HowToSearchModal({ isOpen, onClose }) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'; // or 'auto'
        }

        // Cleanup on unmount or when modal closes
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity">
            {/* Backdrop click to close - MOVED BEHIND MODAL */}
            <div className="absolute inset-0 z-0" onClick={onClose}></div>

            {/* Modal Content - Added z-50 to ensure it sits on top */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-popupCard relative z-50">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-blue-600 text-2xl">💡</span> How to Search Correctly
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-700 font-bold text-xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <p className="text-gray-600">
                        To find the best eligible courses for you, please ensure you select the correct combination of <strong>Category</strong>, <strong>Class 12 Subjects</strong>, and <strong>Interested Subjects</strong>.
                    </p>

                    {/* Example Grid */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Engineering */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h3 className="font-bold text-blue-900 mb-2">Engineering (B.Tech)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Engineering</li>
                                <li><strong>Class 12:</strong> Physics, Chemistry, Mathematics</li>
                                <li><strong>Interested:</strong> Computer Science, Mechanical Engineering, Electronics</li>
                            </ul>
                        </div>

                        {/* Medical */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h3 className="font-bold text-green-900 mb-2">Medical (MBBS/BDS)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Medical</li>
                                <li><strong>Class 12:</strong> Physics, Chemistry, Biology</li>
                                <li><strong>Interested:</strong> Medicine, Dentistry, Nursing</li>
                            </ul>
                        </div>

                        {/* Commerce */}
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                            <h3 className="font-bold text-purple-900 mb-2">Commerce (B.Com/Finance)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Commerce</li>
                                <li><strong>Class 12:</strong> Accountancy, Business Studies, Economics</li>
                                <li><strong>Interested:</strong> Commerce, Finance, Management</li>
                            </ul>
                        </div>

                        {/* Arts/Humanities */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <h3 className="font-bold text-orange-900 mb-2">Arts & Humanities (BA)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Arts</li>
                                <li><strong>Class 12:</strong> History, Political Science, English, Sociology</li>
                                <li><strong>Interested:</strong> History, Political Science, Psychology</li>
                            </ul>
                        </div>

                        {/* Law */}
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <h3 className="font-bold text-red-900 mb-2">Law (BA LLB)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Law</li>
                                <li><strong>Class 12:</strong> Any Stream (e.g., Pol Science, English, Legal Studies)</li>
                                <li><strong>Interested:</strong> Law, Legal Studies</li>
                            </ul>
                        </div>

                        {/* Management */}
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                            <h3 className="font-bold text-indigo-900 mb-2">Management (BBA)</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Category:</strong> Management</li>
                                <li><strong>Class 12:</strong> Any Stream (Maths preferred for some)</li>
                                <li><strong>Interested:</strong> Business Administration, Management</li>
                            </ul>
                        </div>

                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">💡 Pro Tip</h4>
                        <p className="text-sm text-gray-600">
                            Check <strong>"Open to colleges outside my state"</strong> to see deeper opportunities from central universities like DU, BHU, and others across India.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end z-10 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
}
