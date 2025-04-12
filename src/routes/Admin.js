import { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useSubscription } from "@apollo/client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Radio from "@mui/material/Radio";
import Image from "../components/Image";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LightCount from "../components/LightCount";

const UPDATE_LIGHTS = gql`
  mutation UpdateLights($userid: Int!, $mode: String!, $name: String!) {
    updateLight(userid: $userid, mode: $mode, name: $name) {
      userid
      mode
      name
    }
  }
`;

const UPDATE_PICKS = gql`
  mutation UpdatePick($user: String!, $userid: Int!) {
    updatePick(user: $user, userid: $userid) {
      user
      userid
      show
    }
  }
`;

const SHOW_PICKS = gql`
  mutation ShowPick($user: String!, $show: Boolean!) {
    showPick(user: $user, show: $show) {
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

export default function Admin({ ViewData }) {
  const [pick, setPick] = useState("");
  const [curPick, setCurPick] = useState(pick);
  const [openPick, setOpenPick] = useState(false);
  const [openLight, setOpenLight] = useState(false);
  const [openShowPick, setOpenShowPick] = useState(false);
  const [updateLight] = useMutation(UPDATE_LIGHTS);
  const [updatePick] = useMutation(UPDATE_PICKS);
  const [updateShowPick] = useMutation(SHOW_PICKS);

  const handleClickOpenPick = () => {
    setOpenPick(true);
  };
  const handleClickClosePick = () => {
    setOpenPick(false);
  };

  const handleClickOpenLight = () => {
    setOpenLight(true);
  };
  const handleClickCloseLight = () => {
    setOpenLight(false);
  };

  const handleClickOpenShowPick = () => {
    setOpenShowPick(true);
  };
  const handleClickCloseShowPick = () => {
    setOpenShowPick(false);
  };

  const onSendPicks = (userid) => {
    setCurPick(userid);
    updatePick({
      variables: {
        user: "user",
        userid: userid
      },
    });
  };

  const onSendShowPicks = (show) => {
    updateShowPick({
      variables: {
        user: "user",
        show: show,
      },
    });
  };

  const handleClickShowPick = (show) => {
    onSendShowPicks(show);
  };

  const onSendLights = (userid, mode) => {
    updateLight({
      variables: {
        userid: userid,
        mode: mode,
        name: ViewData.find(light => light.userid === userid)?.name || ""
      },
    });
  };

  return (
    <>
      <font
        style={{
          color: "white",
        }}
      >
        {"管理页面"}
      </font>
      <br />
      <br />
      <LightCount ViewData={ViewData} />
      <br />
      <font
        style={{
          color: "white",
        }}
      >
        {`当前心动嘉宾： ${curPick}`}
      </font>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleClickOpenLight();
        }}
      >
        点亮全部灯
      </Button>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleClickOpenPick();
        }}
      >
        选择心动嘉宾
      </Button>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleClickOpenShowPick();
        }}
      >
        显示心动嘉宾
      </Button>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleClickShowPick(false);
        }}
      >
        隐藏心动嘉宾
      </Button>
      <br />
      <br />

      <Box sx={{ flexGrow: 1, margin: 3 }}>
        <Grid container spacing={5}>
          {ViewData.map((light) => {
            return (
              <Grid key={light.userid} item xs={1}>
                <Stack>
                  <Image
                    key={light.userid}
                    userid={light.userid}
                    mode={light.mode}
                  />
                  <br />
                  <font
                    size="6"
                    style={{
                      fontFamily: "Roboto",
                      textAlign: "center",
                      background: "lightgrey",
                    }}
                  >
                    {light.userid}
                  </font>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Dialog
        open={openPick}
        onClose={handleClickClosePick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"选择心动嘉宾"}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">嘉宾编号</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1"
                onClick={() => setPick(1)}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2"
                onClick={() => setPick(2)}
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="3"
                onClick={() => setPick(3)}
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4"
                onClick={() => setPick(4)}
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="5"
                onClick={() => setPick(5)}
              />
              <FormControlLabel
                value="6"
                control={<Radio />}
                label="6"
                onClick={() => setPick(6)}
              />
              <FormControlLabel
                value="7"
                control={<Radio />}
                label="7"
                onClick={() => setPick(7)}
              />
              <FormControlLabel
                value="8"
                control={<Radio />}
                label="8"
                onClick={() => setPick(8)}
              />
              <FormControlLabel
                value="9"
                control={<Radio />}
                label="9"
                onClick={() => setPick(9)}
              />
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="10"
                onClick={() => setPick(10)}
              />
              <FormControlLabel
                value="11"
                control={<Radio />}
                label="11"
                onClick={() => setPick(11)}
              />
              <FormControlLabel
                value="12"
                control={<Radio />}
                label="12"
                onClick={() => setPick(12)}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSendPicks(pick);
              handleClickClosePick();
            }}
          >
            确定
          </Button>
          <Button onClick={handleClickClosePick} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLight}
        onClose={handleClickCloseLight}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"确定要初始化所有灯吗？"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              onSendLights(1, "on");
              onSendLights(2, "on");
              onSendLights(3, "on");
              onSendLights(4, "on");
              onSendLights(5, "on");
              onSendLights(6, "on");
              onSendLights(7, "on");
              onSendLights(8, "on");
              onSendLights(9, "on");
              onSendLights(10, "on");
              onSendLights(11, "on");
              onSendLights(12, "on");
              handleClickCloseLight();
            }}
          >
            确定
          </Button>
          <Button onClick={handleClickCloseLight} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openShowPick}
        onClose={handleClickCloseShowPick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"确定要显示心动嘉宾吗？"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickShowPick(true);
              handleClickCloseShowPick();
            }}
          >
            确定
          </Button>
          <Button onClick={handleClickCloseShowPick} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
