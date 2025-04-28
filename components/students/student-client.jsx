"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { StudentDialog } from "@/components/students/student-dialog"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample data


export default function StudentClient({students}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const isMobile = useIsMobile()

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleEditStudent = (student) => {
    setCurrentStudent(student)
    setIsDialogOpen(true)
  }

  const handleAddStudent = () => {
    setCurrentStudent(null)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Graduated":
        return "bg-blue-100 text-blue-800"
      case "Suspended":
        return "bg-orange-100 text-orange-800"
      case "Dropped out":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Mobile card view for students
  const renderMobileStudentCard = (student) => (
    <div key={student.id} className="mb-4 rounded-lg border p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">{student.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditStudent(student)}>Edit details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View full profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete student</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mb-1 text-sm text-muted-foreground">{student.matNo}</div>
      <div className="mb-2 text-sm">
        {student.department} • Level {student.level}
      </div>
      <div className="mb-2 text-sm">CGPA: {student.cgpa.toFixed(2)}</div>
      <Badge variant="outline" className={getStatusColor(student.status)}>
        {student.status}
      </Badge>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Students</h1>
        <Button onClick={handleAddStudent} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, mat no, or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Graduated">Graduated</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Dropped out">Dropped out</SelectItem>
            </SelectContent>
          </Select>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
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
      </div>

      {isMobile ? (
        // Mobile view - cards
        <div className="mt-4">
          {filteredStudents.length === 0 ? (
            <div className="rounded-md border p-4 text-center">No students found.</div>
          ) : (
            filteredStudents.map(renderMobileStudentCard)
          )}
        </div>
      ) : (
        // Desktop view - table
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mat No.</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">CGPA</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.matNo}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.cgpa.toFixed(2)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{student.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{student.level}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>Edit details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View full profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete student</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <StudentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} student={currentStudent} />
    </div>
  )
}
