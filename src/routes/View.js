import React, { useState, useEffect } from "react";
import Image from "../components/Image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

import pickImage from "../images/pick.png";
import "../css/view.css"; // Ensure this file includes the updated .cardShift rules

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
            const shownPicks = picks
                .filter((pick) => pick.show === true)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            if (shownPicks.length > 0) {
                setPick(shownPicks[0].userid);
                setShowPick(true);
            } else {
                setShowPick(false);
            }
        },
    });

    return (
        <>
            <div className="background">
                <Box sx={{ 
                    flexGrow: 1, 
                    margin: 0, 
                    height: "100%", 
                    width: "100%",
                    overflow: "hidden"
                }}>
                    <Grid
                        container
                        spacing={1}
                        style={{
                            height: "100%",
                            width: "100%",
                            padding: "10px",
                            boxSizing: "border-box"
                        }}
                    >
                        {ViewData.map((light) => (
                            <Grid
                                key={light.userid}
                                item
                                xs={2}
                                style={{
                                    height: "calc(50vh - 20px)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                className="noPadding"
                            >
                                <div
                                    className="cardShift"
                                    style={{
                                        padding: "2px",
                                        borderRadius: "6px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "95%",
                                        height: "95%",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        key={light.userid}
                                        userid={light.userid}
                                        mode={light.mode}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: "calc(50vh - 50px)",
                                            objectFit: "contain",
                                            borderRadius: "4px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "2.2vw",
                                            color: "#333",
                                            fontWeight: "bold",
                                            fontFamily: "'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
                                            textShadow: "0 1px 1px rgba(255, 255, 255, 0.8)",
                                            textAlign: "center",
                                            padding: "0 5px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            marginTop: "-80px",
                                            lineHeight: "1.8"
                                        }}
                                    >
                                        <div>{light.userid}</div>
                                        <div>{light.name}</div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
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
                            <font
                                style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    marginTop: "25%",
                                    fontSize: "175px",
                                    display: "inline-flex",
                                    color: "red",
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
