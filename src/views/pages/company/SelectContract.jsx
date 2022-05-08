import { CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from 'src/firebase'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
`

const TemplatesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const TemplateContainer = styled.div`
  margin-right: 1rem;
`

const SelectContract = () => {
  const employeeId = useParams().id
  const [templates, setTemplates] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'templates'), (snapshot) => {
      setTemplates(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return unsub
  }, [])

  return (
    <Container>
      <TemplatesContainer>
        {templates &&
          templates.map((template, index) => {
            return (
              <TemplateContainer key={index}>
                <CCard className="mb-3" style={{ minWidth: '300px', maxWidth: '540px' }}>
                  <Link
                    style={{ textDecoration: 'none', color: '#000' }}
                    to={`/create-contract/${employeeId}/${template.id}`}
                  >
                    <CRow className="g-0">
                      <CCol md={8}>
                        <CCardBody>
                          <CCardTitle>{template.title}</CCardTitle>
                          <CCardText>{template.description}</CCardText>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </Link>
                </CCard>
              </TemplateContainer>
            )
          })}
      </TemplatesContainer>
    </Container>
  )
}

export default SelectContract
