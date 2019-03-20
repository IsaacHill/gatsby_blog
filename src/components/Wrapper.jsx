import styled from '@emotion/styled'

const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  ${props => props.image ? 'margin-bottom: -15rem;' : null}
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 1.5rem;
  }
`

export default Wrapper
