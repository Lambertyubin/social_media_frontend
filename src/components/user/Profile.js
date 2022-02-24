import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./../user/FollowProfileButton";
import ProfileTabs from "./../user/ProfileTabs";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { listByUser } from "./../post/api-post.js";
import config from "../../config/config";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

export default function Profile() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);

  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(userId, jwt.token, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
        redirect("/signin");
      } else {
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
        loadPosts(data._id);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const photoUrl = userId
    ? `${config.apiHost}/api/users/photo/${userId}?${new Date().getTime()}`
    : "../images/default.png";

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(jwt.user._id, jwt.token, values.user._id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  const loadPosts = (user) => {
    listByUser({ userId: user }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const redirect = (dest) => {
    return navigate(dest);
  };

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={values.user.name}
            secondary={values.user.email}
          />{" "}
          {jwt.user && jwt.user._id === values.user._id ? (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + values.user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={values.user._id} />
            </ListItemSecondaryAction>
          ) : (
            <FollowProfileButton
              following={values.following}
              onButtonClick={clickFollowButton}
            />
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={values.user.about}
            secondary={
              "Joined: " + new Date(values.user.created).toDateString()
            }
          />
        </ListItem>
      </List>
      <ProfileTabs
        user={values.user}
        posts={posts}
        removePostUpdate={removePost}
      />
      <Divider />
    </Paper>
  );
}
