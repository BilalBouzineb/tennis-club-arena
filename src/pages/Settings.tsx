
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [courtBookingReminder, setCourtBookingReminder] = useState(true);
  const [tournamentUpdates, setTournamentUpdates] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    setIsDialogOpen(false);
    toast({
      variant: "destructive",
      title: "Request submitted",
      description: "Your account deletion request has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <SettingsIcon className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-3xl font-bold">Account Settings</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about bookings, tournaments and club news</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications" className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get text messages for urgent updates</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="booking-reminders" className="text-base">Court Booking Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders before your scheduled court time</p>
                  </div>
                  <Switch 
                    id="booking-reminders" 
                    checked={courtBookingReminder} 
                    onCheckedChange={setCourtBookingReminder} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tournament-updates" className="text-base">Tournament Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notifications about tournament registrations and results</p>
                  </div>
                  <Switch 
                    id="tournament-updates" 
                    checked={tournamentUpdates} 
                    onCheckedChange={setTournamentUpdates} 
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <Button type="submit">
                  Save Changes
                </Button>
              </form>
            </div>
            
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={toggleDarkMode} 
                />
              </div>
            </div>
            
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
              <p className="text-muted-foreground mb-4">Permanently delete your account and all associated data</p>
              <Button 
                variant="destructive" 
                onClick={() => setIsDialogOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your personal data, court bookings, and tournament registrations will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Yes, Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
