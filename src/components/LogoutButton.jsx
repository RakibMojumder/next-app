"use client";

import { cookies } from "next/headers";
import {} from "";

const LogoutButton = () => {
  const handleClick = async () => {
    "use server";
    cookies().delete("user");
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-2 bg-violet-500 text-white uppercase font-medium rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
