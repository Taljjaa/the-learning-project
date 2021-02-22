import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ArticleBlurb from "../components/ArticleBlurb"

const Articles = ({ data }) => {
  const [search, setSearch] = useState("")
  let articles = data.allMdx.edges

  const handleChange = e => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  if (search.length > 0) {
    articles = data.allMdx.edges.filter(({ node }) => {
      return node.frontmatter.title.toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <Layout>
      <div className="max-w-lg bg-white shadow p-2 mb-8 rounded mx-auto">
        <input
          type="text"
          placeholder="Search articles"
          value={search}
          onChange={handleChange}
          className="w-full rounded p-2 placeholder-green-900 text-green-900"
        />
      </div>
      {articles.length === 0 ? (
        <div className="text-3xl text-green-900 dark:text-green-400">
          Sorry no articles found!
        </div>
      ) : (
        articles.map(({ node }) => <ArticleBlurb node={node} key={node.id} />)
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            status
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
export default Articles
