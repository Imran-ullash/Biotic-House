"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserAddress {
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  institution?: string;
  address?: UserAddress;
  verifiedResearcher?: boolean;
  memberSince?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    institution?: string;
    password?: string;
  }) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateAddress: (address: UserAddress) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "bh_user_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user authentication session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (userData: UserProfile | null) => {
    setUser(userData);
    try {
      if (userData) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist user session:", e);
    }
  };

  const login = async (email: string): Promise<boolean> => {
    // Generate name from email or use existing stored user profile
    const existing = user && user.email === email ? user : null;
    const namePart = email.split("@")[0] || "Researcher";
    const fallbackFirst = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const loggedInUser: UserProfile = existing || {
      firstName: fallbackFirst,
      lastName: "Researcher",
      email: email,
      phone: "+1 (555) 234-5678",
      institution: "BioMed Analytical Lab",
      verifiedResearcher: true,
      memberSince: new Date().getFullYear().toString(),
      address: {
        street: "100 Science Park Blvd",
        city: "San Diego",
        state: "CA",
        zip: "92121",
        country: "United States",
      },
    };

    saveUserSession(loggedInUser);
    return true;
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    institution?: string;
  }): Promise<boolean> => {
    const newUser: UserProfile = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || undefined,
      institution: data.institution?.trim() || undefined,
      verifiedResearcher: true,
      memberSince: new Date().getFullYear().toString(),
      address: {
        street: "",
        city: "",
        state: "CA",
        zip: "",
        country: "United States",
      },
    };

    saveUserSession(newUser);
    return true;
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUserSession(updated);
  };

  const updateAddress = (address: UserAddress) => {
    if (!user) return;
    const updated = { ...user, address: { ...user.address, ...address } };
    saveUserSession(updated);
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        updateProfile,
        updateAddress,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
