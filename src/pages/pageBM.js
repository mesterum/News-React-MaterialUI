import Card from "./card";
import { getAllBookmarks } from "../util/storeNews";
import React from "react";

function Bookmarks() {
  let [newsList, setNewsList] = React.useState([]);
  React.useEffect(() => {
    getAllBookmarks().then(r => {
      console.log(r);
      setNewsList(r);
    });
  }, []);

  return (
    <>
      {newsList //.sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt))
        .map(article => (
          <Card key={article.url} bookmarked {...{ article }} />
        ))}
    </>
  );
}

export default () => (
  <ErrorBoundary>
    <Bookmarks />
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