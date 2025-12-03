"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple hash function for MVP (not production-ready)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

// Cookie utility functions
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

const STORAGE_KEY = "coffee_user"; // For active session (localStorage)
const COOKIE_KEY = "coffee_user_account"; // For account data (cookies)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount (active session)
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({ name: userData.name, email: userData.email });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Normalize inputs
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      // First check cookies for account data
      const cookieData = getCookie(COOKIE_KEY);
      let userData = null;

      if (cookieData) {
        try {
          userData = JSON.parse(cookieData);
        } catch (error) {
          console.error("Error parsing cookie data:", error);
        }
      }

      // If no cookie data, check localStorage (for backward compatibility)
      if (!userData) {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          try {
            userData = JSON.parse(storedData);
          } catch (error) {
            console.error("Error parsing stored data:", error);
            return false;
          }
        }
      }

      if (!userData) {
        return false;
      }

      // Get stored email (handle both old and new formats)
      const storedEmail = userData.email?.trim() || "";
      const storedEmailNormalized = storedEmail.toLowerCase();

      // Normalize password (trimmed) before hashing
      const passwordHash = simpleHash(normalizedPassword);

      // Compare normalized email (case-insensitive) and password hash
      if (
        storedEmailNormalized === normalizedEmail &&
        userData.passwordHash === passwordHash
      ) {
        // Set user state and store in localStorage for active session
        const sessionData = {
          name: userData.name,
          email: normalizedEmail,
          passwordHash: userData.passwordHash,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
        setUser({ name: userData.name, email: normalizedEmail });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Normalize inputs
      const normalizedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      // Check if user already exists in cookies
      const cookieData = getCookie(COOKIE_KEY);
      if (cookieData) {
        try {
          const userData = JSON.parse(cookieData);
          const storedEmail = userData.email?.trim().toLowerCase();
          if (storedEmail === normalizedEmail) {
            return false; // User already exists
          }
        } catch (error) {
          // If cookie parsing fails, continue with signup
        }
      }

      // Check localStorage for backward compatibility
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        try {
          const userData = JSON.parse(storedData);
          const storedEmail = userData.email?.trim().toLowerCase();
          if (storedEmail === normalizedEmail) {
            return false; // User already exists
          }
        } catch (error) {
          // If parsing fails, continue with signup
        }
      }

      const passwordHash = simpleHash(normalizedPassword);
      const userData = {
        name: normalizedName,
        email: normalizedEmail,
        passwordHash,
      };

      // Store in cookies (persistent, survives logout)
      setCookie(COOKIE_KEY, JSON.stringify(userData), 365);

      // DO NOT set user state or localStorage - user must log in separately
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    // Only clear localStorage (active session)
    // Keep cookies intact so account persists
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const getCurrentUser = (): User | null => {
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
