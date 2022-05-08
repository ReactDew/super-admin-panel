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

const CreateJob = () => {
  const positionsCollection = collection(db, 'positions')
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

  const createPosition = async () => {
    await addDoc(positionsCollection, {
      title,
      description,
    })
      .then(() => history.push('/job-list'))
      .catch((err) => {
        return err
      })
  }

  return (
    <Container>
      <Title>Create a new Position</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Title</CInputGroupText>
              <CFormInput
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a Title of Position"
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
        <CButton onClick={createPosition} size="lg" color="warning">
          Create a new Position
        </CButton>
      </div>
    </Container>
  )
}

export default CreateJob
