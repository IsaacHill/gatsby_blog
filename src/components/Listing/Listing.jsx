import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ListItem from './ListItem'
import { theme } from '../../styles'

const List = styled.ul`
  margin-top: 4rem;
  margin-bottom: 4rem;
  list-style-type: none;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default class Listing extends Component {
  render() {
    const { posts } = this.props
    return (
      <List>
        {posts.map(post => {
          let categories = false
          const colour = post.node.data.post_colour || theme.colors.primary;
          const image = post.node.data.hero_image;
          console.log(colour)
          if (post.node.data.categories[0].category) {
            categories = post.node.data.categories.map(c => c.category.document[0].data.name)
          }
          return <ListItem image={image} colour={colour} key={post.node.uid} node={post.node} categories={categories} />
        })}
      </List>
    )
  }
}

Listing.propTypes = {
  posts: PropTypes.array.isRequired,
}
