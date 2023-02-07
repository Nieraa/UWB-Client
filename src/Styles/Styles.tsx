import { memo, ReactNode } from "react";
import GlobalStyle from "./Styles.style";

interface StylesProps {
  children: ReactNode;
}

const RenderOnceGlobalStyle = memo(() => <GlobalStyle/>);

function Styles(props: StylesProps) {
  const { children } = props;
  
  return (
    <>
      <RenderOnceGlobalStyle />
      {children}
    </>
  );
}

export default Styles;