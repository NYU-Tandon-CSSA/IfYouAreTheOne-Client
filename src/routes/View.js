import React, { useState, useEffect } from "react";
import Light from "../components/Light";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

const FETCH_PICKS_QUERY = gql`
  {
    getPicks {
      name
      pick
    }
  }
`;

const PICKS_SUBSCRIPTION = gql`
  subscription PickUpdated {
    pickUpdated {
      name
      pick
    }
  }
`;

export default function View({ ViewData }) {
  const { loading, data } = useQuery(FETCH_PICKS_QUERY);
  const [pick, setPick] = useState("");
  const [showPick, setShowPick] = useState(false);

  const handleClickShowPick = () => {
    setShowPick(true);
  };

  const handleClickHidePick = () => {
    setShowPick(false);
  };

  useEffect(() => {
    if (!loading && data) {
      setPick(data.getPicks[0].pick);
    }
  }, [data, loading]);

  useSubscription(PICKS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const picks = data.subscriptionData.data.pickUpdated;
      setPick(picks[0].pick);
    },
  });

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 3 }}>
        <Grid container spacing={5}>
          {ViewData.map((light) => {
            return (
              <Grid key={light.name} item xs={2}>
                <Stack>
                  <Light key={light.name} mode={light.mode} />
                  <br />
                  <font
                    size="6"
                    style={{
                      fontFamily: "Roboto",
                      textAlign: "center",
                      background: "lightgrey",
                    }}
                  >
                    {light.name}
                  </font>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <br />
      <Grid container justifyContent="center">
        <font
          size="6"
          style={{
            fontFamily: "Roboto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <font
              size="6"
              style={{
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              Tandon CSSA 非诚勿扰
            </font>
            <br />
            <Button
              variant="outlined"
              onClick={handleClickShowPick}
              style={{ width: "330px", height: "30px" }}
            >
              <font
                size="5"
                style={{
                  fontFamily: "Roboto",
                  textAlign: "center",
                }}
              >
                显示心动嘉宾
              </font>
            </Button>
          </div>
        </font>
      </Grid>

      <Dialog
        open={showPick}
        onClose={handleClickHidePick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <font
            size="7"
            style={{
              fontFamily: "Roboto",
              textAlign: "center",
            }}
          >
            {pick}
          </font>
        </DialogTitle>
      </Dialog>
    </>
  );
}
