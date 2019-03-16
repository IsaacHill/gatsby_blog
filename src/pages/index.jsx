import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Layout, Listing, Wrapper, Title, Divider } from '../components'
import website from '../../config/website'
import BackgroundImage from 'gatsby-background-image'


const test = (wow,wee) => {
  return (<div></div>)
}


const styleForBg = {'z-index': '-1'}

const HeroWithBackground = (data) => {
    
       // Set ImageData.
       console.log('my data',data)

       const imageData = data.blossum_main.childImageSharp.fluid;
       return (
          <BackgroundImage Tag="section"
                           fluid={imageData}
                           backgroundColor={`#040e18`}
                           style={styleForBg}
          >
          <Hero>
            {data.children}
          </Hero>
          </BackgroundImage>
       )
}
  


// const StyledBackgroundSection = styled(HeroWithBackground)`
//   width: 100%;
//   background-repeat: repeat-y;
// `


const Hero = styled.header`
  display: flex;
  align-items: center;
`

const HeroInner = styled(Wrapper)`
  padding: 0px 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 12rem;
  margin-bottom: 12rem;
  background:rgba(144,12,63,0.5);
  transform: rotate(5deg);

  .revert {
    transform: rotate(-5deg);
  }

  h1 {
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.white};
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`

const HeroText = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.white};
  margin-bottom: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  color: ${props => props.theme.colors.white};
  margin-left: 0;
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  li {
    display: inline;
    &:not([data-name='social-entry-0']) {
      margin-left: 2.5rem;
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${props => props.theme.colors.white};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`

const IndexWrapper = Wrapper.withComponent('main')

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, blossum_main },
    } = this.props

    console.log(this.props)
    return (
      <Layout>
        <HeroWithBackground blossum_main={blossum_main}>
          <HeroInner>
            <div class="revert">
            <h1>{homepage.data.title.text}</h1>
            <HeroText dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />
              <Social>
                {social.edges.map((s, index) => (
                  <li data-name={`social-entry-${index}`} key={s.node.primary.label.text}>
                    <a href={s.node.primary.link.url}>{s.node.primary.label.text}</a>
                  </li>
                ))}
              </Social>
            </div>
          </HeroInner>
        </HeroWithBackground>
        <Divider/>
        <IndexWrapper id={website.skipNavId} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
          <Listing posts={posts.edges} />
        </IndexWrapper>
      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    blossum_main: file(relativePath: { eq: "main_blossums.jpg" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 4160) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      edges {
        node {
          primary {
            label {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
