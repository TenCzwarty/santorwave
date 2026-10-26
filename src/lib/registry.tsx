"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

// Filter out non-standard props to prevent React DOM warnings
const shouldForwardProp = (propName: string, target: unknown) => {
  // For HTML elements, only forward valid HTML attributes
  if (typeof target === "string") {
    return isPropValid(propName);
  }
  // For custom components, forward all props
  return true;
};

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // On the client, we still need StyleSheetManager for shouldForwardProp
  if (typeof window !== "undefined") {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {children}
      </StyleSheetManager>
    );
  }

  // On the server, also include the sheet for SSR
  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={shouldForwardProp}
    >
      {children}
    </StyleSheetManager>
  );
}
