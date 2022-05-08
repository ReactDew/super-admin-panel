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

const JobPage = () => {
  const jobId = useParams().id
  const history = useHistory()
  const [job, setJob] = useState(null)
  const [newtitle, setNewTitle] = useState('')
  const [newdescription, setNewDescription] = useState('')

  const updatePosition = async () => {
    const positionDoc = doc(db, 'positions', jobId)
    const newFields = {
      title: newtitle || job.title,
      description: newdescription || job.description,
    }
    await updateDoc(positionDoc, newFields)
      .then(() => history.push('/job-list'))
      .catch((err) => {
        return err
      })
  }

  const deletePosition = async () => {
    await deleteDoc(doc(db, 'positions', jobId))
      .then(() => history.push('/job-list'))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const getJob = async () => {
      const docRef = doc(db, 'positions', jobId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setJob(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getJob()
  }, [jobId])

  return (
    <Container>
      <Left>
        <CCard style={{ width: '80%', minHeight: '15rem', padding: '1rem' }}>
          <CCardBody>
            <CCardTitle>{job && job.title}</CCardTitle>
            <CCardText>{job && job.description}</CCardText>
          </CCardBody>
        </CCard>
      </Left>
      <Right>
        <Input>
          <CInputGroup size="lg">
            <CFormInput
              onChange={(e) => setNewTitle(e.target.value)}
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
                onChange={(e) => setNewDescription(e.target.value)}
                id="exampleFormControlTextarea1"
                rows="3"
              ></CFormTextarea>
            </div>
          </CForm>
        </Input>
        <div className="d-grid gap-2 col-6 mx-auto">
          <CButton onClick={updatePosition} color="warning">
            Update Position
          </CButton>
          <CButton onClick={deletePosition} color="danger">
            Delete Position
          </CButton>
        </div>
      </Right>
    </Container>
  )
}

export default JobPage
