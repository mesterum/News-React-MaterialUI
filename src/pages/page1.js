import Card from "./card";
import { getTopHeadlines } from "../util/fetchNews";
import React from "react";

function NewsList({bmList}) {
  let [newsList, setNewsList] = React.useState([]);
  React.useEffect(() => {
    getTopHeadlines().then(r => {
      console.log(r);
      setNewsList(r.articles);
    });
  }, []);

  return (
    <>
      {newsList//.sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt))
      .map(article => (
          <Card key={article.url} {...{ article, bmList, bookmarked:
          bmList[0].isBookmarked(article)}} />
      ))}
    </>
  );
}

export default props => (
  <ErrorBoundary>
    <NewsList {...props} />
  </ErrorBoundary>
);
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // console.log(error, info);
    // console.log(info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
