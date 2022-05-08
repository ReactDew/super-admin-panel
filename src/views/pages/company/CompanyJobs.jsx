import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from 'src/firebase'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
`
const SelectedContainer = styled.div`
  margin-top: 40px;
`
const Option = styled.div`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #ececec;
  }
  > option {
    font-weight: 600;
  }
`
const Desc = styled.div`
  padding: 10px;
`
const Selected = styled.div`
  cursor: pointer;
`

const CompanyJobs = () => {
  const companyId = useSelector((state) => state.user.user.currentCompany?.id)
  const jobsCollection = collection(db, 'companies', companyId, 'jobs')
  const [adminJobs, setAdminJobs] = useState([])
  const [addedJobs, setAddedJobs] = useState([])

  const addJob = async (job, id) => {
    if (job !== undefined) {
      await addDoc(jobsCollection, {
        name: job,
        id: id,
      }).catch((err) => {
        return err
      })
    }
  }

  const removeJob = async (id) => {
    if (id !== undefined) {
      const q = query(collection(db, 'companies', companyId, 'jobs'), where('id', '==', id))
      const querySnapshot = await getDocs(q)
      let idArray = []
      querySnapshot.forEach((doc) => {
        idArray = doc.id
      })
      await deleteDoc(doc(db, 'companies', companyId, 'jobs', idArray))
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'positions'), (snapshot) => {
      setAdminJobs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return unsub
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'companies', companyId, 'jobs'), (snapshot) => {
      setAddedJobs(snapshot.docs.map((doc) => doc.data()))
    })
    return unsub
  }, [companyId])

  return (
    <Container>
      <h5>Select Jobs from the available list</h5>
      <CTable bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {adminJobs &&
            adminJobs.map((job, index) => (
              <CTableRow onClick={(e) => addJob(e.target.value, e.target.id)} key={index}>
                <CTableHeaderCell scope="row">
                  <Option>
                    <option id={job.id} key={index}>
                      {job.title}
                    </option>
                  </Option>
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  <Desc>{job.description}</Desc>
                </CTableHeaderCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <SelectedContainer>
        <h5>Selected Jobs</h5>
        <CTable bordered>
          <CTableBody>
            {addedJobs &&
              addedJobs.map((job, index) => (
                <CTableRow onClick={(e) => removeJob(e.target.id)} key={index}>
                  <CTableHeaderCell scope="row">
                    <Selected>
                      <option id={job.id} key={index}>
                        {job.name}
                      </option>
                    </Selected>
                  </CTableHeaderCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </SelectedContainer>
    </Container>
  )
}

export default CompanyJobs
