declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  export const className: string;
  const src: string;
  export default src;
}

declare module '*.ttf';
