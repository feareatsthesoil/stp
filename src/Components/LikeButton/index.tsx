import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Components/UserContext";
import { getLikes, toggleLike } from "../../utils/services";

export default function LikeButton({
  likeableId,
  likeableType,
}: {
  likeableId: number;
  likeableType: string;
}) {
  const [likeCount, setLikeCount] = useState<number>();
  const [selfLiked, setSelfLiked] = useState<boolean>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { loggedIn } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();

  const refresh = async () => {
    setIsUpdating(true);
    try {
      const { data } = await getLikes(likeableId, likeableType);
      setLikeCount(data.count);
      setSelfLiked(data.liked);
    } catch (error) {
      console.error("Error fetching likes", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [likeableId, likeableType]);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedToggle = debounce(toggle, 500);

  async function toggle() {
    if (!loggedIn) {
      const confirmed = await confirm({
        title: "Please log in",
        description: "Please log in to like.",
        confirmationText: "Log in",
      });
      if (confirmed !== undefined) {
        const currentUrl = window.location.href;
        const loginUrl = new URL("/login", currentUrl).href;
        router.replace(loginUrl);
      }

      return;
    }

    if (isUpdating) {
      return; // Prevent multiple clicks while the update is in progress
    }

    setIsUpdating(true);

    try {
      await toggleLike(likeableId, likeableType);
      refresh();
    } catch (error) {
      console.error("Error toggling like", error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Button
      className="h-min self-center"
      style={{
        maxWidth: "20px",
        maxHeight: "20px",
        minWidth: "20px",
        minHeight: "20px",
      }}
      onClick={debouncedToggle}
      disabled={isUpdating}
    >
      {selfLiked ? (
        <FontAwesomeIcon style={{ color: "#000" }} icon={fullHeart} />
      ) : (
        <FontAwesomeIcon style={{ color: "#000" }} icon={faHeart} />
      )}
    </Button>
  );
}
