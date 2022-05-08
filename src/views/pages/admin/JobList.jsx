import { CButton, CCard, CCardBody, CCardSubtitle, CCardTitle } from '@coreui/react'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from 'src/firebase'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const CardItem = styled.div`
  margin-top: 20px;
  margin-right: 20px;
`
const ButtonContainer = styled.div`
  margin-top: 30px;
`

const JobList = () => {
  const [positions, setPositions] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'positions'), (snapshot) => {
      setPositions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return unsub
  }, [])

  return (
    <Container>
      <CardsContainer>
        {positions &&
          positions.map((position, index) => (
            <CardItem key={index}>
              <CCard style={{ minHeight: '7rem', minWidth: '18rem', width: '18rem' }}>
                <Link style={{ textDecoration: 'none' }} to={`/position/${position.id}`}>
                  <CCardBody>
                    <CCardTitle>{position.title}</CCardTitle>
                    <CCardSubtitle className="mb-2 text-medium-emphasis">
                      {position.description}
                    </CCardSubtitle>
                  </CCardBody>
                </Link>
              </CCard>
            </CardItem>
          ))}
      </CardsContainer>
      <ButtonContainer>
        <div className="d-grid gap-5 col-2">
          <Link to="/create-position">
            <CButton size="lg" color="warning">
              Add new Position
            </CButton>
          </Link>
        </div>
      </ButtonContainer>
    </Container>
  )
}

export default JobList
