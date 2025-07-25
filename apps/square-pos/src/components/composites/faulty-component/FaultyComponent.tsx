import React from "react";

const FaultyComponent = () => {
  throw new Error("This is a simulated error!");
  // biome-ignore lint/correctness/noUnreachable: <explanation>
  return <div>You'll never see this text.</div>;
};

export default FaultyComponent;
