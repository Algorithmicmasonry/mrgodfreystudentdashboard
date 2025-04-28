"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, UserCheck, BookOpen } from "lucide-react"
import { DepartmentChart } from "@/components/dashboard/department-chart"
import { StatusChart } from "@/components/dashboard/status-chart"
import { LevelDistribution } from "@/components/dashboard/level-distribution"
import { CGPADistribution } from "@/components/dashboard/cgpa-distribution"

export default function DashboardClient({ students }) {
  const totalStudents = students.length;
  const activeStudents = students.filter(student => student.status === "Active").length;
  const averageCGPA = (students.reduce((sum, student) => sum + (student.cgpa || 0), 0) / totalStudents).toFixed(2);
  const departments = [...new Set(students.map(student => student.department))].length;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">+5 from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              {((activeStudents / totalStudents) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCGPA}</div>
            <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments}</div>
            <p className="text-xs text-muted-foreground">Computer Science is largest</p>
          </CardContent>
        </Card>
      </div>


      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4">
              <CardHeader>
                <CardTitle>Students by Department</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DepartmentChart />
              </CardContent>
            </Card>
            <Card className="col-span-full lg:col-span-3">
              <CardHeader>
                <CardTitle>Students by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <StatusChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4">
              <CardHeader>
                <CardTitle>CGPA Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CGPADistribution />
              </CardContent>
            </Card>
            <Card className="col-span-full lg:col-span-3">
              <CardHeader>
                <CardTitle>Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <LevelDistribution />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
