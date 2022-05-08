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
  CRow,
} from '@coreui/react'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const CompanySettings = () => {
  const email = useSelector((state) => state.user.user?.email)
  const [currentCompany, setCurrentCompany] = useState(null)
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

  const [newsalnet, setSalnet] = useState(currentCompany && currentCompany.salnet)
  const [newsalval, setSalVal] = useState(currentCompany && currentCompany.salval)
  const [newsalfx, setSalfx] = useState(currentCompany && currentCompany.salfx)
  const [newfood, setFood] = useState(currentCompany && currentCompany.food)
  const [newtrns, setTrns] = useState(currentCompany && currentCompany.trns)
  const [newvcnday, setVcnday] = useState(currentCompany && currentCompany.vcnday)

  const updateCompany = async () => {
    const companyDoc = doc(db, 'companies', currentCompany.id)
    const newFields = {
      salnet: newsalnet || currentCompany.salnet,
      salval: newsalval || currentCompany.salval,
      salfx: newsalfx || currentCompany.salfx,
      food: newfood || currentCompany.food,
      trns: newtrns || currentCompany.trns,
      vcnday: newvcnday || currentCompany.vcnday,
    }
    await updateDoc(companyDoc, newFields)
      .then(() => history.go(0))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const findCurrentCompany = async () => {
      const companiesRep = collection(db, 'companies')
      const queryToFirestore = query(companiesRep, where('email', '==', email))
      const querySnapshot = await getDocs(queryToFirestore)
      querySnapshot.forEach((doc) => {
        setCurrentCompany({ ...doc.data(), id: doc.id })
      })
    }
    findCurrentCompany()
  }, [email])

  return (
    <Container>
      <Title>Edit Company</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <CRow className="align-items-start">
            <CCol>
              <CFormLabel htmlFor="validationCustom04">
                SALNET: {currentCompany && currentCompany.salnet}
              </CFormLabel>
              <CFormSelect onChange={(e) => setSalnet(e.target.value)} size="lg" className="mb-3">
                <option disabled>Select Salnet</option>
                <option>NET</option>
                <option>GROSS-1</option>
                <option>GROSS</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormLabel htmlFor="validationCustom04">
                SALVAL: {currentCompany && currentCompany.salval}
              </CFormLabel>
              <CFormSelect
                onChange={(e) => setSalVal(e.target.value)}
                size="lg"
                className="mb-3"
                aria-label="Large select example"
              >
                <option disabled>Select Salval</option>
                <option>RSD</option>
                <option>EUR</option>
                <option>USD</option>
                <option>GDP</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormLabel htmlFor="validationCustom04">
                SALFX: {currentCompany && currentCompany.salfx}
              </CFormLabel>
              <CFormSelect
                onChange={(e) => setSalfx(e.target.value)}
                size="lg"
                className="mb-3"
                aria-label="Large select example"
              >
                <option disabled>Select Salfx</option>
                <option>NBSMD</option>
                <option>NBSBY</option>
                <option>NBSSL</option>
                <option>CSTM</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>FOOD</CInputGroupText>
              <CFormInput
                onChange={(e) => setFood(e.target.value)}
                placeholder={currentCompany && currentCompany.food}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>TRNS</CInputGroupText>
              <CFormInput
                onChange={(e) => setTrns(e.target.value)}
                placeholder={currentCompany && currentCompany.trns}
                aria-label="VAT Tax Number"
              />
              <CInputGroupText>VCNDAY</CInputGroupText>
              <CFormInput
                onChange={(e) => setVcnday(e.target.value)}
                placeholder={currentCompany && currentCompany.vcnday}
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
        </InputFields>
      </CForm>
      <div className="d-grid gap-5 col-6 mx-auto">
        <Buttons>
          <CButton onClick={updateCompany} size="lg" color="warning">
            Update Company
          </CButton>
        </Buttons>
      </div>
    </Container>
  )
}

export default CompanySettings
