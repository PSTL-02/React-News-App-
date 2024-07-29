import { useParams } from "react-router-dom"
import { useArticlesContext } from "../hooks/useArticlesContext"
import { format } from "date-fns"

const SingleArticle = () => {
  const {id} = useParams()
  // bring in context
  const {articles} = useArticlesContext ()

  const article = articles[id]

  const formattedDate = format(new Date(article.publishedAt), "h:mmbbb, dd/mm/yyyy")

  return (
    <div>
      <img src={article.urlToImage} alt={article.tile + " Image"} />
      <div className="single-page">
        <h2>{article.title}</h2>
        <h3>{formattedDate}</h3>
        <h3>{article.author}</h3>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <a href={article.url} target="blank">See Full Article</a>
      </div>
    </div>
  )
}

export default SingleArticle
