import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {

    const verifyPayment = async () => {
      try {

        console.log("VERIFY DATA:", success, orderId);
        console.log("API URL:", url);

        const response = await axios.post(
          `${url}/api/order/verify`,
          {
            success,
            orderId
          }
        );

        console.log("VERIFY RESPONSE:", response.data);

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

    // 🚨 IMPORTANT CHECK
    if (success && orderId) {
      verifyPayment();
    } else {
      console.log("Missing params");
      navigate("/");
    }

  }, [success, orderId, url, navigate]);

  return (
    <div className='verify'>
      <h2>Verifying Payment...</h2>
    </div>
  )
}

export default Verify;