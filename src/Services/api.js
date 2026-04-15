import axios from 'axios';

// --- CẤU HÌNH ---
const CLOUDINARY_NAME = "dnqertlqe";
const CLOUDINARY_PRESET = "tws_preset";
const MENDIX_BASE_URL = "https://backend-ca5y.vercel.app/api";

// --- AXIOS INSTANCE ---
const mendixApi = axios.create({
  baseURL: MENDIX_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// --- UPLOAD IMAGE ---
export const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};

// --- PROJECT SERVICE ---
export const ProjectService = {
  getAll: async () => {
    const res = await mendixApi.get('/projects');
    return res; // trả về data luôn cho sạch
  },

  create: async (data) => {
    // Gửi key mà Node.js đang mong đợi (req.body.title, req.body.shortDesc...)
    const res = await mendixApi.post('/projects', {
      title: data.title,
      shortDesc: data.shortDesc,
      content: data.content,
      externalLink: data.externalLink,
      imageUrl: data.imageUrl
    });
    return res.data;
  },

  update: async (id, data) => {
    const res = await mendixApi.patch(`/projects/${id}`, {
      title: data.title,
      shortDesc: data.shortDesc,
      content: data.content,
      externalLink: data.externalLink,
      imageUrl: data.imageUrl
    });
    return res.data;
  },

  delete: async (id) => {
    return mendixApi.delete(`/projects/${id}`);
  }
};

// --- CONTACT SERVICE ---
export const ContactService = {
  getAll: () => mendixApi.get('/contacts'),

  submit: (contactData) => mendixApi.post('/contacts', {
    name: contactData.name,
    email: contactData.email,
    phone: contactData.phone,
    message: contactData.message
  }),

  // ✅ FIX: đúng endpoint
  update: (id, data) => mendixApi.put(`/contacts/${id}`, data),

  delete: (id) => mendixApi.delete(`/contacts/${id}`)
};