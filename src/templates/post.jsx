import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, Listing, Wrapper, SliceZone, Title, SEO, Header } from '../components'
import Categories from '../components/Listing/Categories'
import website from '../../config/website'
import Img from 'gatsby-image'

const Hero = styled.header`
  background-color: ${props => props.post_colour ? props.post_colour : props.theme.colors.primary};
  padding-top: 1rem;
  padding-bottom: 4rem;
  ${props => props.image ? ' margin-bottom:15rem;' : null}
`

const Headline = styled.p`
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  a {
    font-style: normal;
    font-weight: normal;
  }
`

const ColouredHeader = styled.h1`
color: ${props => props.theme.colors.white};
`

const ImageHeroWrap = styled.div`
position: relative;
margin: 0 auto;
max-width: ${props => props.theme.maxWidth};
top: 20rem;
`

const PostWrapper = Wrapper.withComponent('main')

const Post = ({ data: { prismicPost, posts }, location }) => {
  const { data } = prismicPost
  let categories = false
  if (data.categories[0].category) {
    categories = data.categories.map(c => c.category.document[0].data.name)
  }
  console.log('data',data);
  console.log('is it a thing',data.hero_image.localFile != null)
  return (
    <Layout customSEO>
      <SEO
        title={`${data.title.text} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
        article
      />
      <Hero image={data.hero_image.localFile != null} post_colour={data.post_colour}>
        <Wrapper image={data.hero_image.localFile != null}>
          <Header />
          <Headline>
            {data.date} — {categories && <Categories categories={categories} />}
          </Headline>
          <ColouredHeader>{data.title.text}</ColouredHeader>
        </Wrapper>
        {data.hero_image.localFile ?  <ImageHeroWrap><Img fluid={data.hero_image.localFile.childImageSharp.fluid} /></ImageHeroWrap> : null  }
      </Hero>
      <PostWrapper id={website.skipNavId}>
        <SliceZone allSlices={data.body} />
        <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
        <Listing posts={posts.edges} />
      </PostWrapper>
    </Layout>
  )
}

export default Post

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      first_publication_date
      last_publication_date
      data {
        post_colour
        hero_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        title {
          text
        }
        description
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
        body {
          ... on PrismicPostBodyText {
            slice_type
            id
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicPostBodyQuote {
            slice_type
            id
            primary {
              quote {
                html
                text
              }
            }
          }
          ... on PrismicPostBodyImage {
            slice_type
            id
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    posts: allPrismicPost(limit: 2, sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            post_colour
            hero_image {
              localFile {
                childImageSharp {
                  fluid( maxWidth: 1200, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
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
