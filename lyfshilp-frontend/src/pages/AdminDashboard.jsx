import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// 🔒 Validation Functions
const validateEmail = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // ✅ valid email
  const phoneRegex = /^\d{10}$/;                     // ✅ exactly 10 digits
  return emailRegex.test(input) || phoneRegex.test(input);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number
  return phoneRegex.test(phone.replace(/\s+/g, ""));
};

const validateName = (name) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, ""); // Remove HTML tags
};

const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function AdminDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [olympiads, setOlympiads] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);


  // Search states
  const [userSearch, setUserSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [olySearch, setOlySearch] = useState("");
  const [workSearch, setWorkSearch] = useState("");
  const [callbackSearch, setCallbackSearch] = useState("");
  const [podcastSearch, setPodcastSearch] = useState("");

  // Sort toggles
  const [userSortAsc, setUserSortAsc] = useState(true);
  const [appSortAsc, setAppSortAsc] = useState(true);
  const [olySortAsc, setOlySortAsc] = useState(true);
  const [workSortAsc, setWorkSortAsc] = useState(true);
  const [callbackSortAsc, setCallbackSortAsc] = useState(true);
  const [podcastSortAsc, setPodcastSortAsc] = useState(true);

  // Modal and message
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmData, setConfirmData] = useState({ show: false, type: "", id: null });
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("token");

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const showMessage = (text, type = "success") => {
    // Save scroll position before showing message
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    setMessage({ text, type });
    
    // Restore scroll immediately
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScroll);
    });
    
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    if (user && user.role?.toLowerCase() === "admin") fetchAllData();
  }, [user]);

const fetchAllData = async () => {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const [olyRes, appRes, userRes, workRes, callbackRes, podcastRes] = await Promise.all([
      api.get("/olympiad/all", { headers }),
      api.get("/applications/all", { headers }),
      api.get("/user/all", { headers }),
      api.get("/workshop/all", { headers }),
      api.get("/callback/all", { headers }),
      api.get("/podcast/all", { headers }),
    ]);

    setOlympiads(olyRes.data.data || olyRes.data || []);
    setApplications(appRes.data.data || appRes.data || []);
    setUsers(userRes.data.users || userRes.data || []);
    setWorkshops(workRes.data.data || workRes.data || []);
    setCallbacks(callbackRes.data.data || callbackRes.data || []);
    setPodcasts(podcastRes.data.data || podcastRes.data || []);

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  } catch (err) {
    console.error(err);
    showMessage("❌ Failed to load dashboard data", "error");
  }
};


  if (loading) return <div className="text-center mt-10 text-gray-600">Loading Dashboard...</div>;
  if (!user || user.role?.toLowerCase() !== "admin") return <Navigate to="/login" replace />;

  // 🔒 Validate Modal Data
  const validateModalData = () => {
    const errors = {};

    if (modalType === "olympiad") {
      if (!validateName(modalData.name || "")) errors.name = "Valid name required (letters only)";
      if (!validateEmail(modalData.email || "")) errors.email = "Valid email required";
      if (!validatePhone(modalData.phone || "")) errors.phone = "Valid 10-digit phone required";
      if (!modalData.className?.trim()) errors.className = "Class is required";
      if (!modalData.school?.trim()) errors.school = "School name required";
      if (!modalData.city?.trim()) errors.city = "City is required";
      if (!modalData.state?.trim()) errors.state = "State is required";
      if (!modalData.olympiad?.trim()) errors.olympiad = "Olympiad type required";
    }

    if (modalType === "applications") {
      if (!validateName(modalData.fullName || "")) errors.fullName = "Valid full name required";
      if (!validateEmail(modalData.email || "")) errors.email = "Valid email required";
      if (!validatePhone(modalData.phone || "")) errors.phone = "Valid 10-digit phone required";
      if (!modalData.about?.trim() || modalData.about.length < 10) 
        errors.about = "About section required (min 10 chars)";
      if (!modalData.jobTitle?.trim()) errors.jobTitle = "Job title required";
      if (modalData.resumeUrl && !validateURL(modalData.resumeUrl)) 
        errors.resumeUrl = "Valid URL required";
    }

    if (modalType === "user") {
      if (!validateName(modalData.name || "")) errors.name = "Valid name required";
      if (!validateEmail(modalData.email || "")) errors.email = "Valid email required";
      if (!modalData.role?.trim()) errors.role = "Role is required";
      if (!modalData.id && (!modalData.password || modalData.password.length < 6)) 
        errors.password = "Password required (min 6 chars)";
    }
    if (modalType === "callback") {
      if (!validateName(modalData.name || "")) errors.name = "Valid name required";
      if (!validatePhone(modalData.phone || "")) errors.phone = "Valid phone required";
      if (!modalData.studentClass?.trim()) errors.studentClass = "Class required";
      if (!modalData.stream?.trim()) errors.stream = "Stream required";
      if (!modalData.school?.trim()) errors.school = "School required";
      if (!modalData.pageName?.trim()) errors.pageName = "Page name required";
    }
    if (modalType === "podcast") {
      if (!modalData.title?.trim()) errors.title = "Title is required";
      if (!modalData.description?.trim()) errors.description = "Description required";
      if (modalData.videoUrl && !validateURL(modalData.videoUrl)) errors.videoUrl = "Invalid video URL";
      if (modalData.thumbnail && !validateURL(modalData.thumbnail)) errors.thumbnail = "Invalid thumbnail URL";
    }


    if (modalType === "workshop") {
      if (!validateName(modalData.name || "")) errors.name = "Valid name required";
      if (!validateEmail(modalData.email || "")) errors.email = "Valid email required";
      if (!validatePhone(modalData.phone || "")) errors.phone = "Valid 10-digit phone required";
      if (!modalData.organization?.trim()) errors.organization = "Organization required";
      if (!modalData.message?.trim()) errors.message = "Message required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Delete
  const handleDelete = (type, id) => setConfirmData({ show: true, type, id });

  const confirmDelete = async () => {
    // Save current scroll position BEFORE any async operations
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/${confirmData.type}/delete/${confirmData.id}`, { headers });
      
      setConfirmData({ show: false, type: "", id: null });
      
      showMessage("🗑️ Record deleted successfully!", "success");
      await fetchAllData();

      // Restore scroll position with slight delay to ensure DOM is updated
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to delete record", "error");
      setConfirmData({ show: false, type: "", id: null });
    }
  };

  // Save (Add/Edit) with Validation
  const handleSave = async () => {
    if (!validateModalData()) {
      showMessage("❌ Please fix validation errors", "error");
      return;
    }

    // Save current scroll position BEFORE any async operations
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    try {
      // Sanitize all string inputs
      const sanitizedData = {};
      Object.keys(modalData).forEach(key => {
        if (typeof modalData[key] === 'string') {
          sanitizedData[key] = sanitizeInput(modalData[key]);
        } else {
          sanitizedData[key] = modalData[key];
        }
      });

      const headers = { Authorization: `Bearer ${token}` };
      if (modalData.id) {
        await api.put(`/${modalType}/update/${modalData.id}`, sanitizedData, { headers });
        showMessage("✅ Record updated successfully!", "success");
      } else {
        await api.post(`/${modalType}/add`, sanitizedData, { headers });
        showMessage("✅ Record added successfully!", "success");
      }
      
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
      
      setShowModal(false);
      setModalData({});
      setValidationErrors({});
      
      await fetchAllData();

      // Restore scroll position with requestAnimationFrame
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to save record", "error");
    }
  };

  // Open Add/Edit Modal
  const openModal = (type, data = {}) => {
    // Prevent body scroll when modal opens
    document.body.style.overflow = 'hidden';
    
    setModalType(type);
    setValidationErrors({});
    let defaultData = {};

    if (type === "olympiad") {
      defaultData = {
        name: "",
        email: "",
        phone: "",
        className: "",
        school: "",
        city: "",
        state: "",
        olympiad: "",
      };
    } else if (type === "applications") {
      defaultData = {
        fullName: "",
        email: "",
        phone: "",
        about: "",
        jobId: "",
        jobTitle: "",
        resumeUrl: "",
      };
    } else if (type === "user") {
      defaultData = {
        name: "",
        email: "",
        role: "",
        password: "",
      };
      
    } 
    else if (type === "callback") {
   defaultData = {
    name: "",
    phone: "",
    studentClass: "",
    stream: "",
    school: "",
    pageName: "",
  };
}
  else if (type === "podcast") {
  defaultData = {
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    category: "",
  };
}

  else if (type === "workshop") {
      defaultData = {
        name: "",
        phone: "",
        email: "",
        organization: "",
        message: "",
      };
    }

    setModalData(data.id ? data : defaultData);
    setShowModal(true);
  };

  // Filter function
  const filterData = (data = [], search = "", asc = true, dateKey = "createdAt", textKeys = []) =>
    Array.isArray(data)
      ? data
          .filter((item) =>
            textKeys.some((key) =>
              item[key]?.toString().toLowerCase().includes(search.toLowerCase())
            )
          )
          .sort((a, b) =>
            asc
              ? new Date(a[dateKey]) - new Date(b[dateKey])
              : new Date(b[dateKey]) - new Date(a[dateKey])
          )
      : [];

  const filteredOly = filterData(olympiads, olySearch, olySortAsc, "createdAt", ["name", "email"]);
  const filteredApps = filterData(applications, appSearch, appSortAsc, "createdAt", ["fullName", "email"]);
  const filteredUsers = filterData(users, userSearch, userSortAsc, "id", ["name", "email"]);
  const filteredWork = filterData(workshops, workSearch, workSortAsc, "createdAt", ["name", "email", "organization"]);
  const filteredPodcasts = filterData(podcasts, podcastSearch, podcastSortAsc, "createdAt", ["title", "category"]);


  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, filename);
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  // 🔒 Get field label and type
  const getFieldConfig = (key) => {
    const configs = {
      name: { label: "Name", type: "text", required: true },
      fullName: { label: "Full Name", type: "text", required: true },
      email: { label: "Email", type: "text", required: true },
      phone: { label: "Phone (10 digits)", type: "tel", required: true },
      className: { label: "Class", type: "text", required: true },
      school: { label: "School", type: "text", required: true },
      city: { label: "City", type: "text", required: true },
      state: { label: "State", type: "text", required: true },
      olympiad: { label: "Olympiad Type", type: "text", required: true },
      about: { label: "About (min 10 chars)", type: "textarea", required: true },
      jobId: { label: "Job ID", type: "text", required: false },
      jobTitle: { label: "Job Title", type: "text", required: true },
      resumeUrl: { label: "Resume URL", type: "url", required: false },
      role: { label: "Role", type: "text", required: true },
      password: { label: "Password (min 6 chars)", type: "password", required: true },
      organization: { label: "Organization", type: "text", required: true },
      message: { label: "Message", type: "textarea", required: true },
      studentClass: { label: "Class", type: "text", required: true },
      stream: { label: "Stream", type: "text", required: true },
      pageName: { label: "Page Name", type: "text", required: true },
      title: { label: "Title", type: "text", required: true },
      description: { label: "Description", type: "textarea", required: true },
      videoUrl: { label: "Video URL", type: "url", required: false },
      thumbnail: { label: "Thumbnail URL", type: "url", required: false },
      category: { label: "Category", type: "text", required: false },

    };
    return configs[key] || { label: key, type: "text", required: false };
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-gray-50 min-h-screen">
      {message.text && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg transition-all duration-300 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white z-50`}
        >
          {message.text}
        </div>
      )}

      <section className="space-y-6 pt-16">
        {/* 🏆 Olympiad */}
        <DataTable
          title="🏆 Olympiad Registrations"
          data={filteredOly}
          searchValue={olySearch}
          setSearch={setOlySearch}
          sortAsc={olySortAsc}
          setSortAsc={setOlySortAsc}
          onAdd={() => openModal("olympiad")}
          onExportExcel={() => exportToExcel(filteredOly, "olympiad_registrations")}
          columns={["S.No", "Name", "Email", "Phone", "Class", "School", "City", "State", "Olympiad", "Actions"]}
          renderRow={(o, index) => (
            <>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{o.name}</td>
              <td className="p-2 border">{o.email}</td>
              <td className="p-2 border">{o.phone}</td>
              <td className="p-2 border">{o.className}</td>
              <td className="p-2 border">{o.school}</td>
              <td className="p-2 border">{o.city}</td>
              <td className="p-2 border">{o.state}</td>
              <td className="p-2 border">{o.olympiad}</td>
              <td className="p-2 border text-left space-x-2">
                <button onClick={() => openModal("olympiad", o)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete("olympiad", o.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </>
          )}
        />

        {/* 🧑‍🏫 Workshops */}
        <DataTable
          title="🧑‍🏫 Workshop Registrations"
          data={filteredWork}
          searchValue={workSearch}
          setSearch={setWorkSearch}
          sortAsc={workSortAsc}
          setSortAsc={setWorkSortAsc}
          onAdd={() => openModal("workshop")}
          onExportExcel={() => exportToExcel(filteredWork, "workshop_registrations")}
          columns={["S.No", "Name", "Email", "Phone", "Organization", "Message", "Actions"]}
          renderRow={(w, index) => (
            <>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{w.name}</td>
              <td className="p-2 border">{w.email}</td>
              <td className="p-2 border">{w.phone}</td>
              <td className="p-2 border">{w.organization}</td>
              <td className="p-2 border">{w.message}</td>
              <td className="p-2 border space-x-2 text-left">
                <button onClick={() => openModal("workshop", w)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete("workshop", w.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </>
          )}
        />
{/* 🧑‍🏫 Callback Requests */}
  <DataTable
  title="📞 Callback Requests"
  data={filterData(callbacks, callbackSearch, callbackSortAsc, "createdAt", ["name", "phone", "pageName", "school"])}
  searchValue={callbackSearch}
  setSearch={setCallbackSearch}
  sortAsc={callbackSortAsc}
  setSortAsc={setCallbackSortAsc}
  onAdd={() => openModal("callback")}
  onExportExcel={() => exportToExcel(callbacks, "callback_requests")}
  columns={["S.No", "Name", "Phone", "Class", "Stream", "School", "Page Name", "Created At", "Actions"]}
  renderRow={(c, index) => (
    <>
      <td className="p-2 border">{index + 1}</td>
      <td className="p-2 border">{c.name}</td>
      <td className="p-2 border">{c.phone}</td>
      <td className="p-2 border">{c.studentClass}</td>
      <td className="p-2 border">{c.stream}</td>
      <td className="p-2 border">{c.school}</td>
      <td className="p-2 border">{c.pageName}</td>
      <td className="p-2 border">{new Date(c.createdAt).toLocaleString()}</td>
      <td className="p-2 border text-left space-x-2">
        <button onClick={() => openModal("callback", c)} className="text-blue-600 hover:underline">Edit</button>
        <button onClick={() => handleDelete("callback", c.id)} className="text-red-600 hover:underline">Delete</button>
      </td>
    </>
  )}
/>

        {/* 💼 Job Applications */}
        <DataTable
          title="💼 Job Applications"
          data={filteredApps}
          searchValue={appSearch}
          setSearch={setAppSearch}
          sortAsc={appSortAsc}
          setSortAsc={setAppSortAsc}
          onAdd={() => openModal("applications")}
          onExportExcel={() => exportToExcel(filteredApps, "job_applications")}
          columns={["S.No", "Full Name", "Email", "Phone", "About", "Job Title", "Resume", "Actions"]}
          renderRow={(a, index) => (
            <>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{a.fullName}</td>
              <td className="p-2 border">{a.email}</td>
              <td className="p-2 border">{a.phone}</td>
              <td className="p-2 border">{a.about}</td>
              <td className="p-2 border">{a.jobTitle}</td>
              <td className="p-2 border text-blue-600 underline text-center">
                {a.resumeUrl ? <a href={a.resumeUrl}>View</a> : "N/A"}
              </td>
              <td className="p-2 border">
                <button onClick={() => openModal("applications", a)} className="text-blue-600 hover:underline mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete("applications", a.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </>
          )}
        />

        {/* 👤 Users */}
        <DataTable
          title="👤 Users"
          data={filteredUsers}
          searchValue={userSearch}
          setSearch={setUserSearch}
          sortAsc={userSortAsc}
          setSortAsc={setUserSortAsc}
          onAdd={() => openModal("user")}
          onExportExcel={() => exportToExcel(filteredUsers, "users")}
          columns={["S.No", "Name", "Email/Number", "Role", "Joined", "Actions"]}
          renderRow={(u, index) => (
            <>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => openModal("user", u)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete("user", u.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </>
          )}
        />
        {/* 🎙️ Podcasts */}
<DataTable
  title="🎙️ Podcast Entries"
  data={filterData(podcasts || [], podcastSearch, podcastSortAsc, "createdAt", ["title", "category", "description"])}
  searchValue={podcastSearch}
  setSearch={setPodcastSearch}
  sortAsc={podcastSortAsc}
  setSortAsc={setPodcastSortAsc}
  onAdd={() => openModal("podcast")}
  onExportExcel={() => exportToExcel(podcasts, "podcasts")}
  columns={["S.No", "Title", "Category", "Description", "Video URL", "Thumbnail", "Created At", "Actions"]}
  renderRow={(p, index) => (
    <>
      <td className="p-2 border">{index + 1}</td>
      <td className="p-2 border">{p.title}</td>
      <td className="p-2 border">{p.category || "—"}</td>
      <td className="p-2 border">{p.description || "—"}</td>
      <td className="p-2 border text-blue-600 underline">
        {p.videoUrl ? <a href={p.videoUrl} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
      </td>
      <td className="p-2 border text-center">
        {p.thumbnail ? (
          <img src={p.thumbnail} alt="thumbnail" className="w-12 h-12 object-cover rounded" />
        ) : (
          "N/A"
        )}
      </td>
      <td className="p-2 border">{new Date(p.createdAt).toLocaleDateString()}</td>
      <td className="p-2 border space-x-2 text-left">
        <button onClick={() => openModal("podcast", p)} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={() => handleDelete("podcast", p.id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </>
  )}
/>
      </section>

      {/* 🔒 Enhanced Modal with Validation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 my-8 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3 text-center">
              {modalData.id ? "Edit" : "Add"} {modalType}
            </h2>
            {Object.keys(modalData).map((key) => {
              if (key === "id" || key === "createdAt" || key === "updatedAt") return null;
              const config = getFieldConfig(key);
              return (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    {config.label} {config.required && <span className="text-red-500">*</span>}
                  </label>
                  {config.type === "textarea" ? (
                    <textarea
                      value={modalData[key] || ""}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className={`border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 ${
                        validationErrors[key] ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
                      }`}
                      rows="3"
                    />
                  ) : (
                    <input
                      type={config.type}
                      value={modalData[key] || ""}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className={`border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 ${
                        validationErrors[key] ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
                      }`}
                    />
                  )}
                  {validationErrors[key] && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors[key]}</p>
                  )}
                </div>
              );
            })}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  document.body.style.overflow = 'unset';
                  setShowModal(false);
                  setValidationErrors({});
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmData.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
            <p className="mb-4 text-gray-700 text-center">Are you sure you want to delete this record?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmData({ show: false, type: "", id: null })}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔹 Reusable DataTable Component */
function DataTable({
  title,
  data,
  searchValue,
  setSearch,
  sortAsc,
  setSortAsc,
  onAdd,
  onExportExcel,
  columns,
  renderRow,
}) {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, 4);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">
            Total Entries: <strong>{data.length}</strong>
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-1.5 rounded text-sm w-36 sm:w-auto"
          />
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
          >
            Sort {sortAsc ? "↑" : "↓"}
          </button>
          <button
            onClick={onAdd}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            + Add
          </button>
          <CSVLink
            data={data}
            filename={`${title.replace(/\s+/g, "_").toLowerCase()}.csv`}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            CSV
          </CSVLink>
          <button
            onClick={onExportExcel}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm min-w-[650px]">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th key={col} className="p-2 border text-left whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length ? (
              displayData.map((item, index) => <tr key={item.id}>{renderRow(item, index)}</tr>)
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-3 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* View All / Show Less Button */}
      {data.length > 4 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          >
            {showAll ? (
              <>
                Show Less
                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                View All ({data.length} entries)
                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
      </div>
  );
}