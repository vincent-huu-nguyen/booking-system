import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    doc,
    where,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        date: "",
        time: "",
        service: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let unsubscribeAppointments: () => void;

        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                navigate("/login");
                return;
            }

            try {
                // Fetch name from Firestore
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setUser({ name: userData.name, email: currentUser.email || "No email" });
                } else {
                    setUser({ name: "Guest", email: currentUser.email || "No email" });
                }

                setLoading(false);

                const q = query(
                    collection(db, "appointments"),
                    where("userId", "==", currentUser.uid),
                    orderBy("date", "asc")
                );

                unsubscribeAppointments = onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setAppointments(data);
                });
            } catch (error) {
                console.error("Error fetching user name or appointments:", error);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeAppointments) unsubscribeAppointments();
        };
    }, [navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleEdit = (appt: any) => {
        setFormData({
            customerName: appt.customerName,
            customerEmail: appt.customerEmail || "",
            customerPhone: appt.customerPhone || "",
            date: appt.date,
            time: appt.time,
            service: appt.service,
        });
        setEditingId(appt.id);
    };

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, "appointments", id));
    };

    const handleSubmit = async () => {
        if (editingId) {
            const docRef = doc(db, "appointments", editingId);
            await updateDoc(docRef, { ...formData });
        } else {
            await addDoc(collection(db, "appointments"), {
                ...formData,
                userId: auth.currentUser?.uid, // ✅ this makes it user-specific
                createdAt: new Date().toISOString(),
            });
        }

        setFormData({
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            date: "",
            time: "",
            service: "",
        });
        setEditingId(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-400 text-white px-4 py-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name || "there"}!</h1>
            <LogoutButton onLogout={handleLogout} />

            <AppointmentForm
                formData={formData}
                setFormData={setFormData}
                editingId={editingId}
                onSubmit={handleSubmit}
            />

            <AppointmentList
                appointments={appointments}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Dashboard;
