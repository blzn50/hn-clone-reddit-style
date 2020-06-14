import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  desktopSection: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  filterType: {
    padding: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  filterIcon: {
    paddingLeft: theme.spacing(2),
    minWidth: 40,
  },
  mobileSection: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const filterOptions = ['Top', 'Best', 'New'];
const filterIcons = [<VerticalAlignTopIcon />, <WhatshotIcon />, <NewReleasesIcon />];

const FilterSection = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFiltering = (e, i) => {
    setSelectedIndex(i);
    setAnchorEl(null);
  };

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <List component="nav" className={classes.desktopSection}>
        {filterOptions.map((f, i) => (
          <ListItem
            key={f}
            button
            disableRipple
            className={classes.filterType}
            selected={selectedIndex === i}
            onClick={(e) => handleFiltering(e, i)}
          >
            <ListItemIcon className={classes.filterIcon}>{filterIcons[i]}</ListItemIcon>
            <ListItemText primary={f}></ListItemText>
          </ListItem>
        ))}
      </List>
      <div className={classes.mobileSection}>
        <List component="nav">
          <ListItem
            button
            disableRipple
            className={classes.filterType}
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={handleClickListItem}
          >
            <ListItemIcon className={classes.filterIcon}>{filterIcons[selectedIndex]}</ListItemIcon>
            <ListItemText primary={filterOptions[selectedIndex]}></ListItemText>
            <ListItemIcon>
              <ArrowDropDownIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {filterOptions.map((f, i) => (
            <MenuItem key={f} selected={i === selectedIndex} onClick={(e) => handleFiltering(e, i)}>
              <ListItemIcon className={classes.filterIcon}>{filterIcons[i]}</ListItemIcon>
              <ListItemText primary={f}></ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Card>
  );
};

export default FilterSection;
