import React from 'react'
import styled from 'styled-components'

import RequestState from './RequestState'
import CardList from './CardsList'

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 30px;
`

const Layout: React.FC = () => {
    return (
        <LayoutContainer>
            <RequestState/>
            <CardList/>
        </LayoutContainer>
    )
}

export default Layout
