"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/Toast";
import { AnimatePresence } from "framer-motion";

const SignUpPage = () => {
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
    const res = await axios.post("/api/user/sign-up", data);
    setData(res.data);
    if (res.data.success) {
      setLoading(false);
      router.push("/sign-in");
    } else {
      setLoading(false);
      setToast(true);
    }
  };

  return (
    <>
      <div className="min-h-svh flex justify-center items-center">
        <div className="lg:w-1/2 xl:w-1/4 p-5 border rounded">
          <h2 className="text-2xl font-semibold uppercase text-center mb-5">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-sm space-y-3">
            <Input
              type={"text"}
              placeholder={"Your name"}
              name={"username"}
              register={register}
              errors={errors}
            />

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
            Already have an account?
            <Link
              href={"/sign-in"}
              className="text-violet-500 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <AnimatePresence>
        {toast && <Toast data={data} setToast={setToast} />}
      </AnimatePresence>
    </>
  );
};

export default SignUpPage;
