import React, { useState } from 'react'
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
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

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

const AddEmployee = () => {
  const companyId = useSelector((state) => state.user.user.currentCompany?.id)
  const company = useSelector((state) => state.user.user?.email)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [companyJobs, setCompanyJobs] = useState(null)
  const history = useHistory()

  const employeesCollection = collection(db, 'companies', companyId, 'employees')
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const addEmployee = async () => {
    await addDoc(employeesCollection, {
      name,
      position: position,
      company: company,
    })
      .then(() => history.push('/employees-list'))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'companies', companyId, 'jobs'), (snapshot) => {
      setCompanyJobs(snapshot.docs.map((doc) => doc.data()))
    })
    return unsub
  }, [companyId])

  console.log(position)

  return (
    <Container>
      <Title>Add a new Employee</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <InputField>
            <div className="d-grid col-5">
              <CInputGroup size="lg">
                <CInputGroupText>Name</CInputGroupText>
                <CFormInput
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter an employee's Name"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </CInputGroup>
            </div>
          </InputField>
          <div className="d-grid gap-5 col-5">
            <CCol>
              <CFormLabel htmlFor="validationCustom04">Select Job</CFormLabel>
              <CFormSelect
                onChange={(e) => setPosition(e.target.value)}
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
      <div className="d-grid gap-5 col-2">
        <CButton onClick={addEmployee} color="warning">
          Add Employee
        </CButton>
      </div>
    </Container>
  )
}

export default AddEmployee
