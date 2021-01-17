import React from "react"
import { Link } from "gatsby"

export default function ArticleBlurb({ node }) {
  return (
    <div key={node.id}>
      <Link to={node.fields.slug}>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{node.frontmatter.title}</h3>
          <span className="whitespace-pre font-light">
            {" "}
            — {node.frontmatter.date}
          </span>
          <span>: {node.frontmatter.status}</span>
        </div>
        <p className="p-2">{node.excerpt}</p>
      </Link>
    </div>
  )
}
