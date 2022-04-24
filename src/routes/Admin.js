import { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useSubscription, useQuery } from "@apollo/client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LightCount from "../components/LightCount";
import Light from "../components/Light";

const UPDATE_LIGHTS = gql`
  mutation UpdateLights($name: String!, $mode: String!) {
    updateLight(name: $name, mode: $mode) {
      name
      mode
    }
  }
`;

const UPDATE_PICKS = gql`
  mutation UpdatePick($name: String!, $pick: String!) {
    updatePick(name: $name, pick: $pick) {
      name
      pick
      show
    }
  }
`;

const SHOW_PICKS = gql`
  mutation ShowPick($name: String!, $show: Boolean!) {
    showPick(name: $name, show: $show) {
      name
      pick
      show
    }
  }
`;

const FETCH_PICKS_QUERY = gql`
  {
    getPicks {
      name
      pick
      show
    }
  }
`;

const PICKS_SUBSCRIPTION = gql`
  subscription PickUpdated {
    pickUpdated {
      name
      pick
      show
    }
  }
`;

export default function Admin({ ViewData }) {
  const [pick, setPick] = useState("无");
  const [curPick, setCurPick] = useState(pick);
  const [openPick, setOpenPick] = useState(false);
  const [openLight, setOpenLight] = useState(false);
  const [openShowPick, setOpenShowPick] = useState(false);
  const [updateLight] = useMutation(UPDATE_LIGHTS);
  const [updatePick] = useMutation(UPDATE_PICKS);
  const [updateShowPick] = useMutation(SHOW_PICKS);

  const { loading, data } = useQuery(FETCH_PICKS_QUERY);

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

  const onSendPicks = (pick) => {
    updatePick({
      variables: {
        name: "user",
        pick: pick,
      },
    });
  };

  const onSendShowPicks = (show) => {
    updateShowPick({
      variables: {
        name: "user",
        show: show,
      },
    });
  };

  const handleClickShowPick = (show) => {
    onSendShowPicks(show);
  };

  const onSendLights = (name, mode) => {
    updateLight({
      variables: {
        name: name,
        mode: mode,
      },
    });
  };

  useSubscription(PICKS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const picks = data.subscriptionData.data.pickUpdated;
      setCurPick(picks[0].pick);
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setCurPick(data.getPicks[0].pick);
    }
  }, [data, loading]);

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
              <Grid key={light.name} item xs={4}>
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
              defaultValue="1号"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1号"
                control={<Radio />}
                label="1号"
                onClick={() => setPick("1号")}
              />
              <FormControlLabel
                value="2号"
                control={<Radio />}
                label="2号"
                onClick={() => setPick("2号")}
              />
              <FormControlLabel
                value="3号"
                control={<Radio />}
                label="3号"
                onClick={() => setPick("3号")}
              />
              <FormControlLabel
                value="4号"
                control={<Radio />}
                label="4号"
                onClick={() => setPick("4号")}
              />
              <FormControlLabel
                value="5号"
                control={<Radio />}
                label="5号"
                onClick={() => setPick("5号")}
              />
              <FormControlLabel
                value="6号"
                control={<Radio />}
                label="6号"
                onClick={() => setPick("6号")}
              />
              <FormControlLabel
                value="7号"
                control={<Radio />}
                label="7号"
                onClick={() => setPick("7号")}
              />
              <FormControlLabel
                value="8号"
                control={<Radio />}
                label="8号"
                onClick={() => setPick("8号")}
              />
              <FormControlLabel
                value="9号"
                control={<Radio />}
                label="9号"
                onClick={() => setPick("9号")}
              />
              <FormControlLabel
                value="10号"
                control={<Radio />}
                label="10号"
                onClick={() => setPick("10号")}
              />
              <FormControlLabel
                value="11号"
                control={<Radio />}
                label="11号"
                onClick={() => setPick("11号")}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSendPicks(pick, false);
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
              onSendLights("1号", "on");
              onSendLights("2号", "on");
              onSendLights("3号", "on");
              onSendLights("4号", "on");
              onSendLights("5号", "on");
              onSendLights("6号", "on");
              onSendLights("7号", "on");
              onSendLights("8号", "on");
              onSendLights("9号", "on");
              onSendLights("10号", "on");
              onSendLights("11号", "on");
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
