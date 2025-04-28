import StudentClient from '@/components/students/student-client'
import React from 'react'
import { getStudents } from '../actions/getStudents'

const StudentsPage = async () => {
  
  const data = await getStudents();
  const students = data?.data;
  return (
    <div>
     {students && <StudentClient students={students}/>}
    </div>
  )
}

export default StudentsPage