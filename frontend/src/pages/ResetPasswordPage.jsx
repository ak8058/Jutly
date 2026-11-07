import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineLockClosed } from "react-icons/hi";
import AuthShell from "../components/ui/AuthShell";
import Field from "../components/ui/Field";
import SubmitButton from "../components/ui/SubmitButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/user/reset-password/${token}`,
        { password },
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not reset your password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Secure your account"
      title="Set a new password"
      subtitle="Choose a new password for your Jutly account."
      highlights={[
        { value: "One-time", label: "Reset link" },
        { value: "15 min", label: "Link validity" },
        { value: "Secure", label: "Password update" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="New password"
          icon={HiOutlineLockClosed}
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={4}
          required
          placeholder="Enter new password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Field
          label="Confirm new password"
          icon={HiOutlineLockClosed}
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          minLength={4}
          required
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <SubmitButton loading={loading} loadingText="Updating password…">
          Reset password
        </SubmitButton>
        <p className="text-center text-sm">
          <Link to="/login" className="font-semibold text-brand-600">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
