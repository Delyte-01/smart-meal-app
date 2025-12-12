"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/suparbaseClient";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const LogIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const initialMode = searchParams.get("mode") === "login";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(initialMode);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { name, email, password } = formData;

    try {
      if (isLogin) {
        // ✅ LOGIN flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("No account found. Please sign up first.");
          } else {
            setMessage(error.message);
            toast.error("Login failed. Please try again.");
          }
          return;
        }

        toast.success("Login successful!");
        // Redirect with replace to avoid back navigation issues
        router.replace("/dashboard");
      } else {
        // ✅ SIGNUP flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) {
          setMessage(error.message);
          toast.error("Signup failed: " + error.message);
          return;
        }

        if (data.user) {
          // Create profile after successful signup
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert([{ id: data.user.id, full_name: name }]);

          if (profileError) {
            console.error("Profile creation error:", profileError);
            toast.success(
              "Account created, but profile setup failed. Please update your profile later."
            );
          } else {
            toast.success(
              "Account created successfully! Please check your email to confirm your account."
            );
          }

          // Switch to login mode after successful signup
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
      // Only clear form on success
      setFormData({ name: "", email: "", password: "" });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex bg-white w-full mx-auto rounded-3xl overflow-clip shadow">
      <div className="flex-1 flex items-center justify-center p-8 bg-form">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            {!isLogin && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-primary text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-form-input border-form-input-border focus:border-primary focus:ring-1 focus:ring-primary"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-form-input border-form-input-border focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={"password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-form-input border-form-input-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full bg-[#16a249] text-white hover:bg-[#16a249af] cursor-pointer py-3 rounded-lg font-medium`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-form-input-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-form px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className="space-y-3 flex gap-2.5 justify-center border w-full bg-white text-black hover:text-white hover:bg-black/30 cursor-pointer transition-all duration-700 ease-in-out"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#2f67bc"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#237a3c"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#c39205"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#c9362d"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLogin ? "Log In" : "Sign Up"} with Google
          </Button>

          {message && <p className="text-sm text-red-500">{message}</p>}

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
                className="text-primary bg-transparent hover:bg-transparent shadow-none cursor-pointer hover:underline font-medium"
                disabled={loading}
              >
                {isLogin ? "Create an account" : "Log in"}
              </Button>
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By signing up to create an account I accept Company's{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1  p-5">
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dk5mfu099/image/upload/v1753518144/photo-1659603903007-28c60a54687d_sqesju.jpg"
            }
            alt="sign-up-image"
            quality={90}
            priority
            fill
            className="object-cover object-center rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
