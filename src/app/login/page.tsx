/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { saveSession } from "@/lib/auth";
import { SplitForm } from "@/components/UIComponents/Forms/SplitForm";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit({ email, password }: { email: string; password: string }) {
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      const data = await apiFetch<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveSession(data.token, data.user);
      const dest = data.user.role === "admin" ? "/admin/dashboard" : "/membre/p2c";
      router.prefetch(dest);
      router.push(dest);
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <SplitForm
      fullPageBackgroundImage="/images/backnoiree.png"
      formTitle="Connexion à votre compte"
      emailLabel="Email"
      passwordLabel="Mot de passe"
      buttonText="Se connecter"
      errorMessage={error || undefined}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
