/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import InputField from "@/components/reusable/input";
import Button from "@/components/reusable/buttons";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();

  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!email || !password) {
      toast.error(
        "Veuillez saisir une nouvelle adresse e-mail ou un mot de passe."
      );
      return;
    }

    if (password.length < 8) {
      toast.error("mot de passe court.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newEmail: email,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Échec de la mise à jour.");
      }

      toast.success("Mise à jour réussie. Déconnexion...");
      await signOut({ redirect: true, redirectTo: "/login" });
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-10 py-10">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Paramètres du Compte
        </h2>

        <div className="space-y-4">
          <InputField
            type="text"
            label="Nouvelle adresse e-mail"
            placeholder="Entrez votre nouvelle adresse e-mail"
            value={email}
            onChange={setEmail}
          />

          <InputField
            type="password"
            label="Nouveau mot de passe"
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? "Mise à jour en cours..." : "Mettre à jour"}
          </Button>
        </div>
      </div>
    </section>
  );
}
