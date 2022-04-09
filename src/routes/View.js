import Light from "../components/Light";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function View({ ViewData }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <font
          size="7"
          style={{
            fontFamily: "Roboto",
            textAlign: "center",
          }}
        >
          Tandon CSSA 非诚勿扰
        </font>
      </div>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={5}>
          {ViewData.map((light) => {
            return (
              <Grid item xs={2}>
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
      <Stack spacing={2} direction="row"></Stack>
    </>
  );
}
