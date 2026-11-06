import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ActivationResult from "../components/ui/ActivationResult";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ActivationPage() {
  const { url } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const activationStarted = useRef(false);

  useEffect(() => {
    if (!url || activationStarted.current) return;
    activationStarted.current = true;

    async function activateEmail() {
      try {
        const { data } = await axios.post(`${API_BASE_URL}/api/v2/user/activation`, { url });
        if (!data?.success) throw new Error(data?.message || "Activation failed.");
        setMessage(data.message || "Account activated successfully. You can sign in.");
        setStatus("success");
      } catch (error) {
        console.error("Error activating email:", error);
        setMessage(error.response?.data?.message || error.message || "Activation failed. Please request a new link.");
        setStatus("error");
      }
    }
    activateEmail();
  }, [url]);

  if (status === "error") {
    return (
      <ActivationResult
        status="error"
        title="Activation failed"
        message={message || "This activation link is invalid or expired. Sign up again to get a fresh link."}
        ctaLabel="Back to sign up"
        ctaTo="/sign-up"
      />
    );
  }

  if (status === "pending") {
    return (
      <ActivationResult
        status="pending"
        title="Activating your account"
        message="Hold on a moment while we verify your email address."
      />
    );
  }

  return (
    <ActivationResult
      status="success"
      title="You're all set"
      message={message || "Your account has been created successfully. Sign in to start shopping."}
      ctaLabel="Sign in to jutly"
      ctaTo="/login"
    />
  );
}

export default ActivationPage;
