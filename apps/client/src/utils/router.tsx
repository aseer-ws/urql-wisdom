import { createBrowserRouter, redirect } from "react-router-dom";
import ChatPage from "../pages/Chat";
import LoginPage from "../pages/Login";
import { urqlClient } from "./urqlClient";
import { meQueryDocument } from "../schema";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
    loader: async () => {
      const res = await urqlClient.query(meQueryDocument, {});
      if (!res.data?.me) {
        throw redirect("/login");
      }
      return res;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      const res = await urqlClient.query(meQueryDocument, {});
      if (res.data?.me) {
        throw redirect("/");
      }
      return res;
    },
  },
]);

export default router;
