const API_URL = import.meta.env.VITE_API_BASE_URL;

export const postEvent = async (fd) => {
  const responce = await fetch(`${API_URL}/api/event`, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const data = await responce.json();
  if (!responce.ok) {
    if (responce.status === 422) {
      return { errors: data.errors };
    }
    return {
      apiError: data.apiError || "There is something wrong!",
    };
  }
  return data;
};
export const deleteEvent = async (eventId) => {
  const responce = await fetch(`${API_URL}/api/delete-event`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId }),
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      error: data.message,
    };
  }
  return data;
};
export const updateEvent = async (eventId, eventData, imageFile) => {
  // If there's an image file, use FormData; otherwise use JSON
  if (imageFile) {
    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("eventName", eventData.eventName);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    formData.append("image", imageFile);

    const responce = await fetch(`${API_URL}/api/update-event`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const data = await responce.json();
    if (!responce.ok) {
      return {
        error: data.message,
      };
    }
    return data;
  } else {
    const responce = await fetch(`${API_URL}/api/update-event`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, ...eventData }),
    });
    const data = await responce.json();
    if (!responce.ok) {
      return {
        error: data.message,
      };
    }
    return data;
  }
};
export const fetchEvents = async () => {
  const responce = await fetch(`${API_URL}/api/fetch-event`, {
    credentials: "include",
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      message: data.message,
    };
  }
  return data;
};
export const fetchMyEvents = async () => {
  const responce = await fetch(`${API_URL}/api/fetch-myevent`, {
    credentials: "include",
  });
  const data = await responce.json();
  return data;
};
export const fetchEventDetails = async (eventId) => {
  const responce = await fetch(`${API_URL}/api/event-details/${eventId}`);
  const data = await responce.json();
  if (!responce.ok) {
    return {
      message: data.message,
    };
  }
  return data;
};
export const postApplyEvent = async (eventId) => {
  const responce = await fetch(`${API_URL}/api/apply-event`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId }),
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      error: data.message,
    };
  }
  return data;
};
export const postUnapplyEvent = async (eventId) => {
  const responce = await fetch(`${API_URL}/api/unapply-event`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId }),
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      error: data.message,
    };
  }
  return data;
};

export const getApplyEvents = async () => {
  const responce = await fetch(`${API_URL}/api/apply-event`, {
    credentials: "include",
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      message: data.message,
    };
  }
  return data;
};
export const postAppStatus = async (appId, status) => {
  const responce = await fetch(`${API_URL}/api/post-app-status`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId, status }),
  });
  const data = await responce.json();
  if (!responce.ok) {
    return {
      message: data.message,
    };
  }
  return data;
};
