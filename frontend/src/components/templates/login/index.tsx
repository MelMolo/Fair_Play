"use client";

import Button from "@/components/reusable/buttons";
import { login } from "@/lib/server/authenticate";
import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputField from "@/components/reusable/input";
import toast from "react-hot-toast";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, formAction, pending] = useActionState(
    () => login("", formData),
    undefined
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      console.log(error);
    }
  }, [error]);

  return (
    <form
      action={formAction}
      className="w-full mt-8 max-w-sm mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl space-y-5"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
        Admin
      </h2>

      <div className="space-y-4">
        <InputField
          name="email"
          type="text"
          label="Email"
          placeholder="Entrez votre mots de passe"
          value={formData.email}
          onChange={(val) => setFormData({ ...formData, email: val })}
          required
          labelClass="!text-blue-400 font-semibold"
        />

        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="Entrez votre mots de passe"
          value={formData.password}
          onChange={(val) => setFormData({ ...formData, password: val })}
          required
          labelClass="!text-blue-400 font-semibold"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full flex justify-center items-center"
        >
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Logging..." : "Login"}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
