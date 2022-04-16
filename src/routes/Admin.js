import { useState } from "react";
import Button from "@mui/material/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const UPDATE_LIGHTS = gql`
  mutation UpdateLights($name: String!, $mode: String!) {
    updateLight(name: $name, mode: $mode) {
      name
      mode
    }
  }
`;

const UPDATE_PICKS = gql`
  mutation UpdatePicks($name: String!, $pick: String!) {
    updatePick(name: $name, pick: $pick) {
      name
      pick
    }
  }
`;

export default function User() {
  const [pick, setPick] = useState("1号");
  const [openPick, setOpenPick] = useState(false);
  const [updateLight] = useMutation(UPDATE_LIGHTS);
  const [updatePick] = useMutation(UPDATE_PICKS);

  console.log(pick);

  const handleClickOpenPick = () => {
    setOpenPick(true);
  };

  const handleClickClosePick = () => {
    setOpenPick(false);
  };

  const onSendPicks = (pick) => {
    updatePick({
      variables: {
        name: "user",
        pick: pick,
      },
    });
  };

  const onSendLights = () => {
    updateLight({
      variables: {
        name: "1号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "2号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "3号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "4号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "5号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "6号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "7号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "8号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "9号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "10号",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "11号",
        mode: "on",
      },
    });
  };

  return (
    <>
      {"管理"}
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          onSendLights();
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
    </>
  );
}
