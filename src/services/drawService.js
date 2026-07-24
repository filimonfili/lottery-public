import api from "../api/axios";

const getCurrentDraw = async () => {
  const response = await api.get("/slots/current");

  return response.data;
};

export default {
  getCurrentDraw,
};
