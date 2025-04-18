"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function KindeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KindeProvider>{children}</KindeProvider>;
}
