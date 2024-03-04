"use client";

import Input from "@/components/Input";
import Toast from "@/components/Toast";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await axios.post("/api/user/sign-in", data);
    setData(res.data);
    if (res.data.success) {
      setLoading(false);
      router.push("/");
    } else {
      setToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="lg:w-1/2 xl:w-1/4 p-5 border rounded">
        <h2 className="text-2xl font-semibold uppercase text-center mb-5">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-sm space-y-3">
          <Input
            type={"email"}
            placeholder={"Your email"}
            name={"email"}
            register={register}
            errors={errors}
          />
          <Input
            type={"password"}
            placeholder={"Your password"}
            name={"password"}
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="w-full py-1.5 bg-violet-500 text-white rounded uppercase font-medium"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <p className="text-sm mt-5 text-center">
          Do not have an account?
          <Link
            href={"/sign-up"}
            className="text-violet-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
      <AnimatePresence>
        {toast && <Toast data={data} setToast={setToast} />}
      </AnimatePresence>
    </div>
  );
};

export default SignInPage;
