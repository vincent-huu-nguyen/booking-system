import React from "react";

interface Props {
  formData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    date: string;
    time: string;
    service: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  editingId: string | null;
  onSubmit: () => void;
}

const AppointmentForm: React.FC<Props> = ({
  formData,
  setFormData,
  editingId,
  onSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md mb-10"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {editingId ? "Edit Appointment" : "Add Appointment"}
      </h2>

      <label className="block mb-2">
        Customer Name *
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Email (optional)
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Phone (optional)
        <input
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Date *
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-4">
        Time *
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-4">
        Service *
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
      >
        {editingId ? "Update Appointment" : "Add Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;
