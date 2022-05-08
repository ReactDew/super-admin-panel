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
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

const EditCompany = () => {
  const [currentCompany, setCurrentCompany] = useState({})
  const [newname, setName] = useState(currentCompany && currentCompany.name)
  const [newemail, setEmail] = useState(currentCompany && currentCompany.email)
  const [newpassword, setPassword] = useState(currentCompany && currentCompany.password)
  const [newadminName, setAdminName] = useState(currentCompany && currentCompany.adminName)
  const [newmb, setMb] = useState(currentCompany && currentCompany.mb)
  const [newtax, setTax] = useState(currentCompany && currentCompany.tax)
  const [newaddress, setAddress] = useState(currentCompany && currentCompany.address)
  const [newcity, setCity] = useState(currentCompany && currentCompany.city)
  const [newzip, setZip] = useState(currentCompany && currentCompany.zip)
  const [newbank, setBank] = useState(currentCompany && currentCompany.bank)
  const [newdirector, setDirector] = useState(currentCompany && currentCompany.director)
  const [newsalnet, setSalnet] = useState(currentCompany && currentCompany.salnet)
  const [newsalval, setSalVal] = useState(currentCompany && currentCompany.salval)
  const [newsalfx, setSalfx] = useState(currentCompany && currentCompany.salfx)
  const [newfood, setFood] = useState(currentCompany && currentCompany.food)
  const [newtrns, setTrns] = useState(currentCompany && currentCompany.trns)
  const [newvcnday, setVcnday] = useState(currentCompany && currentCompany.vcnday)

  const history = useHistory()
  const companyId = useParams().id

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const updateCompany = async () => {
    const companyDoc = doc(db, 'companies', companyId)
    const newFields = {
      name: newname || currentCompany.name,
      email: newemail || currentCompany.email,
      password: newpassword || currentCompany.password,
      adminName: newadminName || currentCompany.adminName,
      mb: newmb || currentCompany.mb,
      tax: newtax || currentCompany.tax,
      address: newaddress || currentCompany.address,
      city: newcity || currentCompany.city,
      zip: newzip || currentCompany.zip,
      bank: newbank || currentCompany.bank,
      director: newdirector || currentCompany.director,
      salnet: newsalnet || currentCompany.salnet,
      salval: newsalval || currentCompany.salval,
      salfx: newsalfx || currentCompany.salfx,
      food: newfood || currentCompany.food,
      trns: newtrns || currentCompany.trns,
      vcnday: newvcnday || currentCompany.vcnday,
    }
    await updateDoc(companyDoc, newFields)
      .then(() => history.push('/companies'))
      .catch((err) => {
        return err
      })
  }

  const deleteCompany = async () => {
    await deleteDoc(doc(db, 'companies', companyId))
      .then(() => history.push('/companies'))
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    const getCurrentCompany = async () => {
      const docRef = doc(db, 'companies', companyId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setCurrentCompany(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getCurrentCompany()
  }, [companyId])

  return (
    <Container>
      <Title>Edit Company</Title>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <InputFields>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                onChange={(e) => setName(e.target.value)}
                placeholder={currentCompany && currentCompany.name}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Email</CInputGroupText>
              <CFormInput
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={currentCompany && currentCompany.email}
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
                placeholder="Enter new password"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Admin</CInputGroupText>
              <CFormInput
                onChange={(e) => setAdminName(e.target.value)}
                placeholder={currentCompany && currentCompany.adminName}
                aria-label="Admin Name"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Number</CInputGroupText>
              <CFormInput
                onChange={(e) => setMb(e.target.value)}
                placeholder={currentCompany && currentCompany.mb}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>VAT</CInputGroupText>
              <CFormInput
                onChange={(e) => setTax(e.target.value)}
                placeholder={currentCompany && currentCompany.tax}
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Address</CInputGroupText>
              <CFormInput
                onChange={(e) => setAddress(e.target.value)}
                placeholder={currentCompany && currentCompany.address}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>City</CInputGroupText>
              <CFormInput
                onChange={(e) => setCity(e.target.value)}
                placeholder={currentCompany && currentCompany.city}
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>ZIP</CInputGroupText>
              <CFormInput
                onChange={(e) => setZip(e.target.value)}
                placeholder={currentCompany && currentCompany.zip}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <CInputGroupText>Bank</CInputGroupText>
              <CFormInput
                onChange={(e) => setBank(e.target.value)}
                placeholder={currentCompany && currentCompany.bank}
                aria-label="VAT Tax Number"
              />
            </CInputGroup>
          </InputField>
          <InputField>
            <CInputGroup size="lg">
              <CInputGroupText>Director</CInputGroupText>
              <CFormInput
                onChange={(e) => setDirector(e.target.value)}
                placeholder={currentCompany && currentCompany.director}
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
          <CButton onClick={deleteCompany} size="lg" color="danger">
            Delete Company
          </CButton>
        </Buttons>
      </div>
    </Container>
  )
}

export default EditCompany
