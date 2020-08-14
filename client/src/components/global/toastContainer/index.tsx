import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";

export default styled(ToastContainer).attrs({
  limit: 11,
})`
  top: calc(var(--nav-height) + 0.5rem);
  max-height: calc(--100vh - var(--nav-height) - 0.5rem);
`;
