import React, { useEffect, useRef } from "react";

const PlainTextRenderer = ({ htmlContent }) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(htmlContent, "text/html");
      const plainText = parsedContent.body.textContent.replace(/\n/g, "\u00a0");
      container.innerText = plainText;
    }
  }, [htmlContent]);

  return <div ref={containerRef}></div>;
};

export default PlainTextRenderer;
