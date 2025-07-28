import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, BarChart3, ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-garage.jpg";

const Index = () => {
  const features = [
    {
      icon: Car,
      title: "Vehicle Management",
      description: "Organize and track your entire vehicle collection in one place"
    },
    {
      icon: Wrench,
      title: "Build Planning",
      description: "Plan, track, and execute modification projects with detailed task management"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Monitor progress, costs, and timelines across all your projects"
    },
    {
      icon: Zap,
      title: "Performance Tracking",
      description: "Document performance gains and modifications over time"
    },
    {
      icon: Shield,
      title: "Maintenance Logs",
      description: "Keep detailed records of maintenance and service history"
    },
    {
      icon: Cpu,
      title: "Smart Insights",
      description: "Get intelligent recommendations for your builds and maintenance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warehouse">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-tech bg-clip-text text-transparent">
            Digital Garage
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate platform for managing your vehicles, planning builds, and tracking progress in a high-tech warehouse environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/garage">
              <Button variant="tech" size="xl" className="shadow-elevated">
                <Car className="w-5 h-5 mr-2" />
                View My Garage
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="warehouse" size="xl" className="shadow-elevated">
                <BarChart3 className="w-5 h-5 mr-2" />
                Project Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Tools for Every Enthusiast</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From weekend warriors to professional builders, our platform provides everything you need to manage your automotive projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elevated transition-all duration-300 bg-card border-warehouse-steel">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-tech rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-steel">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of automotive enthusiasts who trust Digital Garage to manage their builds and track their progress.
          </p>
          <Link to="/garage">
            <Button variant="tech" size="xl" className="shadow-elevated">
              <Car className="w-5 h-5 mr-2" />
              Explore Your Garage
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
