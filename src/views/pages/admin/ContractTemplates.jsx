import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import styled from 'styled-components'
import { CCardText, CCardTitle, CCol, CCard, CRow, CCardBody, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TemplatesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TemplateContainer = styled.div`
  margin-right: 1rem;
`

const ContractTemplates = () => {
  const [templates, setTemplates] = useState([])

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
                    to={`/contract-page/${template.id}`}
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
      <div className="d-grid  gap-2 col-4 ">
        <Link to="/create-template">
          <CButton color="warning" size="lg">
            Add new Template
          </CButton>
        </Link>
      </div>
    </Container>
  )
}

export default ContractTemplates
