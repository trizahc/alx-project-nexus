// hooks/useAdminAuth.ts
import useUserAuth from "./userAuth";

export default function useAdminAuth() {
  const { user, logout } = useUserAuth();
  const isAdmin =
    (user as any)?.is_admin || (user as any)?.is_staff || false;

  return { user, isAdmin, logout };
}
