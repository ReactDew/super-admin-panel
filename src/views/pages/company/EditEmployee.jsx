import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
`
const Left = styled.div`
  flex 1;
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
const Buttons = styled.div`
  display: flex;
`
const Button = styled.div`
  margin-right: 30px;
`

const EditEmployee = () => {
  const companyId = useSelector((state) => state.user.user.currentCompany?.id)
  const employeeId = useParams().id
  const [employee, setEmployee] = useState(null)
  const [companyJobs, setCompanyJobs] = useState(null)

  const [newname, setNewName] = useState('')
  const [newposition, setNewPosition] = useState('')

  const history = useHistory()
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const updateEmployee = async () => {
    const companyDoc = doc(db, 'companies', companyId, 'employees', employeeId)
    const newFields = {
      name: newname || employee.name,
      position: newposition || employee.position,
    }
    await updateDoc(companyDoc, newFields)
      .then(() => history.push('/employees-list'))
      .catch((err) => {
        return err
      })
  }

  const deleteEmployee = async () => {
    await deleteDoc(doc(db, 'companies', companyId, 'employees', employeeId))
      .then(() => history.push('/employees-list'))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const getCurrentEmployee = async () => {
      const docRef = doc(db, 'companies', companyId, 'employees', employeeId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setEmployee(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getCurrentEmployee()
  }, [companyId, employeeId])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'companies', companyId, 'jobs'), (snapshot) => {
      setCompanyJobs(snapshot.docs.map((doc) => doc.data()))
    })
    return unsub
  }, [companyId])

  return (
    <Container>
      <Left>
        <Title>Edit Employee</Title>
        <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
          <InputFields>
            <div className="d-grid gap-5 col-10">
              <InputField>
                <CInputGroup size="lg">
                  <CInputGroupText>Name</CInputGroupText>
                  <CFormInput
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={employee && employee.name}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </CInputGroup>
              </InputField>
            </div>
            <div className="d-grid gap-5 col-10">
              <CCol>
                <CFormLabel htmlFor="validationCustom04">Select Job</CFormLabel>
                <CFormSelect
                  onChange={(e) => setNewPosition(e.target.value)}
                  size="lg"
                  className="mb-3"
                  aria-label="Large select example"
                >
                  <option selected disabled>
                    Select
                  </option>
                  {companyJobs &&
                    companyJobs.map((job, index) => (
                      <option value={job.name} key={index}>
                        {job.name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
            </div>
          </InputFields>
        </CForm>
        <div className="d-grid gap-5 col-10">
          <Buttons>
            <Button>
              <CButton onClick={updateEmployee} color="warning">
                Update Employee
              </CButton>
            </Button>
            <Button>
              <Link to={`/select-contract/${employeeId}`}>
                <CButton color="success">Create Template</CButton>
              </Link>
            </Button>
            <CButton onClick={deleteEmployee} color="danger">
              Delete Employee
            </CButton>
          </Buttons>
        </div>
      </Left>
    </Container>
  )
}

export default EditEmployee
