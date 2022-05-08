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
  CRow,
} from '@coreui/react'
import { collection, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../../../firebase'
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

const AddCompany = () => {
  const companiesCollection = collection(db, 'companies')
  const usersCollection = collection(db, 'users')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminName, setAdminName] = useState('')
  const [mb, setMb] = useState('')
  const [tax, setTax] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [bank, setBank] = useState('')
  const [director, setDirector] = useState('')
  const [salnet, setSalnet] = useState('')
  const [salval, setSalVal] = useState('')
  const [salfx, setSalfx] = useState('')
  const [food, setFood] = useState(null)
  const [trns, setTrns] = useState(null)
  const [vcnday, setVcnday] = useState(null)

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

  const createCompany = async () => {
    await addDoc(usersCollection, {
      email: email,
      admin: false,
    })
    await addDoc(companiesCollection, {
      name,
      email,
      adminName,
      mb,
      tax,
      address,
      city,
      zip,
      bank,
      director,
      salnet,
      salval,
      salfx,
      food,
      trns,
      vcnday,
    })
      .then(() => history.push('/companies'))
      .catch((err) => {
        return err
      })

    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <Container>
      <Title>Create a new Company</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a Company Name"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Email</CInputGroupText>
              <CFormInput
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter an Email (Admin)"
                aria-label="Username"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Password</CInputGroupText>
              <CFormInput
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter a temporary Password"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Admin</CInputGroupText>
              <CFormInput
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter a Name of Companie's Admin"
                aria-label="Admin Name"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Number</CInputGroupText>
              <CFormInput
                onChange={(e) => setMb(e.target.value)}
                placeholder="Enter a MB registration Number"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>VAT</CInputGroupText>
              <CFormInput
                onChange={(e) => setTax(e.target.value)}
                placeholder="Enter a VAT Tax Number"
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Address</CInputGroupText>
              <CFormInput
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter a registration Address"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>City</CInputGroupText>
              <CFormInput
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a City"
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>ZIP</CInputGroupText>
              <CFormInput
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter a ZIP Code"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Bank</CInputGroupText>
              <CFormInput
                onChange={(e) => setBank(e.target.value)}
                placeholder="Enter a Bank info"
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Director</CInputGroupText>
              <CFormInput
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Enter a Director of Companie"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </CInputGroup>
          </InputField>
          <Title>Additional Data</Title>
          <CRow className="align-items-start">
            <CCol>
              <CFormLabel htmlFor="validationCustom04">SALNET</CFormLabel>
              <CFormSelect onChange={(e) => setSalnet(e.target.value)} size="lg" className="mb-3">
                <option>NET</option>
                <option>GROSS-1</option>
                <option>GROSS</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormLabel htmlFor="validationCustom04">SALVAL</CFormLabel>
              <CFormSelect
                onChange={(e) => setSalVal(e.target.value)}
                size="lg"
                className="mb-3"
                aria-label="Large select example"
              >
                <option>RSD</option>
                <option>EUR</option>
                <option>USD</option>
                <option>GDP</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormLabel htmlFor="validationCustom04">SALFX</CFormLabel>
              <CFormSelect
                onChange={(e) => setSalfx(e.target.value)}
                size="lg"
                className="mb-3"
                aria-label="Large select example"
              >
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
                placeholder="Enter a Food"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>TRNS</CInputGroupText>
              <CFormInput
                onChange={(e) => setTrns(e.target.value)}
                placeholder="Enter a TRNS"
                aria-label="VAT Tax Number"
              />
              <CInputGroupText>VCNDAY</CInputGroupText>
              <CFormInput
                onChange={(e) => setVcnday(e.target.value)}
                placeholder="Enter a VCNDAY"
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
        </InputFields>
      </CForm>
      <div className="d-grid gap-5 col-6 mx-auto">
        <CButton onClick={createCompany} size="lg" color="warning">
          Add a Company
        </CButton>
      </div>
    </Container>
  )
}

export default AddCompany
