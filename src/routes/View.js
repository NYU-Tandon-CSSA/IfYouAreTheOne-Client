import React, { useState, useEffect } from "react";
import Image from "../components/Image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

import pickImage from "../images/pick.png";
import "../css/view.css";

const FETCH_PICKS_QUERY = gql`
  {
    getPicks {
      user
      userid
      show
    }
  }
`;

const PICKS_SUBSCRIPTION = gql`
  subscription PickUpdated {
    pickUpdated {
      user
      userid
      show
    }
  }
`;

export default function View({ ViewData }) {
  const { loading, data } = useQuery(FETCH_PICKS_QUERY);
  const [pick, setPick] = useState("");
  const [showPick, setShowPick] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      setPick(data.getPicks[0].userid);
      setShowPick(data.getPicks[0].show);
    }
  }, [data, loading]);

  useSubscription(PICKS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const picks = data.subscriptionData.data.pickUpdated;
      const shownPick = picks.find(pick => pick.show === true);
      if (shownPick) {
        setPick(shownPick.userid);
        setShowPick(true);
      } else {
        setShowPick(false);
      }
    },
  });

  return (
    <>
      <div className="background">
        <Grid container justifyContent="center">
          <div className="title-wrapper">
            <font className="top-title">T a n d o n C S S A</font>
            <font className="sweet-title">非 诚 勿 扰</font>
            <br />
          </div>
        </Grid>
        <Box sx={{ flexGrow: 1, margin: 2 }}>
          <Grid
            container
            style={{
              justifyContent: "center",
              maxWidth: "150vh",
              margin: "auto",
            }}
            justifyContent="center"
          >
            {ViewData.map((light) => {
              return (
                <Grid
                  key={light.userid}
                  item
                  style={{
                    width: "14%",
                    height: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                  className="noPadding"
                  justifyContent="center"
                >
                  <Stack style={{ justifyContent: "center" }}>
                    <Image
                      key={light.userid}
                      userid={light.userid}
                      mode={light.mode}
                    />
                    <font
                      style={{
                        justifyContent: "center",
                        fontSize: "1.5vw",
                        color: "white",
                        position: "relative",
                        display: "inline-flex",
                        top: "-20%",
                      }}
                    >
                      {light.userid}. {light.name}
                    </font>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Dialog
          open={showPick}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <div
              style={{
                backgroundImage: `url(${pickImage})`,
                width: "490px",
                height: "490px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* <div style={{justifyContent: "center",margin:"auto"}}> */}
              <font
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: "25%",
                  fontSize: "175px",
                  display: "inline-flex",
                  color: "white",
                }}
              >
                {pick}
              </font>
            </div>
          </DialogTitle>
        </Dialog>
      </div>
    </>
  );
}
