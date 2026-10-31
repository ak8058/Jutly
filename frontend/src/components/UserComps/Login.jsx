import { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import AuthShell from "../ui/AuthShell";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sign-in is not available right now. Please try again later.");
  }

  return (
    <AuthShell
      badge="Welcome back"
      title="Sign in to Jutly"
      subtitle="Pick up where you left off — your cart is waiting."
      highlights={[
        { value: "12k+", label: "Products" },
        { value: "800+", label: "Sellers" },
        { value: "4.8★", label: "Avg. rating" },
      ]}
    >
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
          onChange={event => setEmail(event.target.value)}
        />

        <Field
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember-me"
            className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-600"
          >
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="h-4 w-4 cursor-pointer rounded border-ink-300 accent-[#6366F1]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-[13px] font-semibold text-[#6366F1] transition-colors hover:text-[#4F46E5]"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton type="submit" className="!bg-[#6366F1] hover:!bg-[#4F46E5]">
          Sign in
          <IoIosArrowForward />
        </SubmitButton>

        {status && (
          <p role="status" className="text-center text-[13px] text-danger-500">
            {status}
          </p>
        )}

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ink-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-[12px] text-ink-400">or</span>
          </div>
        </div>

        <p className="text-center text-[14px] text-ink-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="font-semibold text-[#6366F1] transition-colors hover:text-[#4F46E5]"
          >
            Create one
          </Link>
        </p>

        <p className="text-center text-[13px] text-ink-400">
          Selling on Jutly?{" "}
          <Link
            to="/shop-login"
            className="font-semibold text-ink-600 underline-offset-2 transition-colors hover:text-ink-900 hover:underline"
          >
            Seller login
          </Link>
        </p>

      </form>
    </AuthShell>
  );
}

export default Login;
