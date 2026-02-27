"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.url) {
      router.push(res.url);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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

      {error && <p className="text-sm font-medium text-black">{error}</p>}

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <Button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        variant="secondary"
        fullWidth
      >
        Continue with Google
      </Button>

      <p className="text-center text-sm text-black/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-black hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

