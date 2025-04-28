"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { createStudent } from "@/app/actions/createStudent"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function StudentDialog({ open, onOpenChange, student }) {
  const isEditing = !!student
  const isMobile = useIsMobile()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    matNo: "",
    department: "",
    cgpa: "",
    email: "",
    phone: "",
    gender: "",
    level: "",
    status: "Active",
  })

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        matNo: student.matNo,
        department: student.department,
        cgpa: student.cgpa.toString(),
        email: student.email,
        phone: student.phone,
        gender: student.gender,
        level: student.level.toString(),
        status: student.status,
      })
    } else {
      setFormData({
        name: "",
        matNo: "",
        department: "",
        cgpa: "",
        email: "",
        phone: "",
        gender: "",
        level: "",
        status: "Active",
      })
    }
  }, [student])

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await createStudent(formData);
      
      if (res.success) {
        toast({ title: "Student created" });
        setFormData(initialState); // Reset form
        onOpenChange(false); // Close modal
        router.refresh(); // Soft refresh (Next.js)
        // OR: mutate('/api/students') for SWR
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the student's information below." : "Fill in the student's information below."}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-5">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matNo">Matriculation Number</Label>
                  <Input
                    id="matNo"
                    value={formData.matNo}
                    onChange={(e) => handleChange("matNo", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)} required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                      <SelectItem value="Dropped out">Dropped out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleChange("department", value)}
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Law">Law</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleChange("level", value)} required>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  type="number"
                  min="0"
                  max="5"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(e) => handleChange("cgpa", e.target.value)}
                  required
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            {isEditing ? (<Button type="submit" className="w-full sm:w-auto">
              &quot;Update Student&quot;
            </Button>) : <Button>
              {isLoading ? <Loader2 className="animate-spin"/> : "Add Student"}
              </Button>}
            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
