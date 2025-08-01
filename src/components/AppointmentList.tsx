interface AppointmentListProps {
    appointments: any[];
    onEdit: (appt: any) => void;
    onDelete: (id: string) => void;
}

function formatTimeTo12Hour(time: string) {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 to 12
    return `${hour}:${minute} ${ampm}`;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
    appointments,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md mb-10">
            <h2 className="text-xl font-bold mb-4 text-center">Appointments</h2>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-600">No appointments yet.</p>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appt) => (
                        <li key={appt.id} className="border-b pb-2">
                            <p><strong>Name:</strong> {appt.customerName}</p>
                            {appt.customerEmail && <p><strong>Email:</strong> {appt.customerEmail}</p>}
                            {appt.customerPhone && <p><strong>Phone:</strong> {appt.customerPhone}</p>}
                            <p><strong>Date:</strong> {appt.date}</p>
                            <p><strong>Time:</strong> {formatTimeTo12Hour(appt.time)}</p>
                            <p><strong>Service:</strong> {appt.service}</p>

                            <div className="mt-2 flex gap-2">
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                                    onClick={() => onEdit(appt)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                                    onClick={() => onDelete(appt.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentList;
