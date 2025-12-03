"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, toggleAuthModal } = useUI();
  const { login, signup, user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const justOpenedRef = useRef(false);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Too short" };
    if (password.length < 8) return { strength: 2, label: "Weak" };
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;
    if (score <= 2) return { strength: 2, label: "Weak" };
    if (score === 3) return { strength: 3, label: "Good" };
    return { strength: 4, label: "Strong" };
  };

  const passwordStrength = isSignup ? getPasswordStrength(password) : null;

  // Reset form when modal opens/closes
  useEffect(() => {
    if (authModalOpen) {
      justOpenedRef.current = true;
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setEmailError("");
      setPasswordError("");
      setNameError("");
      setShowPassword(false);
      setSuccess(false);
      setIsSignup(false);
      // Reset the flag after a short delay to prevent immediate closing
      setTimeout(() => {
        justOpenedRef.current = false;
      }, 100);
      // Focus email input after a short delay
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 150);
    }
  }, [authModalOpen]);

  // Focus appropriate input when switching between login/signup
  useEffect(() => {
    if (authModalOpen) {
      setTimeout(() => {
        if (isSignup && nameInputRef.current) {
          nameInputRef.current.focus();
        } else if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 50);
    }
  }, [isSignup, authModalOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && authModalOpen) {
        setAuthModalOpen(false);
      }
    };

    if (authModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [authModalOpen, setAuthModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModalOpen]);

  // Real-time validation
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (isSignup && password) {
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [password, isSignup]);

  useEffect(() => {
    if (isSignup && name && name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
  }, [name, isSignup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");
    setNameError("");

    // Validation
    let isValid = true;

    if (isSignup) {
      if (!name.trim()) {
        setNameError("Name is required");
        isValid = false;
      } else if (name.trim().length < 2) {
        setNameError("Name must be at least 2 characters");
        isValid = false;
      }

      if (!email.trim()) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      }

      if (!password.trim()) {
        setPasswordError("Password is required");
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        isValid = false;
      }
    } else {
      if (!email.trim()) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      }

      if (!password.trim()) {
        setPasswordError("Password is required");
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      let result = false;

      if (isSignup) {
        result = await signup(name.trim(), email.trim(), password);
        if (!result) {
          setError("An account with this email already exists");
        }
      } else {
        result = await login(email.trim(), password);
        if (!result) {
          setError("Invalid email or password");
        }
      }

      if (result) {
        if (isSignup) {
          // For signup, show success and switch to login view
          const signupEmail = email.trim(); // Save email before clearing
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setIsSignup(false); // Switch to login view
            setEmail(signupEmail); // Pre-fill email for login
            setPassword(""); // Clear password
            setName(""); // Clear name
            setError("");
            setEmailError("");
            setPasswordError("");
            setNameError("");
            // Focus email input after switching to login
            setTimeout(() => {
              emailInputRef.current?.focus();
            }, 100);
          }, 2000);
        } else {
          // For login, show success and close modal
          setSuccess(true);
          setTimeout(() => {
            setAuthModalOpen(false);
            setEmail("");
            setPassword("");
            setName("");
            setError("");
            setEmailError("");
            setPasswordError("");
            setNameError("");
            setSuccess(false);
            setIsSignup(false);
          }, 1500);
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close modal if user is already logged in
  useEffect(() => {
    if (user && authModalOpen) {
      setAuthModalOpen(false);
    }
  }, [user, authModalOpen, setAuthModalOpen]);

  if (!authModalOpen || user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={() => {
          // Prevent closing immediately after opening
          if (!justOpenedRef.current) {
            setAuthModalOpen(false);
          }
        }}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        {/* Modal Content */}
        <div
          ref={modalRef}
          className={cn(
            "bg-[#F5F1EB] rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 relative pointer-events-auto",
            authModalOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          )}
          onClick={(e) => {
            // Prevent clicks inside modal from closing it
            e.stopPropagation();
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-1.5 transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Success State */}
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {isSignup ? "Account Created!" : "Welcome Back!"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isSignup
                  ? "Your account has been created successfully. Please sign in to continue."
                  : "You have been successfully signed in"}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {isSignup ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isSignup
                    ? "Sign up to start your coffee journey"
                    : "Sign in to your account"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                          "bg-white/90 border-gray-300 pl-10 pr-4 focus-visible:outline-none focus-visible:ring-0 transition-all",
                          nameError
                            ? "border-red-300 focus-visible:border-red-400"
                            : ""
                        )}
                      />
                    </div>
                    {nameError && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {nameError}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      ref={emailInputRef}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "bg-white/90 border-gray-300 pl-10 pr-4 focus-visible:outline-none focus-visible:ring-0 transition-all",
                        emailError
                          ? "border-red-300 focus-visible:border-red-400"
                          : ""
                      )}
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>
                    {!isSignup && (
                      <button
                        type="button"
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                        onClick={() => {
                          // Forgot password functionality can be added later
                        }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "bg-white/90 border-gray-300 pl-10 pr-10 focus-visible:outline-none focus-visible:ring-0 transition-all",
                        passwordError
                          ? "border-red-300 focus-visible:border-red-400"
                          : ""
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {passwordError}
                    </p>
                  )}
                  {isSignup &&
                    password &&
                    !passwordError &&
                    passwordStrength && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Password strength:
                          </span>
                          <span
                            className={cn(
                              "font-medium",
                              passwordStrength.strength <= 2
                                ? "text-red-600"
                                : passwordStrength.strength === 3
                                ? "text-yellow-600"
                                : "text-green-600"
                            )}
                          >
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-300",
                              passwordStrength.strength <= 2
                                ? "bg-red-500"
                                : passwordStrength.strength === 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            )}
                            style={{
                              width: `${
                                (passwordStrength.strength / 4) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                </div>

                {error && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-medium transition-all duration-200 disabled:opacity-50"
                  disabled={
                    loading || !!emailError || !!passwordError || !!nameError
                  }
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Please wait...
                    </>
                  ) : isSignup ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isSignup
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsSignup(!isSignup);
                      setError("");
                      setEmailError("");
                      setPasswordError("");
                      setNameError("");
                    }}
                    className="text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
                  >
                    {isSignup ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
