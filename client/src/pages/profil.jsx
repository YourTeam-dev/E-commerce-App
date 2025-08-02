import React, { useEffect } from 'react'

function profil() {
    const navigate = useNavigate();
    const { token, login, logout, isAuthenticated } = useAuth();
    if(!isAuthenticated) return navigate('/');
    useEffect(() => {
        
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default profil
