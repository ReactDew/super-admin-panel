import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { db } from 'src/firebase'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
`
const Title = styled.h5`
  margin-top: 20px;
  margin-bottom: 20px;
`
const InputFields = styled.div`
  margin-bottom: 30px;
`
const InputField = styled.div`
  margin: 10px 0px;
`

const CreateTemplate = () => {
  const templatesCollection = collection(db, 'templates')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [validated, setValidated] = useState(false)

  const history = useHistory()

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const createTemplate = async () => {
    await addDoc(templatesCollection, {
      title,
      description,
    })
      .then(() => history.push('/contract-templates'))
      .catch((err) => {
        return err
      })
  }

  return (
    <Container>
      <Title>Create a new Template</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Title</CInputGroupText>
              <CFormInput
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a Title of Template"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </CInputGroup>
          </InputField>

          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">Write a Description</CFormLabel>
            <CFormTextarea
              onChange={(e) => setDescription(e.target.value)}
              id="exampleFormControlTextarea1"
              rows="3"
            ></CFormTextarea>
          </div>
        </InputFields>
      </CForm>
      <div className="d-grid gap-5 col-6 mx-auto">
        <CButton onClick={createTemplate} size="lg" color="warning">
          Create a new Template
        </CButton>
      </div>
    </Container>
  )
}

export default CreateTemplate
