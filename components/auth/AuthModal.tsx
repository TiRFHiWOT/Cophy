"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useUI();
  const { login, signup, user } = useAuth();
  const router = useRouter();
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
    if (password.length < 6) return { strength: 1, label: "TOO SHORT" };
    if (password.length < 8) return { strength: 2, label: "WEAK" };
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;
    if (score <= 2) return { strength: 2, label: "WEAK" };
    if (score === 3) return { strength: 3, label: "GOOD" };
    return { strength: 4, label: "STRONG" };
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
      setTimeout(() => {
        justOpenedRef.current = false;
      }, 100);
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
    }
  }, [authModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");
    setNameError("");

    let isValid = true;
    if (isSignup) {
      if (!name.trim()) {
        setNameError("Name is required");
        isValid = false;
      }
      if (!email.trim() || !validateEmail(email)) {
        setEmailError("Valid email required");
        isValid = false;
      }
      if (!password.trim() || password.length < 6) {
        setPasswordError("Min. 6 characters required");
        isValid = false;
      }
    } else {
      if (!email.trim() || !validateEmail(email)) {
        setEmailError("Valid email required");
        isValid = false;
      }
      if (!password.trim()) {
        setPasswordError("Password required");
        isValid = false;
      }
    }

    if (!isValid) return;

    setLoading(true);

    try {
      let result = false;
      if (isSignup) {
        result = await signup(name.trim(), email.trim(), password);
        if (!result) setError("Account already exists with this email.");
      } else {
        result = await login(email.trim(), password);
        if (!result) setError("Invalid credentials. Access denied.");
      }

      if (result) {
        setSuccess(true);
        if (isSignup) {
          const signupEmail = email.trim();
          setTimeout(() => {
            setSuccess(false);
            setIsSignup(false);
            setEmail(signupEmail);
            setPassword("");
            setName("");
          }, 2000);
        } else {
          setTimeout(() => {
            setAuthModalOpen(false);
            setSuccess(false);
            router.push("/portal");
          }, 1500);
        }
      }
    } catch (err) {
      setError("System error during authentication.");
    } finally {
      setLoading(false);
    }
  };

  if (!authModalOpen || user) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-lot-forest/80 backdrop-blur-md z-[100] transition-opacity duration-500"
        onClick={() => !justOpenedRef.current && setAuthModalOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className={cn(
            "bg-lot-paper border border-lot-earth/20 shadow-[-20px_20px_60px_rgba(0,0,0,0.3)] w-full max-w-lg overflow-hidden transform transition-all duration-500 relative pointer-events-auto",
            authModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Industrial Bar */}
          <div className="h-2 bg-lot-amber w-full" />
          
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-6 right-6 text-lot-forest/40 hover:text-lot-forest hover:bg-lot-forest/5 rounded-none p-2 transition-all duration-200 z-10"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-10 md:p-14">
            {success ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-lot-forest/5 mb-8">
                  <ShieldCheck className="h-10 w-10 text-lot-amber" />
                </div>
                <h2 className="text-3xl font-serif font-black text-lot-forest mb-4 italic tracking-tighter">
                  {isSignup ? "ID PROVISIONED" : "ACCESS GRANTED"}
                </h2>
                <div className="h-px w-12 bg-lot-amber mx-auto mb-6" />
                <p className="text-[10px] font-bold text-lot-earth/60 uppercase tracking-[0.3em]">
                  {isSignup ? "Direct exchange credentials established." : "Redirecting to Trade Desk..."}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-8 bg-lot-amber" />
                    <span className="text-[10px] font-bold tracking-[0.4em] text-lot-earth uppercase">
                      Portal Entrance
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-black text-lot-forest mb-4 italic tracking-tighter">
                    {isSignup ? "Join Exchange" : "Welcome Back"}
                  </h2>
                  <p className="text-xs text-lot-earth/70 font-light leading-relaxed max-w-xs">
                    Access technical lot specifications, logistics data, and direct export tools.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSignup && (
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-[10px] font-black text-lot-forest uppercase tracking-widest">
                        Legal Entity Name
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-forest/30 group-focus-within:text-lot-amber transition-colors" />
                        <Input
                          ref={nameInputRef}
                          id="name"
                          placeholder="ENTER NAME"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white border-lot-earth/10 rounded-none h-14 pl-12 pr-4 focus-visible:ring-0 focus-visible:border-lot-amber transition-all text-sm font-bold placeholder:text-lot-earth/20"
                        />
                      </div>
                      {nameError && <p className="text-[9px] text-red-600 font-bold uppercase tracking-widest mt-1 italic">{nameError}</p>}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[10px] font-black text-lot-forest uppercase tracking-widest">
                      Corporate Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-forest/30 group-focus-within:text-lot-amber transition-colors" />
                      <Input
                        ref={emailInputRef}
                        id="email"
                        type="email"
                        placeholder="EMAIL@LOT251.COM"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-lot-earth/10 rounded-none h-14 pl-12 pr-4 focus-visible:ring-0 focus-visible:border-lot-amber transition-all text-sm font-bold placeholder:text-lot-earth/20"
                      />
                    </div>
                    {emailError && <p className="text-[9px] text-red-600 font-bold uppercase tracking-widest mt-1 italic">{emailError}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-[10px] font-black text-lot-forest uppercase tracking-widest">
                        Secure Key Phrase
                      </Label>
                      {!isSignup && (
                        <button type="button" className="text-[9px] font-bold text-lot-amber hover:text-lot-forest transition-colors uppercase tracking-widest">
                          Reset Access?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-forest/30 group-focus-within:text-lot-amber transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white border-lot-earth/10 rounded-none h-14 pl-12 pr-12 focus-visible:ring-0 focus-visible:border-lot-amber transition-all text-sm font-bold placeholder:text-lot-earth/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-lot-forest/30 hover:text-lot-forest transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-[9px] text-red-600 font-bold uppercase tracking-widest mt-1 italic">{passwordError}</p>}
                    
                    {isSignup && password && !passwordError && passwordStrength && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-[8px] font-bold tracking-widest uppercase mb-1">
                          <span className="text-lot-earth/40">Security Density</span>
                          <span className={cn(
                            passwordStrength.strength <= 2 ? "text-red-600" : 
                            passwordStrength.strength === 3 ? "text-amber-500" : "text-emerald-600"
                          )}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="h-1 bg-lot-forest/5 rounded-none overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4].map((step) => (
                            <div 
                              key={step}
                              className={cn(
                                "h-full flex-1 transition-all duration-500",
                                step <= passwordStrength.strength 
                                  ? (passwordStrength.strength <= 2 ? "bg-red-500" : 
                                     passwordStrength.strength === 3 ? "bg-amber-500" : "bg-emerald-500")
                                  : "bg-transparent"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-relaxed">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-lot-forest hover:bg-lot-forest/90 text-white h-16 rounded-none text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 group shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-3">
                        {isSignup ? "Establish Connection" : "Authorize Entry"}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-lot-earth/10 text-center">
                  <p className="text-[10px] font-bold text-lot-earth/50 uppercase tracking-[0.2em]">
                    {isSignup ? "Already registered on the exchange?" : "New to Lot 251 Global Logistics?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignup(!isSignup);
                        setError("");
                      }}
                      className="ml-2 text-lot-amber hover:text-lot-forest transition-colors underline-offset-4 hover:underline"
                    >
                      {isSignup ? "Sign In" : "Request Account"}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
