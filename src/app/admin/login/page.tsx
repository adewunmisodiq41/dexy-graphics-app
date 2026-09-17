"use client";

import { useActionState } from "react";
import { adminSignIn } from "@/lib/actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(adminSignIn, undefined);

  return (
    <div className="login-shell">
      <form className="login-box" action={formAction}>
        <h1 className="h-display" style={{ fontSize: 28, marginBottom: 8 }}>
          Studio Admin
        </h1>
        <p style={{ color: "var(--fg-soft)", fontSize: 14, marginBottom: 26 }}>
          Sign in to manage the site.
        </p>

        {state?.error && (
          <div className="form-status err" style={{ marginBottom: 18 }}>
            {state.error}
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit" className="btn btn-solid" style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
