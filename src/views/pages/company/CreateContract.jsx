import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { doc, getDoc } from 'firebase/firestore'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from 'src/firebase'
import styled from 'styled-components'
import ReactToPrint from 'react-to-print'

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
const ResultContainer = styled.div`
  text-align: left;
  padding: 20px;
`
const ContractTitle = styled.h1``
const ContractDesc = styled.h6``
const ContractFields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`
const ContractField = styled.span`
  font-size: 16px;
`

const CreateContract = () => {
  const componentRef = useRef()
  const company = useSelector((state) => state.user.user.currentCompany)
  const employeeId = useParams().id
  const contractId = useParams().contractId

  const [template, setTemplate] = useState(null)
  const [employee, setEmployee] = useState(null)

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  console.log(employeeId)
  console.log(contractId)
  console.log(template)
  console.log(employee)

  useEffect(() => {
    const getTemplate = async () => {
      const docRef = doc(db, 'templates', contractId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTemplate(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getTemplate()
  }, [contractId])

  useEffect(() => {
    const getEmployee = async () => {
      const docRef = doc(db, 'companies', company.id, 'employees', employeeId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setEmployee(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getEmployee()
  }, [company, employeeId])

  return (
    <Container>
      <div>
        <ReactToPrint
          trigger={() => <CButton color="success">Print this out!</CButton>}
          content={() => componentRef.current}
        />
      </div>
      <Title>Create a new Contract</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <div className="d-grid col-5">
            <InputField>
              <CInputGroup size="lg">
                <CInputGroupText>From</CInputGroupText>
                <CFormInput
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter start date"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </CInputGroup>
            </InputField>
            <InputField>
              <CInputGroup size="lg">
                <CInputGroupText>To</CInputGroupText>
                <CFormInput
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter end date"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </CInputGroup>
            </InputField>
          </div>
        </InputFields>
      </CForm>
      <div className="d-grid gap-5 col-6">
        <ResultContainer ref={componentRef}>
          <ContractTitle>{template && template.title}</ContractTitle>
          <ContractDesc>{template && template.description}</ContractDesc>
          <ContractFields>
            <ContractField>
              Employer: {company && company.name}, ({company.email})
            </ContractField>
            <ContractField>Employee: {employee && employee.name}</ContractField>
            <ContractField>From: {from}</ContractField>
            <ContractField>To: {to}</ContractField>
          </ContractFields>
        </ResultContainer>
      </div>
    </Container>
  )
}

export default CreateContract
