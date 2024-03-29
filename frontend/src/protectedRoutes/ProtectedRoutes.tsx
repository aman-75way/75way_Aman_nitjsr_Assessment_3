import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";

interface ProtectedProps {
  children: ReactNode;
  name :string
}

const Protected: React.FC<ProtectedProps> = ({ children,name }) => {
  const navigate = useNavigate();

  async function getToken() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await jose.jwtVerify(token, new TextEncoder().encode("mynameisAmanKumarTiwari"));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    getToken().then((res) => {
      if (!res) {
        navigate("/");
      } else {
        navigate(`/${name}`);
      }
    });
  }, []);

  return <>{children}</>;
};

export default Protected;




