import React from "react";

export default ({ name }: { name: string }) => {
  return (
    <h1
      style={{
        fontSize: "3rem",
        height: "calc(88vh - var(--nav-height))",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {name}
    </h1>
  );
};
