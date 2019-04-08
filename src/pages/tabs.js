import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NewsList from "./page1";
import Bookmarks from "./pageBM";
import { getAllBookmarks } from "../util/storeNews";
import Search from "./Search";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: "100%"
    // width: 500
  },
});

class FullWidthTabs extends React.Component {
  setSt = name => {
    const fun = v =>
    this.setState({
      [name]: [v,fun]
    })
    return fun
  }
  state = {
    value: 0,
    bmList: [[],this.setSt("bmList")],
    searchTxt: ["",this.setSt("searchTxt")],
  };
  componentDidMount(){
    getAllBookmarks().then(articles => {
      console.log(articles);
      this.setSt("bmList")(articles.map);
    });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label="News" />
            <Tab label="Bookmarks" />
            <Tab label="Main" />
            <Tab label="Item Three" />
          </Tabs>
          {this.state.value==0&&<Search searchTxt={this.state.searchTxt}/>}
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <NewsList bmList={this.state.bmList}
            searchTxt={this.state.searchTxt}/>
          <Bookmarks bmList={this.state.bmList}/>
          {children}
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
FullWidthTabs.defaultProps = {
  color: 'blue'
};
export default withStyles(styles, { withTheme: true })(FullWidthTabs);
