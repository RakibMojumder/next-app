
import { logout } from "@/actions/action";
import { cookies } from "next/headers";

const Home = async () => {
  const user = JSON.parse(cookies().get('user').value);

  return (
    <div className="min-h-svh flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-2xl lg:text-5xl text-center font-bold">Welcome <span className="text-violet-500">{user.name}</span></h1>
      <form action={logout}>
        <button
          className="px-8 py-2 bg-violet-500 text-white uppercase font-medium rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default Home;