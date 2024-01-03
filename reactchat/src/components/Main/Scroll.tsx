import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useRef } from "react";

interface ScrollProps {
  children: React.ReactNode;
}

const ScrollContainer = styled(Box)(() => ({
  height: `calc(100vh - 190px)`,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    // backgroundColor: "#f0f0f0",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));

const Scroll = ({ children }: ScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  return <ScrollContainer ref={scrollRef}>{children}</ScrollContainer>;
};
export default Scroll;
