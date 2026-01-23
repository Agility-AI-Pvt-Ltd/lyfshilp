import { useState, useEffect } from "react";
import api from "../api/axios.js";

// Indian states list
const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
];

// Complete Class 12 subjects (42 subjects - extracted from eligibility data)
const CLASS_12_SUBJECTS = [
    // Core Subjects
    "Accountancy", "Biology", "Business Studies", "Chemistry", "Computer Science",
    "Economics", "English", "Fine Arts", "Geography", "Hindi", "History",
    "Home Science", "Mathematics", "Physical Education", "Physics",
    "Political Science", "Psychology", "Sanskrit", "Sociology",

    // Indian Languages
    "Assamese", "Bengali", "Gujarati", "Kannada", "Malayalam", "Marathi",
    "Odia", "Punjabi", "Tamil", "Telugu", "Urdu",

    // Additional Subjects
    "Agriculture", "Anthropology", "Commerce", "Engineering Graphics",
    "Entrepreneurship", "Environmental Science", "Finance",
    "Knowledge Tradition", "Legal Studies", "Mass Media", "Teaching Aptitude"
].sort();

// Interested subjects (expanded to cover all domains)
const INTERESTED_SUBJECTS = [
    // Core Academic
    "Anthropology", "Biology", "Chemistry", "Computer Science", "Economics",
    "Geography", "History", "Mathematics", "Physics", "Political Science",
    "Psychology", "Sociology",

    // Professional/Applied
    "Agriculture", "Architecture", "Business Administration", "Commerce",
    "Design", "Engineering", "Environmental Science", "Finance", "Law",
    "Management", "Mass Communication", "Medicine", "Teaching",

    // Arts & Communication
    "Fine Arts", "Journalism", "Languages",

    // Other Domains
    "Home Science", "Physical Education", "Social Work"
].sort();

// Course categories (discovered from eligibility matrices)
const COURSE_CATEGORIES = [
    "Arts",
    "Certificate",
    "Commerce",
    "Design",
    "Diploma",
    "Education",
    "Engineering",
    "Journalism",
    "Law",
    "Management",
    "Medical",
    "Science",
    "Vocational"
].sort();

export default function CareerGuidanceWidget() {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        state: "",
        preferredCategory: "",
        class12Subjects: [],
        interestedSubjects: [],
        openToOutsideState: false,
    });

    // OTP state
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [sessionToken, setSessionToken] = useState(null); // Session token
    const [devOtp, setDevOtp] = useState(""); // For development testing

    // UI state
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationMeta, setPaginationMeta] = useState({
        totalPages: 1,
        totalEligibleCourses: 0,
        hasNextPage: false,
        hasPreviousPage: false
    });
    const pageSize = 10;

    // Tab state for Home/Other results
    const [activeTab, setActiveTab] = useState('home'); // 'home' or 'other'

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Dropdown states
    const [showClass12Dropdown, setShowClass12Dropdown] = useState(false);
    const [showInterestedDropdown, setShowInterestedDropdown] = useState(false);

    // PERSISTENCE: Check for existing session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('otpSessionToken');
        const tokenTime = localStorage.getItem('otpSessionTime');

        if (storedToken && tokenTime) {
            const now = new Date().getTime();
            const timePassed = now - parseInt(tokenTime);

            // Check if within 1 hour (3600000 ms)
            if (timePassed < 3600000) {
                setSessionToken(storedToken);
                setOtpVerified(true);
                // Ideally, we might want to store phone to pre-fill, but for now we just mark verified.
                // If phone is needed for display, we'd need to store that too.
                const storedPhone = localStorage.getItem('otpPhone');
                if (storedPhone) {
                    setFormData(prev => ({ ...prev, phone: storedPhone }));
                }
            } else {
                // Expired
                localStorage.removeItem('otpSessionToken');
                localStorage.removeItem('otpSessionTime');
                localStorage.removeItem('otpPhone');
            }
        }
    }, []);

    // Debounce search query (Phase 5)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch results when debounced search changes
    useEffect(() => {
        if (showResults && results) {
            setCurrentPage(1); // Reset to page 1 on search
            // Re-fetch with new search query
            const fetchWithSearch = async () => {
                try {
                    setLoading(true);
                    const response = await api.post("/career-guidance/eligible-courses", {
                        phone: formData.phone || "0000000000",
                        state: formData.state,
                        preferredCategory: formData.preferredCategory,
                        class12Subjects: formData.class12Subjects,
                        interestedSubjects: formData.interestedSubjects,
                        openToOutsideState: formData.openToOutsideState,
                        searchQuery: debouncedSearch,
                        page: 1,
                        pageSize: pageSize,
                        tab: activeTab
                    });

                    if (response.data.success) {
                        setResults(response.data.data);
                        setPaginationMeta({
                            totalPages: response.data.data.pagination.totalPages,
                            totalEligibleCourses: response.data.data.pagination.totalEligibleCourses,
                            hasNextPage: response.data.data.pagination.hasNextPage,
                            hasPreviousPage: response.data.data.pagination.hasPreviousPage
                        });
                    }
                } catch (error) {
                    console.error("Error searching:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchWithSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Toggle subject selection
    const toggleSubject = (subject, field) => {
        setFormData(prev => {
            const currentList = prev[field];
            const newList = currentList.includes(subject)
                ? currentList.filter(s => s !== subject)
                : [...currentList, subject];
            return { ...prev, [field]: newList };
        });
    };

    // Send OTP
    const handleSendOtp = async () => {
        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            setMessage({ type: "error", text: "Please enter a valid 10-digit phone number" });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            const response = await api.post("/career-guidance/send-otp", {
                phone: formData.phone
            });

            if (response.data.success) {
                setOtpSent(true);
                setMessage({ type: "success", text: "OTP sent successfully!" });

                // For development, show OTP
                if (response.data.devOtp) {
                    setDevOtp(response.data.devOtp);
                    setMessage({ type: "success", text: `OTP sent! (Dev: ${response.data.devOtp})` });
                }
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to send OTP" });
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setMessage({ type: "error", text: "Please enter a valid 6-digit OTP" });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            const response = await api.post("/career-guidance/verify-otp", {
                phone: formData.phone,
                otp: otp
            });

            if (response.data.success) {
                setOtpVerified(true);
                setSessionToken(response.data.token); // Store token

                // PERSISTENCE: Save to localStorage
                localStorage.setItem('otpSessionToken', response.data.token);
                localStorage.setItem('otpSessionTime', new Date().getTime().toString());
                localStorage.setItem('otpPhone', formData.phone);

                setMessage({ type: "success", text: "Phone verified successfully!" });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage({ type: "error", text: error.response?.data?.message || "Invalid OTP" });
        } finally {
            setLoading(false);
        }
    };

    // Submit form and get eligible courses
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.state || !formData.preferredCategory) {
            setMessage({ type: "error", text: "Please fill all required fields" });
            return;
        }

        if (!otpVerified || !sessionToken) {
            setMessage({ type: "error", text: "Please verify your phone number first" });
            return;
        }

        if (formData.class12Subjects.length === 0) {
            setMessage({ type: "error", text: "Please select at least one Class 12 subject" });
            return;
        }

        if (formData.interestedSubjects.length === 0) {
            setMessage({ type: "error", text: "Please select at least one interested subject" });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });


            const response = await api.post("/career-guidance/eligible-courses", {
                // Phone is now inferred from token on backend, but we keep structure if needed.
                // However, updated backend relies on token.
                state: formData.state,
                preferredCategory: formData.preferredCategory,
                class12Subjects: formData.class12Subjects,
                interestedSubjects: formData.interestedSubjects,
                openToOutsideState: formData.openToOutsideState,
                searchQuery: '',
                page: currentPage,
                pageSize: pageSize,
                tab: activeTab
            }, {
                headers: {
                    'x-otp-session-token': sessionToken
                }
            });


            if (response.data.success) {
                setResults(response.data.data);
                setShowResults(true);
                setPaginationMeta({
                    totalPages: response.data.data.pagination.totalPages,
                    totalEligibleCourses: response.data.data.pagination.totalEligibleCourses,
                    hasNextPage: response.data.data.pagination.hasNextPage,
                    hasPreviousPage: response.data.data.pagination.hasPreviousPage
                });
                setMessage({
                    type: "success",
                    text: `Found ${response.data.data.pagination.totalEligibleCourses} eligible courses!`
                });
            }
        } catch (error) {
            console.error("Error getting eligible courses:", error);
            if (error.response && error.response.status === 401) {
                setMessage({ type: "error", text: "Session expired. Please verify phone again." });
                setOtpVerified(false);
                setSessionToken(null);
                setOtpSent(false);
                setShowResults(false);

                // PERSISTENCE: Clear storage
                localStorage.removeItem('otpSessionToken');
                localStorage.removeItem('otpSessionTime');
                localStorage.removeItem('otpPhone');
            } else {
                setMessage({ type: "error", text: error.response?.data?.message || "Failed to calculate eligibility" });
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle tab switch
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset pagination when switching tabs
        // Trigger immediate fetch for the new tab
        fetchResults(1, debouncedSearch, tab);
    };

    // Fetch results helper function
    const fetchResults = async (page, search = '', tab = activeTab) => {
        try {
            setLoading(true);
            const response = await api.post("/career-guidance/eligible-courses", {
                state: formData.state,
                preferredCategory: formData.preferredCategory,
                class12Subjects: formData.class12Subjects,
                interestedSubjects: formData.interestedSubjects,
                openToOutsideState: formData.openToOutsideState,
                searchQuery: search,
                page: page,
                pageSize: pageSize,
                tab: tab
            }, {
                headers: {
                    'x-otp-session-token': sessionToken
                }
            });

            if (response.data.success) {
                setResults(response.data.data);
                setPaginationMeta({
                    totalPages: response.data.data.pagination.totalPages,
                    totalEligibleCourses: response.data.data.pagination.totalEligibleCourses,
                    hasNextPage: response.data.data.pagination.hasNextPage,
                    hasPreviousPage: response.data.data.pagination.hasPreviousPage
                });
            }
        } catch (error) {
            console.error("Error fetching results:", error);
            setMessage({ type: "error", text: "Failed to load results" });
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchResults(page, debouncedSearch);
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            name: "",
            phone: "",
            state: "",
            preferredCategory: "",
            class12Subjects: [],
            interestedSubjects: [],
            openToOutsideState: false,
        });
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setSessionToken(null);
        setDevOtp("");
        setShowResults(false);
        setResults(null);
        setCurrentPage(1);
        setPaginationMeta({
            totalPages: 1,
            totalEligibleCourses: 0,
            hasNextPage: false,
            hasPreviousPage: false
        });
        setActiveTab('home');
        setSearchQuery('');
        setDebouncedSearch('');
        setMessage({ type: "", text: "" });
    };

    return (
        <div className="w-full">
            {!showResults ? (
                // FORM VIEW
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Phone + OTP */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number * {otpVerified && <span className="text-green-600">✓ Verified</span>}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                                required
                                disabled={otpVerified}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition disabled:bg-gray-100"
                                placeholder="10-digit mobile number"
                            />
                            {!otpVerified && (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={loading || otpSent}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:bg-gray-400"
                                >
                                    {otpSent ? "Sent" : "Send OTP"}
                                </button>
                            )}
                        </div>

                        {/* OTP Input */}
                        {otpSent && !otpVerified && (
                            <div className="mt-3 flex gap-2">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    maxLength={6}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                    placeholder="Enter 6-digit OTP"
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition disabled:bg-gray-400"
                                >
                                    Verify
                                </button>
                            </div>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your State *
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        >
                            <option value="">Select your state</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>


                    {/* Preferred Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Category *
                            <span className="block text-xs font-normal text-gray-500 mt-1">
                                Select your primary career direction
                            </span>
                        </label>
                        <select
                            name="preferredCategory"
                            value={formData.preferredCategory}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        >
                            <option value="">Select a category</option>
                            {COURSE_CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Class 12 Subjects */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Class 12 Subjects * ({formData.class12Subjects.length} selected)
                            <span className="block text-xs font-normal text-gray-500 mt-1">
                                Select all subjects you studied in Class 12
                            </span>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowClass12Dropdown(!showClass12Dropdown)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-left focus:border-blue-500 focus:outline-none transition"
                            >
                                {formData.class12Subjects.length > 0
                                    ? formData.class12Subjects.join(", ")
                                    : "Select Class 12 subjects"}
                            </button>

                            {showClass12Dropdown && (
                                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                    {CLASS_12_SUBJECTS.map(subject => (
                                        <label
                                            key={subject}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.class12Subjects.includes(subject)}
                                                onChange={() => toggleSubject(subject, "class12Subjects")}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-gray-700">{subject}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Interested Subjects */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Interested Subjects/Courses * ({formData.interestedSubjects.length} selected)
                            <span className="block text-xs font-normal text-gray-500 mt-1">
                                Select subjects you are interested in pursuing
                            </span>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowInterestedDropdown(!showInterestedDropdown)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-left focus:border-blue-500 focus:outline-none transition"
                            >
                                {formData.interestedSubjects.length > 0
                                    ? formData.interestedSubjects.join(", ")
                                    : "Select interested subjects"}
                            </button>

                            {showInterestedDropdown && (
                                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                    {INTERESTED_SUBJECTS.map(subject => (
                                        <label
                                            key={subject}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.interestedSubjects.includes(subject)}
                                                onChange={() => toggleSubject(subject, "interestedSubjects")}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-gray-700">{subject}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Outside State Checkbox */}
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="openToOutsideState"
                                checked={formData.openToOutsideState}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            <span className="text-gray-700 font-medium">
                                Open to colleges outside my state
                            </span>
                        </label>
                    </div>

                    {/* Message */}
                    {message.text && (
                        <div
                            className={`p-4 rounded-xl font-semibold ${message.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Calculating..." : "Find My Eligible Courses"}
                    </button>
                </form>
            ) : (
                // RESULTS VIEW
                <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                        <h4 className="text-2xl font-black text-gray-900 mb-2">
                            Your Eligible Courses
                        </h4>
                        <p className="text-gray-700">
                            Found <span className="font-bold text-blue-600">{paginationMeta.totalEligibleCourses}</span> eligible courses
                            {results.pagination.homeStateCourses > 0 && (
                                <span> ({results.pagination.homeStateCourses} in {formData.state})</span>
                            )}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search course or university..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        />
                        {searchQuery && (
                            <p className="text-sm text-gray-600 mt-2">
                                Showing page {currentPage} of {paginationMeta.totalPages} (Total {paginationMeta.totalEligibleCourses} results)
                            </p>
                        )}
                    </div>

                    {/* Tab Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleTabSwitch('home')}
                            className={`flex-1 py-3 px-6 rounded-xl font-bold transition ${activeTab === 'home'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Home State ({results.pagination.homeStateCourses})
                        </button>
                        <button
                            onClick={() => handleTabSwitch('other')}
                            disabled={!formData.openToOutsideState}
                            className={`flex-1 py-3 px-6 rounded-xl font-bold transition ${activeTab === 'other'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Other States ({results.pagination.otherStateCourses})
                        </button>
                    </div>

                    {/* Home State Results */}
                    {activeTab === 'home' && (
                        <>
                            {results.homeStateResults.length > 0 ? (
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Your State</span>
                                        Colleges in {formData.state}
                                    </h4>
                                    <div className="grid gap-4">
                                        {results.homeStateResults.map((result, index) => (
                                            <div
                                                key={index}
                                                className="border-2 border-green-300 bg-green-50 rounded-2xl p-6 transition hover:shadow-lg"
                                            >
                                                {/* University Name */}
                                                <h5 className="text-lg font-bold text-gray-900 mb-1">
                                                    {result.university.name}
                                                </h5>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {result.university.state} • {result.university.type}
                                                </p>

                                                {/* Course Name */}
                                                <div className="mb-3">
                                                    <p className="text-xl font-semibold text-gray-900">
                                                        {result.course.name}
                                                    </p>
                                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                        {result.course.category.charAt(0).toUpperCase() + result.course.category.slice(1)}
                                                    </span>
                                                </div>

                                                {/* Eligibility Highlight */}
                                                <div className="bg-white rounded-xl p-3 mb-3">
                                                    <p className="text-sm text-gray-700">
                                                        <span className="text-green-600 font-bold">✓</span> {result.reason}
                                                    </p>
                                                </div>

                                                {/* Special Conditions */}
                                                {result.specialConditions && result.specialConditions.length > 0 && (
                                                    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
                                                        <p className="font-semibold text-yellow-900 text-sm mb-1">
                                                            Important Notes:
                                                        </p>
                                                        <ul className="list-disc list-inside text-sm text-yellow-800">
                                                            {result.specialConditions.map((condition, i) => (
                                                                <li key={i}>{condition}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                    <p className="text-lg font-semibold text-gray-700 mb-2">
                                        No eligible courses found in {formData.state}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Try selecting "Other States" to see more options
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Other State Results */}
                    {activeTab === 'other' && (
                        <>
                            {results.otherStateResults.length > 0 ? (
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">Other States</span>
                                        More Recommendations
                                    </h4>
                                    <div className="grid gap-4">
                                        {results.otherStateResults.map((result, index) => (
                                            <div
                                                key={index}
                                                className="border-2 border-indigo-300 bg-indigo-50 rounded-2xl p-6 transition hover:shadow-lg"
                                            >
                                                {/* University Name */}
                                                <h5 className="text-lg font-bold text-gray-900 mb-1">
                                                    {result.university.name}
                                                </h5>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {result.university.state} • {result.university.type}
                                                </p>

                                                {/* Course Name */}
                                                <div className="mb-3">
                                                    <p className="text-xl font-semibold text-gray-900">
                                                        {result.course.name}
                                                    </p>
                                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                        {result.course.category.charAt(0).toUpperCase() + result.course.category.slice(1)}
                                                    </span>
                                                </div>

                                                {/* Eligibility Highlight */}
                                                <div className="bg-white rounded-xl p-3 mb-3">
                                                    <p className="text-sm text-gray-700">
                                                        <span className="text-green-600 font-bold">✓</span> {result.reason}
                                                    </p>
                                                </div>

                                                {/* Special Conditions */}
                                                {result.specialConditions && result.specialConditions.length > 0 && (
                                                    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
                                                        <p className="font-semibold text-yellow-900 text-sm mb-1">
                                                            Important Notes:
                                                        </p>
                                                        <ul className="list-disc list-inside text-sm text-yellow-800">
                                                            {result.specialConditions.map((condition, i) => (
                                                                <li key={i}>{condition}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                    <p className="text-lg font-semibold text-gray-700 mb-2">
                                        No eligible courses found in other states
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        All your eligible courses are in {formData.state}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Pagination */}
                    {paginationMeta.totalPages > 1 && (
                        <div className="space-y-4">
                            {/* Results Summary */}
                            <p className="text-center text-sm text-gray-600">
                                Total {paginationMeta.totalEligibleCourses} eligible courses
                            </p>

                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center gap-4">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!paginationMeta.hasPreviousPage || loading}
                                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ← Previous
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!paginationMeta.hasNextPage || loading}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleReset}
                            className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition"
                        >
                            Start New Search
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
                        >
                            Print Results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
