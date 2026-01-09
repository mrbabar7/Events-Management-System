const API_URL = import.meta.env.VITE_API_BASE_URL;

export const postSignUp = async (formData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: formData.userName,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
    }),
  });

  const data = await response.json();

  // If the response status is not ok, ensure we pass along the error structure
  if (!response.ok) {
    if (response.status === 422) {
      // Validation errors
      return { errors: data.errors };
    }
    // Server/DB errors
    return {
      message: data.message || "An error occurred during signup",
      error: data.error,
    };
  }

  return data;
};
export const postLogin = async (formData) => {
  const responce = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });
  const data = await responce.json();
  if (!responce.ok) {
    if (responce.status === 422) {
      return { errors: data.errors };
    }
    return {
      message: data.message || "An error occurred during Login",
    };
  }
  return data;
};
export const checkUser = async () => {
  const responce = await fetch(`${API_URL}/check-user`, {
    credentials: "include",
  });
  const data = await responce.json();
  return data;
};

export const postLogout = async () => {
  const responce = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await responce.json();
  return data;
};
