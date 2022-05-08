import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
} from '@coreui/react'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { db } from 'src/firebase'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`
const Left = styled.div`
  flex: 1;
`
const Right = styled.div`
  flex: 1;
`
const Input = styled.div`
  margin-bottom: 20px;
`

const ContractPage = () => {
  const templateId = useParams().id
  const history = useHistory()
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [newtitle, setTitle] = useState('')
  const [newdescription, setDescription] = useState('')

  const updateTemplate = async () => {
    const companyDoc = doc(db, 'templates', templateId)
    const newFields = {
      title: newtitle || currentTemplate.title,
      description: newdescription || currentTemplate.description,
    }
    await updateDoc(companyDoc, newFields)
      .then(() => history.push('/contract-templates'))
      .catch((err) => {
        return err
      })
  }

  const deleteTemplate = async () => {
    await deleteDoc(doc(db, 'templates', templateId))
      .then(() => history.push('/contract-templates'))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const getTemplate = async () => {
      const docRef = doc(db, 'templates', templateId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setCurrentTemplate(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getTemplate()
  }, [templateId])

  return (
    <Container>
      <Left>
        <CCard style={{ width: '35rem', height: '40rem', padding: '1rem' }}>
          <CCardBody>
            <CCardTitle>{currentTemplate && currentTemplate.title}</CCardTitle>
            <CCardText>{currentTemplate && currentTemplate.description}</CCardText>
          </CCardBody>
        </CCard>
      </Left>
      <Right>
        <Input>
          <CInputGroup size="lg">
            <CFormInput
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Update Title"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
          </CInputGroup>
        </Input>
        <Input>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Update Description</CFormLabel>
              <CFormTextarea
                onChange={(e) => setDescription(e.target.value)}
                id="exampleFormControlTextarea1"
                rows="3"
              ></CFormTextarea>
            </div>
          </CForm>
        </Input>
        <div className="d-grid gap-2 col-6 mx-auto">
          <CButton onClick={updateTemplate} color="warning">
            Update Template
          </CButton>
          <CButton onClick={deleteTemplate} color="danger">
            Delete Template
          </CButton>
        </div>
      </Right>
    </Container>
  )
}

export default ContractPage
