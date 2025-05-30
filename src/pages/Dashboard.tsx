
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { ReservedNotes } from "@/components/dashboard/ReservedNotes";
import { AccountSettings } from "@/components/dashboard/AccountSettings";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FavoriteNotes } from "@/components/dashboard/FavoriteNotes";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto p-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes">Reserved Notes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes">
            <Card className="p-6">
              <ReservedNotes />
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card className="p-6">
              <FavoriteNotes />
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card className="p-6">
              <ProfileForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6">
              <AccountSettings />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
