"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type RoleOption = "STUDENT" | "INSTRUCTOR";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleOption>("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Unable to sign up");
      return;
    }

    router.push("/login");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black/70">Name</label>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black/70">Email</label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black/70">Password</label>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-black/70">Role</label>
        <div className="grid grid-cols-2 gap-3">
          {(["STUDENT", "INSTRUCTOR"] as RoleOption[]).map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setRole(option)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                role === option
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-light text-black/70 hover:border-black/40"
              }`}
            >
              {option === "STUDENT" ? "Student" : "Instructor"}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-medium text-black">{error}</p>}

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-xs text-black/45">
        By creating an account, you agree to the TezCode Terms of Use and Privacy Policy.
      </p>

      <p className="text-center text-sm text-black/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}

