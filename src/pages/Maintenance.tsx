import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, DollarSign, Wrench, FileText, ArrowLeft, AlertTriangle } from "lucide-react";

interface MaintenanceRecord {
  id: string;
  date: string;
  type: "routine" | "repair" | "inspection" | "emergency";
  category: "engine" | "brakes" | "tires" | "electrical" | "transmission" | "other";
  description: string;
  cost: number;
  mileage: number;
  technician: string;
  location: string;
  notes?: string;
  status: "completed" | "scheduled" | "in-progress";
  nextDue?: string;
}

const mockRecords: MaintenanceRecord[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "routine",
    category: "engine",
    description: "Oil Change & Filter Replacement",
    cost: 85.99,
    mileage: 45230,
    technician: "Mike Johnson",
    location: "AutoCare Plus",
    status: "completed",
    nextDue: "2024-04-15"
  },
  {
    id: "2",
    date: "2024-01-10",
    type: "repair",
    category: "brakes",
    description: "Front Brake Pad Replacement",
    cost: 245.50,
    mileage: 45150,
    technician: "Sarah Chen",
    location: "Brake Masters",
    status: "completed"
  },
  {
    id: "3",
    date: "2024-01-05",
    type: "inspection",
    category: "other",
    description: "Annual Safety Inspection",
    cost: 35.00,
    mileage: 45100,
    technician: "Tom Wilson",
    location: "State Inspection Center",
    status: "completed",
    nextDue: "2025-01-05"
  }
];

const Maintenance = () => {
  const { vehicleId } = useParams();
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockRecords);
  const [newRecord, setNewRecord] = useState<Partial<MaintenanceRecord>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "routine": return "bg-warehouse-success";
      case "repair": return "bg-warehouse-warning";
      case "inspection": return "bg-primary";
      case "emergency": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "engine": return "🔧";
      case "brakes": return "🛑";
      case "tires": return "🚗";
      case "electrical": return "⚡";
      case "transmission": return "⚙️";
      default: return "🔨";
    }
  };

  const handleAddRecord = () => {
    if (newRecord.description && newRecord.date && newRecord.type && newRecord.category) {
      const record: MaintenanceRecord = {
        id: Date.now().toString(),
        date: newRecord.date!,
        type: newRecord.type as any,
        category: newRecord.category as any,
        description: newRecord.description,
        cost: newRecord.cost || 0,
        mileage: newRecord.mileage || 0,
        technician: newRecord.technician || "",
        location: newRecord.location || "",
        notes: newRecord.notes,
        status: "completed"
      };
      setRecords([record, ...records]);
      setNewRecord({});
      setIsDialogOpen(false);
    }
  };

  const totalCost = records.reduce((sum, record) => sum + record.cost, 0);
  const recentRecords = records.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-warehouse">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/garage">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Garage
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2">Digital Maintenance Records</h1>
            <p className="text-muted-foreground">Vehicle ID: {vehicleId}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-warehouse-steel">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold">{records.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-warehouse-steel">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-warehouse-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-warehouse-steel">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Service</p>
                  <p className="text-2xl font-bold">{records[0]?.date || "N/A"}</p>
                </div>
                <Calendar className="w-8 h-8 text-warehouse-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-warehouse-steel">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue Items</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Record Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Maintenance Log</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="tech" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Maintenance Record</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newRecord.date || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newRecord.type} onValueChange={(value) => setNewRecord({ ...newRecord, type: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newRecord.category} onValueChange={(value) => setNewRecord({ ...newRecord, category: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Engine</SelectItem>
                      <SelectItem value="brakes">Brakes</SelectItem>
                      <SelectItem value="tires">Tires</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="transmission">Transmission</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={newRecord.cost || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, cost: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={newRecord.mileage || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, mileage: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technician">Technician</Label>
                  <Input
                    id="technician"
                    value={newRecord.technician || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, technician: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newRecord.description || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newRecord.location || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newRecord.notes || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="tech" onClick={handleAddRecord}>
                  Add Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Maintenance Records */}
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="bg-card border-warehouse-steel hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getCategoryIcon(record.category)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{record.description}</h3>
                        <Badge className={`${getTypeColor(record.type)} text-white`}>
                          {record.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Date:</span> {record.date}
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span> ${record.cost.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Mileage:</span> {record.mileage.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Technician:</span> {record.technician}
                        </div>
                      </div>
                      {record.location && (
                        <div className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Location:</span> {record.location}
                        </div>
                      )}
                      {record.nextDue && (
                        <div className="text-sm text-warehouse-warning mt-1">
                          <span className="font-medium">Next Due:</span> {record.nextDue}
                        </div>
                      )}
                      {record.notes && (
                        <div className="text-sm text-muted-foreground mt-2 p-2 bg-secondary rounded">
                          <span className="font-medium">Notes:</span> {record.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Wrench className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;