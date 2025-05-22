
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now login.",
      });
      
      // For demo purposes - in real app, would redirect or update auth state
      console.log("Register with:", formData);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="tennis-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="tennis-input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="tennis-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="tennis-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="tennis-input"
          />
        </div>
        <div className="text-sm text-gray-500">
          By registering, you agree to our{" "}
          <Link to="/terms" className="text-tennis-green hover:text-tennis-green-dark">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-tennis-green hover:text-tennis-green-dark">
            Privacy Policy
          </Link>
          .
        </div>
        <Button
          type="submit"
          className="w-full bg-tennis-green hover:bg-tennis-green-dark"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Register"}
        </Button>
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-tennis-green hover:text-tennis-green-dark"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
