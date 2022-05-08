import React, { useState, useEffect } from 'react'
import { CAvatar, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibCcStripe, cifIn, cilPeople } from '@coreui/icons'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import styled from 'styled-components'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

import avatar3 from 'src/assets/images/avatars/3.jpg'
import { Link } from 'react-router-dom'

const Container = styled.div``
const Table = styled.div`
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 40px;
`
const LinkHover = styled.div`
  border-radius: 5px;
  padding: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`

const Companies = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'companies'), (snapshot) => {
      setCompanies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return unsub
  }, [])

  const tableExample = [
    {
      avatar: { src: avatar3, status: 'warning' },
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

  return (
    <Container>
      <Table>
        <CTable align="middle" className="mb-0 border" responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell className="text-left">Company</CTableHeaderCell>
              <CTableHeaderCell className="text-left">City</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Director</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {companies &&
              companies.map((companie, index) => (
                <CTableRow key={index} v-for="item in tableItems">
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={tableExample[0].avatar.src} />
                  </CTableDataCell>

                  <CTableDataCell>
                    <LinkHover>
                      <Link
                        to={`/edit-company/${companie.id}`}
                        style={{
                          textDecoration: 'none',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          color: '#333',
                        }}
                      >
                        <div>{companie.email}</div>
                        <div className="small text-medium-emphasis">
                          <span>{companie.adminName}</span>
                        </div>
                      </Link>
                    </LinkHover>
                  </CTableDataCell>

                  <CTableDataCell className="text-left">{companie.city}</CTableDataCell>
                  <CTableDataCell className="text-left">
                    <span>{companie.director}</span>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </Table>
      <Link to="/add-company">
        <CButton size="lg" color="warning">
          Add a Company
        </CButton>
      </Link>
    </Container>
  )
}

export default Companies
