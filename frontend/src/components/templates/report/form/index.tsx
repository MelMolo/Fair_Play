/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputField from "@/components/reusable/input";
import Button from "@/components/reusable/buttons";

import { actions, countries, sports } from "@/lib/data/contants";

interface ReportFormData {
  firstName: string;
  lastName: string;
  event: string;
  type: string;
  description: string;
  country: string;
  gender: "male" | "female";
  age: number;
}

export default function ReportForm() {
  const router = useRouter();

  const [form, setForm] = useState<ReportFormData>({
    firstName: "",
    lastName: "",
    event: "",
    type: "Respect",
    description: "",
    country: "",
    gender: "male",
    age: 0,
  });

  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setLoading(true);

    const isFormValid =
      form.firstName.length >= 2 &&
      form.lastName.length >= 2 &&
      form.event &&
      form.description &&
      form.country &&
      form.age > 0;

    if (!isFormValid) {
      toast.error("Veuillez remplir tous les champs requis.");
      setLoading(false);
      return;
    }

    try {
      // await axios.post("/reports", form);
      const res = await fetch("/api/report/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message ?? "Error deleting report.");
        return;
      }

      router.push("/success");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow-2xl rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="firstName"
          label="Prénom"
          placeholder="Entrez votre prénom"
          value={form.firstName}
          onChange={(val) => setForm({ ...form, firstName: val })}
          error={hasSubmitted && form.firstName.length < 2}
          errorMessage="Champ requis"
          required
          labelClass="!text-blue-400 font-semibold"
        />
        <InputField
          name="lastName"
          label="Nom"
          placeholder="Entrez votre nom"
          value={form.lastName}
          onChange={(val) => setForm({ ...form, lastName: val })}
          error={hasSubmitted && form.lastName.length < 2}
          errorMessage="Champ requis"
          required
          labelClass="!text-blue-400 font-semibold"
        />
      </div>

      <InputField
        name="event"
        label="Événement sportif"
        type="select"
        options={sports}
        value={form.event}
        onChange={(val) => setForm({ ...form, event: val })}
        error={hasSubmitted && !form.event}
        errorMessage="Veuillez sélectionner un sport"
        required
        labelClass="!text-blue-400 font-semibold"
      />

      <InputField
        name="type"
        label="Type d'acte"
        type="select"
        options={actions}
        value={form.type}
        onChange={(val) => setForm({ ...form, type: val })}
        labelClass="!text-blue-400 font-semibold"
      />

      <InputField
        name="description"
        label="Description"
        placeholder="Décrivez l’acte de fair-play"
        type="textarea"
        value={form.description}
        onChange={(val) => setForm({ ...form, description: val })}
        error={hasSubmitted && !form.description}
        errorMessage="La description est requise"
        required
        labelClass="!text-blue-400 font-semibold"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          name="country"
          label="Pays"
          type="select"
          placeholder="Ex: Cameroun"
          options={countries}
          value={form.country}
          onChange={(val) => setForm({ ...form, country: val })}
          error={hasSubmitted && !form.country}
          errorMessage="Pays requis"
          required
          labelClass="!text-blue-400 font-semibold"
        />

        <InputField
          name="gender"
          label="Genre"
          type="select"
          options={["male", "female"]}
          value={form.gender}
          onChange={(val) => setForm({ ...form, gender: val })}
          labelClass="!text-blue-400 font-semibold"
        />

        <InputField
          name="age"
          label="Âge"
          type="number"
          placeholder="Ex: 25"
          value={form.age}
          onChange={(val) => setForm({ ...form, age: Number(val) })}
          error={hasSubmitted && (form.age <= 0 || form.age < 18)}
          errorMessage={
            form.age <= 0
              ? "Âge requis"
              : form.age > 0 && form.age < 18
              ? "Vous devez avoir au moins 18 ans."
              : ""
          }
          required
          labelClass="!text-blue-400 font-semibold"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          type="submit"
          variant="primary"
          icon={<FaPaperPlane />}
          iconPosition="right"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Soumettre"}
        </Button>
      </motion.div>
    </form>
  );
}
