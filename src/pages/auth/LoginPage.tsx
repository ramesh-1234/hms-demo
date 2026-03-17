import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "admin@hms.com",
    password: "123456",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
              <ShieldCheck size={28} />
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              MediCore HMS
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-teal-50">
              Simple, modern hospital management demo built with React for
              patient flow, appointments, billing, lab, and daily hospital
              operations.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 text-xl font-bold text-white shadow-lg">
                H
              </div>
              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Login to access your hospital dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3.5 font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
