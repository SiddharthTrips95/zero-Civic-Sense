const GlassButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`glass-button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GlassButton;