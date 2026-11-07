import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import AuthShell from "../components/ui/AuthShell";
import Field from "../components/ui/Field";
import SubmitButton from "../components/ui/SubmitButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/user/forgot-password`,
        { email },
      );
      setSent(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not send the reset link.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Account recovery"
      title="Forgot your password?"
      subtitle="Enter your account email and we’ll send a reset link."
      highlights={[
        { value: "15 min", label: "Link validity" },
        { value: "One-time", label: "Secure reset" },
        { value: "Email", label: "Delivery" },
      ]}
    >
      {sent ? (
        <div className="space-y-5 text-center">
          <p className="text-sm leading-6 text-ink-600">
            If an account exists for <strong>{email}</strong>, a reset link has
            been sent. Check your inbox.
          </p>
          <Link to="/login" className="font-semibold text-brand-600">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Field
            label="Email address"
            icon={HiOutlineMail}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <SubmitButton loading={loading} loadingText="Sending link…">
            Send reset link
          </SubmitButton>
          <p className="text-center text-sm text-ink-500">
            <Link to="/login" className="font-semibold text-brand-600">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
