import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />   {/* 🔥 VERY IMPORTANT */}
    </div>
  );
};

export default RootLayout;