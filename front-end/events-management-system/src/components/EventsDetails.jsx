import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit3 } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../blocks/Button";
import Loader from "../blocks/Loader";
import { BeatLoader } from "react-spinners";
import {
  fetchEventDetails,
  postAppStatus,
  deleteEvent,
  updateEvent,
} from "../services/backendService";

// import axios from "axios";
export default function EventDetails() {
  const { eventId } = useParams();
  console.log("Event ID:", eventId);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [event, setEvent] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await fetchEventDetails(eventId);
      console.log("Fetched Event Data:", data);
      setEvent(data.event);
      setApplications(data.applications);
      // Initialize editedEvent with first event's data
      if (data.event && data.event.length > 0) {
        const e = data.event[0];
        setEditedEvent({
          eventName: e.eventName || "",
          date: e.date || "",
          time: e.time || "",
          location: e.location || "",
          description: e.description || "",
        });
      }
    };
    fetchEvent();
    //   fetchApplications();
  }, [eventId]);
  const handleDeleteEvent = async (eventId) => {
    const data = await deleteEvent(eventId);
    if (data && !data.error) {
      navigate("/dashbord");
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      toast.error("There is something wrong!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }

    console.log("Delete event response:", data);
  };

  const handleStatusClick = async ({ appId, status }) => {
    const responce = await postAppStatus(appId, status);
    console.log("accepted button is clicked for app id:", responce);
  };

  const handleEditToggle = () => {
    if (isEditing && event.length > 0) {
      const e = event[0];
      setEditedEvent({
        eventName: e.eventName || "",
        date: e.date || "",
        time: e.time || "",
        location: e.location || "",
        description: e.description || "",
      });
      setNewImage(null);
      setImagePreview("");
    }
    setIsEditing(!isEditing);
  };

  const handleEditInputChange = (field, value) => {
    setEditedEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEvent = async () => {
    setLoading(true);
    const data = await updateEvent(eventId, editedEvent, newImage);
    setLoading(false);
    if (data && !data.error) {
      setEvent(data.event ? [data.event] : event);
      setIsEditing(false);
      setNewImage(null);
      setImagePreview("");
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
    if (data && data.error) {
      toast.error(data.error, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  //   if (!event) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white">
      {loading && (
        <Loader>
          <BeatLoader color="#4F46E5" size={20} />
        </Loader>
      )}
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:text-indigo-700 cursor-pointer p-1 rounded-full hover:bg-blue-300 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-indigo-600 font-medium">Back</span>
      </div>
      {event.map((e) => (
        <div key={e._id}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80 bg-gray-200 relative group cursor-pointer">
              <img
                src={imagePreview || e.image}
                className="w-full h-full object-cover"
                alt="Event cover"
              />
              {isEditing && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleImageClick}
                >
                  <Edit3 size={48} className="text-white" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            {/* Title + Action Buttons */}
            <div className="flex justify-between items-start gap-6">
              <div>
                {isEditing ? (
                  <div className="mb-2">
                    <label className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={editedEvent.eventName}
                      onChange={(e) =>
                        handleEditInputChange("eventName", e.target.value)
                      }
                      className="md:text-3xl text-2xl font-bold text-gray-900 border-b-2 border-indigo-600 outline-none w-full py-2"
                    />
                  </div>
                ) : (
                  <h2 className="md:text-3xl text-2xl font-bold text-gray-900 mb-2">
                    {e.eventName}
                  </h2>
                )}
                {!isEditing && (
                  <div className="h-1 w-16 bg-indigo-600 rounded"></div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  className={`${
                    isEditing
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white`}
                  onClick={() =>
                    isEditing ? handleSaveEvent() : handleEditToggle()
                  }
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
                {!isEditing && (
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleDeleteEvent(e._id)}
                  >
                    Delete
                  </Button>
                )}
                {isEditing && (
                  <Button
                    className="bg-gray-400 hover:bg-gray-500 text-white"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            {/* Event Details Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="md:text-2xl text-xl font-semibold text-gray-900 mb-6">
                Event Details
              </h2>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                      Date
                    </p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedEvent.date}
                        onChange={(e) =>
                          handleEditInputChange("date", e.target.value)
                        }
                        className="md:text-xl text-md text-gray-800 font-semibold mt-1 border border-indigo-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="md:text-xl text-md text-gray-800 font-semibold mt-1">
                        {e.formattedDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                      Time
                    </p>
                    {isEditing ? (
                      <input
                        type="time"
                        value={editedEvent.time}
                        onChange={(e) =>
                          handleEditInputChange("time", e.target.value)
                        }
                        className="md:text-xl text-md text-gray-800 font-semibold mt-1 border border-indigo-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="md:text-xl text-md text-gray-800 font-semibold mt-1">
                        {e.formattedTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                      Location
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedEvent.location}
                        onChange={(e) =>
                          handleEditInputChange("location", e.target.value)
                        }
                        className="md:text-xl text-md text-gray-800 font-semibold mt-1 border border-indigo-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="md:text-xl text-md text-gray-800 font-semibold mt-1">
                        {e.location}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                    Description
                  </p>
                  {isEditing ? (
                    <textarea
                      value={editedEvent.description}
                      onChange={(e) =>
                        handleEditInputChange("description", e.target.value)
                      }
                      className="md:text-xl text-md text-gray-800 font-semibold mt-1 border border-indigo-300 rounded px-2 py-1 w-full min-h-24"
                    />
                  ) : (
                    <p className="md:text-xl text-md text-gray-800 font-semibold mt-1">
                      {e.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Applications Section */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
          Applications
        </h2>
        <div className="h-1 w-12 bg-indigo-600 rounded mt-2"></div>
        <p className="text-gray-600 mt-4">
          Total:{" "}
          <span className="font-semibold text-indigo-600">
            {applications.length}
          </span>
        </p>

        <div className="mt-6">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <p className="md:text-xl text-md font-semibold text-gray-900">
                    {app.user.userName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{app.user.email}</p>
                </div>
                {app.status === "pending" ? (
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button
                      onClick={() =>
                        handleStatusClick({
                          appId: app._id,
                          status: "approved",
                        })
                      }
                      className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusClick({
                          appId: app._id,
                          status: "rejected",
                        })
                      }
                      className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <div>
                    {app.status === "approved" ? (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Rejected
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {applications.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">No applications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
