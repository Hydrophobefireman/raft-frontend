import { box } from "./BoxContainer.styles";

export function BoxContainer({
  children,
  width,
}: {
  children?: any;
  width?: string;
}) {
  return (
    <div class={box} style={width && { width }}>
      {children}
    </div>
  );
}
