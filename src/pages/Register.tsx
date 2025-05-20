
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>Join our tennis community today</CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
