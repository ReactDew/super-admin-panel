import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { setUser } from '../../../redux/slices/userSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [currentCompany, setCurrentCompany] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            currentUser: currentUser,
            currentCompany: currentCompany,
          }),
        )
        history.push('/')
      })
      .catch(console.error)
  }

  useEffect(() => {
    const findCurrentUser = async () => {
      const usersRep = collection(db, 'users')
      const queryToFirestore = query(usersRep, where('email', '==', email))
      const querySnapshot = await getDocs(queryToFirestore)
      querySnapshot.forEach((doc) => {
        setCurrentUser({ ...doc.data(), id: doc.id })
      })
    }
    findCurrentUser()
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={() => handleLogin(email, password)}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
