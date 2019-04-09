import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Share from "@material-ui/icons/Share";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import NotInterested from "@material-ui/icons/NotInterested";
import Link from "@material-ui/core/Link";
import TimeAgo from "react-timeago";
// import { isBookmarked, setBookmark } from "../util/storeNews";

let data = {
  source: {
    id: null,
    name: "Seekingalpha.com"
  },
  author: "Scott Morton",
  title: "Buy Goldman Sachs For Apple Card - Seeking Alpha",
  description:
    "Goldman is already cheap relative to peers and tangible book. Apple Card is a great organic growth opportunity. Attractive risk/reward play.",
  url: "https://seekingalpha.com/article/4251792-buy-goldman-sachs-apple-card",
  urlToImage:
    "https://static1.seekingalpha.com/uploads/2019/3/28/49654438-15538058421931138.jpg",
  publishedAt: "2019-03-29T17:06:00Z",
  content:
    "On Monday, Apple ( AAPL ) officially announced its new credit card product, Apple Card, in partnership with Goldman Sachs ( GS ). This marks the next push into consumer banking for Goldman. The bank's first consumer product, Marcus, has been a big success sin… [+4992 chars]"
};

const styles = theme => ({
  card: {
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  content: {
    flex: "1 0 auto",
    justifyContent: "space-around"
  },
  cover: {
    width: 150,
    height: 100
  },
  title: {
    display: "flex",
    flex: "1 0 auto"
  },
  margin: {
    margin: theme.spacing.unit / 8
  }
});

function MediaControlCard(props) {
  if(!props.bmList) return null
  const { classes, article, bookmarked = "?", bmList } = props;
  let [newsList, setNewsList] = bmList;//

  const proxy = "https://mihai-bandwidth-hero-proxy.herokuapp.com/?bw=&l=10&url="
  const urlToImage = proxy + encodeURIComponent(article.urlToImage)

  if (article) {
    data = { ...article, urlToImage };
  }
  const [stateBM, setState] = React.useState(false);
  React.useEffect(() => {
    if (stateBM == "?") {
      newsList.isBookmarked(article).then(setState);
    }
    if(typeof bookmarked.then == "function")
      bookmarked.then(setState)
    else setState(Boolean(bookmarked))
  }, [bookmarked]);

  const handleChange = event => {
    const checked = event.target.checked;
    setState(checked);
    newsList.setBookmark(article, checked)
      .then(()=>setNewsList(newsList))
  };

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            <TimeAgo date={data.publishedAt} /> <b>{data.source.name}</b>
          </Typography>
          <Link href={data.url} target="NewsPage" underline="none">
            <CardActionArea className={classes.content}>
              <Typography component="h5" variant="subtitle2">
                {data.title}
              </Typography>
              <Typography variant="body2" component="p">
                {data.description}
              </Typography>
            </CardActionArea>
          </Link>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardMedia
          className={classes.cover}
          image={data.urlToImage}
          title={data.title}
        />

        <div>
          <IconButton aria-label="Share" className={classes.margin}>
            <Share />
          </IconButton>
          <Checkbox
            className={classes.margin}
            icon={<BookmarkBorder />}
            checkedIcon={<Bookmark />}
            value="checkedC"
            checked={stateBM}
            onChange={handleChange}
          />
          <IconButton aria-label="NotInterested" className={classes.margin}>
            <NotInterested />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
