import { useNavigate } from 'react-router-dom'; 

const useLogout = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("user_info");
    navigate("/login_estudante"); 
  };

  return { logout };
};

export default useLogout;
