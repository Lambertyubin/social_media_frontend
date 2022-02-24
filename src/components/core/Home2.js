import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import unicornbikeImg from "../images/unicornbike.jpg";
import Grid from "@material-ui/core/Grid";
import auth from "./../auth/auth-helper";
import FindPeople from "./../user/FindPeople";
import Newsfeed from "./../post/Newsfeed";

export default function Home() {
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
  }, []);

  return (
    <div>
      {!defaultPage && (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="h6">Home Page</Typography>
              <CardMedia image={unicornbikeImg} title="Unicorn Bicycle" />
              <Typography variant="body2" component="p" color="textSecondary">
                Photo by{" "}
                <a
                  href="https://unsplash.com/@boudewijn_huysmans"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Boudewijn Huysmans
                </a>{" "}
                on Unsplash
              </Typography>
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the MERN Social home page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {defaultPage && (
        <Grid container spacing={8}>
          <Grid item xs={8} sm={7}>
            <Newsfeed />
          </Grid>
          <Grid item xs={6} sm={5}>
            <FindPeople />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
