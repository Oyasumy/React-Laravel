export const Box = ({ children, className, style }: { children: JSX.Element | JSX.Element[]; className?: string | undefined; style?: React.CSSProperties | undefined }) => {
  return (
    <div className={`${className}`} style={{ ...style }}>
      {children}
    </div>
  );
};

export const BoxFlex = ({ children, className, style }: { children: JSX.Element | JSX.Element[]; className?: string | undefined; style?: React.CSSProperties | undefined }) => {
  return (
    <div className={`flex fullWidth justifyContentCenter ${className}`} style={{ ...style }}>
      {children}
    </div>
  );
};
