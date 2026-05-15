import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Properties from "@/pages/Properties";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import Team from "@/pages/Team";
import WhatsAppButton from "@/components/WhatsAppButton";
import LiveChat from "@/components/LiveChat";
import AdminLayout from "@/components/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import ConstructionManagement from "@/pages/admin/Construction";
import RealEstateManagement from "@/pages/admin/RealEstate";
import TenantManagement from "@/pages/admin/Tenants";
import FinancialManagement from "@/pages/admin/Finance";
import CRMModule from "@/pages/admin/CRM";
import { useEffect, type ReactNode } from "react";

const queryClient = new QueryClient();

function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;
  return <AdminLayout>{children}</AdminLayout>;
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Switch>
                  {/* Public routes */}
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/services" component={Services} />
                  <Route path="/projects" component={Projects} />
                  <Route path="/properties" component={Properties} />
                  <Route path="/careers" component={Careers} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/gallery" component={Gallery} />
                  <Route path="/team" component={Team} />

                  {/* Admin routes */}
                  <Route path="/admin/login" component={AdminLogin} />
                  <Route path="/admin">
                    <AdminGuard><AdminDashboard /></AdminGuard>
                  </Route>
                  <Route path="/admin/construction">
                    <AdminGuard><ConstructionManagement /></AdminGuard>
                  </Route>
                  <Route path="/admin/real-estate">
                    <AdminGuard><RealEstateManagement /></AdminGuard>
                  </Route>
                  <Route path="/admin/tenants">
                    <AdminGuard><TenantManagement /></AdminGuard>
                  </Route>
                  <Route path="/admin/finance">
                    <AdminGuard><FinancialManagement /></AdminGuard>
                  </Route>
                  <Route path="/admin/crm">
                    <AdminGuard><CRMModule /></AdminGuard>
                  </Route>

                  {/* 404 fallback */}
                  <Route component={NotFound} />
                </Switch>
                <WhatsAppButton />
                <LiveChat />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
