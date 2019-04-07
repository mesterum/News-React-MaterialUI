import Card from "./card";
import React from "react";

export default function Bookmarks(props) {
  // if(!props.bmList) return null
  // else 
  //   console.log("Bookmarks",props)
  const {bmList} = props
  let [newsList, setbmList] = bmList;//, setNewsList

  return (
    <>
      {Array.from(newsList.values(),
        article => (
          <Card key={article.url} bookmarked {...{ article, bmList }} />
        )).reverse()}
    </>
  );
}

// () => (
//   <ErrorBoundary>
//     <Bookmarks />
//   </ErrorBoundary>
// );
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
