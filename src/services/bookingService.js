import api from "../api/axios";

const createBooking = async (bookingData) => {
  const formData = new FormData();

  formData.append("name", bookingData.name);
  formData.append("phone", bookingData.phone);

  formData.append("selectedSlots", JSON.stringify(bookingData.selectedSlots));

  formData.append("paymentScreenshot", bookingData.image);

  const response = await api.post("/bookings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default {
  createBooking,
};
