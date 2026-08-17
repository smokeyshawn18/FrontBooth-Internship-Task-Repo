import { Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { PostList } from "../components/PostList";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostList />} />
    </Routes>
  );
};
