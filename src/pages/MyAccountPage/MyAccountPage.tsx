import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/app/hooks";

export default function MyAccountPage() {
  const currentUser = useAppSelector((state) => state.user);

  return (
    <div className="max-w-2xl mx-auto w-full border mt-10">
      <form className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-center">User Info</h1>

        <div className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Name
            <Input
              type="text"
              className="border rounded w-full p-2 font-normal disabled:font-bold"
              id="name"
              disabled
              value={currentUser.user?.name}
            />
          </label>

          <label
            htmlFor="email"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Email
            <Input
              type="email"
              className="border rounded w-full p-2 font-normal disabled:font-bold"
              id="email"
              disabled
              value={currentUser.user?.email}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
