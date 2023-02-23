import { UserAvatar, RightContent } from "./UserAction.style";
import { Button } from "@mui/material";
import InteractiveDialog from "../../interactiveDialog/InteractiveDialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserAction() {
  const [username, setUsername] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.username);
  }, [])

  function signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername("");
    setOpen(false);
    navigate("/signin");
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <RightContent>
      <Button
        color="error"
        variant="outlined"
        size="small"
        onClick={handleOpen}
      >
        Sign out
      </Button>
      <UserAvatar>
        {username.slice(0, 1).toUpperCase()}
      </UserAvatar>
      <InteractiveDialog open={open} setOpen={setOpen} signOut={signOut} />
    </RightContent>
  )
}