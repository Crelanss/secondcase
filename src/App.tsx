import React from 'react'
import styled from "styled-components";

import Layout from "./components/Layout";


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const App: React.FC = () => {
    return (
        <AppContainer>
            <Layout/>
        </AppContainer>
    )
}

export default App;
