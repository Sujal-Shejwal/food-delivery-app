import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  useEffect(() => {

    const verifyPayment = async () => {
      try {
        console.log("VERIFY PARAMS:", { success, orderId });

        // ✅ Safety check
        if (!success || !orderId) {
          console.log("Missing params");
          navigate("/");
          return;
        }

        // ✅ API call
        const response = await axios.post(
          `${url}/api/order/verify`,
          {
            success,
            orderId
          }
        );

        console.log("VERIFY RESPONSE:", response.data);

        // ✅ Navigation
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }

      } catch (error) {
        console.log("VERIFY ERROR:", error);
        navigate("/");
      }
    };

    verifyPayment();

  }, []);

  return (
    <div className='verify' style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Verifying Payment...</h2>
    </div>
  )
}

export default Verify;