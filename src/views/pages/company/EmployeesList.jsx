import React, { useState, useEffect } from 'react'
import { CAvatar, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibCcStripe, cifIn, cilPeople } from '@coreui/icons'
import { db } from '../../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import styled from 'styled-components'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div``
const Table = styled.div`
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 40px;
`
const LinkHover = styled.div`
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: #f5f5f5;
  }
`

const EmployeesList = () => {
  const [employees, setEmployees] = useState(null)
  const companyId = useSelector((state) => state.user.user.currentCompany?.id)

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
  ]

  useEffect(() => {
    const getEmployees = async () => {
      let array = []
      const querySnapshot = await getDocs(collection(db, 'companies', companyId, 'employees'))
      querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id })
        setEmployees([...array])
      })
    }
    getEmployees()
  }, [companyId])

  return (
    <Container>
      <Table>
        <CTable align="middle" className="mb-0 border" responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell className="text-left">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Position</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Company</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees &&
              employees.map((employee, index) => (
                <CTableRow key={index} v-for="item in tableItems">
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={tableExample[0].avatar.src} />
                  </CTableDataCell>

                  <CTableDataCell>
                    <LinkHover>
                      <Link
                        to={`/edit-employee/${employee.id}`}
                        style={{
                          textDecoration: 'none',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          color: '#333',
                        }}
                      >
                        <div>{employee.name}</div>
                        <div className="small text-medium-emphasis">{employee.registered}</div>
                      </Link>
                    </LinkHover>
                  </CTableDataCell>
                  <CTableDataCell className="text-left">{employee.position}</CTableDataCell>
                  <CTableDataCell className="text-left">{employee.company}</CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </Table>
      <Link style={{ textDecoration: 'none' }} to="/add-employee">
        <div className="d-grid gap-2 col-2">
          <CButton color="warning">Add Employee</CButton>
        </div>
      </Link>
    </Container>
  )
}

export default EmployeesList
