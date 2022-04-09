import Button from "@mui/material/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const UPDATE_LIGHTS = gql`
  mutation UpdateLights($name: String!, $mode: String!) {
    updateLight(name: $name, mode: $mode) {
      name
      mode
    }
  }
`;

export default function User() {
  const [updateLight] = useMutation(UPDATE_LIGHTS);

  const onSend = () => {
    updateLight({
      variables: {
        name: "User1",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "User2",
        mode: "on",
      },
    });
    updateLight({
      variables: {
        name: "User3",
        mode: "on",
      },
    });
  };

  return (
    <>
      {"管理"}
      <br />
      <Button
        variant="contained"
        onClick={() => {
          onSend();
        }}
      >
        点亮全部灯
      </Button>
    </>
  );
}
