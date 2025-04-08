// /app/cam/page.tsx

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import CameraPage  from "@/component/CameraPage"; // Adjusted path to locate the module

export const dynamic = "force-dynamic"; // Allow SSR

export default async function ProtectedCameraPage() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }

  return <CameraPage />;
}
