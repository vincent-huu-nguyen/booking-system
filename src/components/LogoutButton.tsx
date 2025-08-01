interface Props {
  onLogout: () => void;
}

const LogoutButton: React.FC<Props> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-100 transition mb-6"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
