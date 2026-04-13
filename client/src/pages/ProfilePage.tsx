import ProfileView from "@/components/Profile/ProfileView";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function ProfilePage() {
  const { getProfile, user, isLoading, error } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <main className="bg-slate-950 px-4 py-8 sm:px-8 sm:py-12 grid gap-8 grid-cols-1 md:grid-cols-2">
      {isLoading && (
        <div className="flex justify-center items-center py-24">
          <p className="text-gray-400 text-lg">Loading Profile ...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center py-24">
          <p className="px-4 py-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400">{error}</p>
        </div>
      )}
      {!isLoading && !error && user && <ProfileView user={user} />}
    </main>
  );
}
