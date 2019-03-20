import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Categories from './Categories'
import BackgroundImage from 'gatsby-background-image'


function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

hexToRGB('#FF0000', 0.5);

const Item = styled.li`
  margin-bottom: 1.45rem;
  width:50%;
  padding:1em;
  height:14em;
`

const Coloured = styled.div`
  background:${props => props.colour};
  height:100%;
  width:100%;
  padding:1em;
`

const styleForThing = {
    'width': '100%', 'height':'100%','padding':'1em'
}
const Headline = styled.p`
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${props => props.theme.colors.white};
  margin-bottom: 0;
  a {
    color: ${props => props.theme.colors.white};
    font-style: normal;
    font-weight: normal;
  }
`

const StyledLink = styled(Link)`
  font-size: 2.369rem;
  color: ${props => props.theme.colors.white};
  font-style: normal;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.777rem;
  }
`

const Background = (props) => {
  const fluid = props.image && props.image.localFile ? props.image.localFile.childImageSharp.fluid : null;
    if (fluid) {
      console.log(props.colour)
      return  (
      // <CoverColour bc={colour}>
        <BackgroundImage 
          Tag="section"
          fluid={fluid}
          BackgroundColor={props.colour}
          style = {styleForThing}
        >
          {props.children}
        </BackgroundImage>
      // </CoverColour>

            )
    } else {
      return( 
      <Coloured colour={props.colour}>
        {props.children}
      </Coloured>
      )
    }

}
export default class ListItem extends Component {
  render() {
    const { node, categories, colour } = this.props
    console.log('listitem',this.props, colour)
    return (
    <Item >
     <Background colour={colour} image={this.props.image}>
        <Headline>
          {node.data.date} — {categories && <Categories categories={categories} />}
        </Headline>
        <StyledLink to={node.uid}>{node.data.title.text}</StyledLink>
      </Background>
      </Item>
    )
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
}
