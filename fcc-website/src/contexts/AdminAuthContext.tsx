import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type UserRole =
  | "super_admin"
  | "construction_manager"
  | "project_manager"
  | "site_supervisor"
  | "estate_manager"
  | "property_manager"
  | "estate_agent"
  | "landlord"
  | "tenant"
  | "accountant"
  | "hr_manager"
  | "maintenance_officer"
  | "customer_support";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, "id"> & { password: string }) => void;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const ADMIN_STORAGE_KEY = "fcc_admin_users";
const SESSION_KEY = "fcc_admin_session";

const defaultAdmins: (AdminUser & { password: string })[] = [
  {
    id: "admin-1",
    name: "Super Admin",
    email: "admin@forecity.com",
    password: "Admin@123",
    role: "super_admin",
  },
  {
    id: "admin-2",
    name: "Construction Manager",
    email: "construction@forecity.com",
    password: "Const@123",
    role: "construction_manager",
  },
  {
    id: "admin-3",
    name: "Property Manager",
    email: "property@forecity.com",
    password: "Prop@123",
    role: "property_manager",
  },
  {
    id: "admin-4",
    name: "Accountant",
    email: "finance@forecity.com",
    password: "Finance@123",
    role: "accountant",
  },
  {
    id: "admin-5",
    name: "Estate Manager",
    email: "estate@forecity.com",
    password: "Estate@123",
    role: "estate_manager",
  },
  {
    id: "admin-6",
    name: "HR Manager",
    email: "hr@forecity.com",
    password: "Hr@123",
    role: "hr_manager",
  },
  {
    id: "admin-7",
    name: "Customer Support",
    email: "support@forecity.com",
    password: "Support@123",
    role: "customer_support",
  },
];

function getStoredUsers(): (AdminUser & { password: string })[] {
  try {
    const data = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultAdmins));
  return defaultAdmins;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<(AdminUser & { password: string })[]>(getStoredUsers);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        const found = users.find((u) => u.id === parsed.userId);
        if (found) {
          const { password: _, ...safe } = found;
          setUser(safe);
          setToken(parsed.token);
        }
      }
    } catch {}
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return false;
    const { password: _, ...safe } = found;
    const fakeToken = `fcc_jwt_${found.id}_${Date.now()}`;
    setUser(safe);
    setToken(fakeToken);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: found.id, token: fakeToken }));
    return true;
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const hasRole = useCallback((...roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === "super_admin") return true;
    return roles.includes(user.role);
  }, [user]);

  const addUser = useCallback((newUser: Omit<AdminUser, "id"> & { password: string }) => {
    const id = `admin-${Date.now()}`;
    setUsers((prev) => {
      const updated = [...prev, { ...newUser, id }];
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateUser = useCallback((id: string, data: Partial<AdminUser>) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === id ? { ...u, ...data } : u));
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    if (user?.id === id) {
      setUser((prev) => (prev ? { ...prev, ...data } : prev));
    }
  }, [user]);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        users: users.map(({ password: _, ...u }) => u),
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
