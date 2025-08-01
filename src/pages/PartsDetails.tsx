import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Package, DollarSign, Calendar, Wrench, ExternalLink, Edit, Trash2 } from "lucide-react";

interface Part {
  id: string;
  name: string;
  partNumber: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: "ordered" | "delivered" | "installed" | "pending";
  orderDate?: string;
  deliveryDate?: string;
  supplier: string;
  notes?: string;
  warranty: string;
  category: string;
}

const mockParts: Part[] = [
  {
    id: "1",
    name: "Performance Camshaft",
    partNumber: "CAM-456-PERF",
    brand: "SpeedMaster",
    quantity: 1,
    unitPrice: 1200,
    totalPrice: 1200,
    status: "delivered",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-12",
    supplier: "Performance Parts Plus",
    notes: "High-lift performance cam for increased power",
    warranty: "2 years",
    category: "Engine"
  },
  {
    id: "2",
    name: "Cylinder Bore Kit",
    partNumber: "CYL-789-BORE",
    brand: "Precision Machining",
    quantity: 1,
    unitPrice: 2500,
    totalPrice: 2500,
    status: "installed",
    orderDate: "2023-12-20",
    deliveryDate: "2024-01-03",
    supplier: "Machine Shop Pro",
    notes: "Custom bore to 0.030 over",
    warranty: "1 year",
    category: "Engine"
  },
  {
    id: "3",
    name: "Performance Gasket Set",
    partNumber: "GAS-123-PERF",
    brand: "Fel-Pro",
    quantity: 1,
    unitPrice: 500,
    totalPrice: 500,
    status: "ordered",
    orderDate: "2024-01-15",
    supplier: "AutoZone",
    notes: "Complete engine gasket kit",
    warranty: "90 days",
    category: "Engine"
  }
];

const PartsDetails = () => {
  const { buildId } = useParams();
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-muted";
      case "ordered": return "bg-warehouse-warning";
      case "delivered": return "bg-warehouse-accent";
      case "installed": return "bg-warehouse-success";
      default: return "bg-muted";
    }
  };

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = parts.reduce((sum, part) => sum + part.totalPrice, 0);
  const installedParts = parts.filter(p => p.status === "installed").length;
  const pendingParts = parts.filter(p => p.status === "pending" || p.status === "ordered").length;

  return (
    <div className="min-h-screen bg-gradient-warehouse">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Parts & Details</h1>
            <p className="text-muted-foreground">Build Plan: Engine Performance Upgrade</p>
          </div>
          <Button variant="tech" size="lg" className="shadow-elevated">
            <Plus className="w-5 h-5 mr-2" />
            Add Part
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-warehouse-steel shadow-warehouse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-warehouse-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Parts</p>
                  <p className="text-2xl font-bold">{parts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-warehouse-steel shadow-warehouse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-warehouse-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-warehouse-steel shadow-warehouse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-warehouse-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Installed</p>
                  <p className="text-2xl font-bold">{installedParts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-warehouse-steel shadow-warehouse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-warehouse-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingParts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-card border-warehouse-steel shadow-warehouse mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search parts, part numbers, or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="warehouse">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Parts List */}
        <div className="space-y-4">
          {filteredParts.map((part) => (
            <Card key={part.id} className="bg-card border-warehouse-steel shadow-warehouse">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl">{part.name}</CardTitle>
                      <Badge className={`${getStatusColor(part.status)} text-white`}>
                        {part.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Part #:</span> {part.partNumber}
                      </div>
                      <div>
                        <span className="font-medium">Brand:</span> {part.brand}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {part.category}
                      </div>
                      <div>
                        <span className="font-medium">Warranty:</span> {part.warranty}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Pricing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{part.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Price:</span>
                        <span>${part.unitPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${part.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Order Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Supplier:</span>
                        <span>{part.supplier}</span>
                      </div>
                      {part.orderDate && (
                        <div className="flex justify-between">
                          <span>Order Date:</span>
                          <span>{part.orderDate}</span>
                        </div>
                      )}
                      {part.deliveryDate && (
                        <div className="flex justify-between">
                          <span>Delivery:</span>
                          <span>{part.deliveryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {part.notes || "No notes available"}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Supplier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartsDetails;