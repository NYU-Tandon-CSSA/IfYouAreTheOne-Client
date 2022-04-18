import {
  Stack,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Light from "../components/Light";
import LightCount from "../components/LightCount";

const UPDATE_LIGHTS = gql`
  mutation UpdateLights($name: String!, $mode: String!) {
    updateLight(name: $name, mode: $mode) {
      name
      mode
    }
  }
`;

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    blast: {
      main: "#E81571",
      contrastText: "#fff",
    },
  },
});

export default function User({ ViewData }) {
  const [updateLight] = useMutation(UPDATE_LIGHTS);
  const [mode, setMode] = useState("off");
  const [openWarning, setOpenWarning] = useState(false);
  const [openOffConfirm, setOpenOffConfirm] = useState(false);
  const [openBlastConfirm, setOpenBlastConfirm] = useState(false);

  const handleClickOpenOffConfirm = () => {
    setOpenOffConfirm(true);
  };
  const handleClickCloseOffConfirm = () => {
    setOpenOffConfirm(false);
  };

  const handleClickOpenBlastConfirm = () => {
    setOpenBlastConfirm(true);
  };
  const handleClickCloseBlastConfirm = () => {
    setOpenBlastConfirm(false);
  };

  const handleClickOpenWarning = () => {
    setOpenWarning(true);
  };
  const handleClickCloseWarning = () => {
    setOpenWarning(false);
  };

  const user = useParams().username;

  const onSend = (username, lightmode) => {
    updateLight({
      variables: {
        name: username,
        mode: lightmode,
      },
    });
  };

  useEffect(() => {
    if (ViewData && ViewData.length !== 0) {
      let index = 0;
      for (let i = 0; i < ViewData.length; i++) {
        if (ViewData[i]["name"] === user) {
          index = i;
        }
      }
      setMode(ViewData[index]["mode"]);
    }
  }, [ViewData, user]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center">
        <font
          size="6"
          style={{
            fontFamily: "Roboto",
            textAlign: "center",
          }}
        >
          {user}
          <br />
          <LightCount ViewData={ViewData} />
        </font>
      </Grid>
      <br />
      <br />
      <Grid container justifyContent="center">
        <div style={{ width: "400px" }}>
          <Light mode={mode} />
        </div>
      </Grid>
      <br />
      <br />
      <Grid container justifyContent="center">
        <Stack direction="row" spacing={5}>
          <Button
            variant="contained"
            onClick={
              mode === "on" ? handleClickOpenOffConfirm : handleClickOpenWarning
            }
            style={{ width: "180px", height: "80px" }}
            color="neutral"
          >
            <font
              size="6"
              style={{
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              灭灯
            </font>
          </Button>
          <Button
            variant="contained"
            onClick={
              mode === "on"
                ? handleClickOpenBlastConfirm
                : handleClickOpenWarning
            }
            style={{ width: "180px", height: "80px" }}
            color="blast"
          >
            <font
              size="6"
              style={{
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              爆灯
            </font>
          </Button>
        </Stack>
      </Grid>

      <Dialog
        open={openOffConfirm}
        onClose={handleClickCloseOffConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"确定要灭灯吗"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              onSend(user, "off");
              handleClickCloseOffConfirm();
            }}
          >
            确定
          </Button>
          <Button onClick={handleClickCloseOffConfirm} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openBlastConfirm}
        onClose={handleClickCloseBlastConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"确定要爆灯吗"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              onSend(user, "blast");
              handleClickCloseBlastConfirm();
            }}
          >
            确定
          </Button>
          <Button onClick={handleClickCloseBlastConfirm} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarning}
        onClose={handleClickCloseWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"你已经操作过了，如果是误操或有其他问题请跟主持人反馈"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickCloseWarning();
            }}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
