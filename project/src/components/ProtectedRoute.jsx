import React, { useContext } from "react";
import { Context } from "../context/Context";

export default function ProtectedRoute({ element, ...rest }) {
  const { registerd } = useContext(Context);

  return registerd ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
}
