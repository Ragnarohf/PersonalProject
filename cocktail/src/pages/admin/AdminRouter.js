import React from "react";
import { Route, Routes } from "react-router-dom";

import { UEdit, User } from "../admin/User";
import { CEdit, Cocktail } from "../admin/Cocktail";

import ALayout from "./ALayout";
import { Dashboard } from "./index";
import Error from "../../../src/_utils/Error";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user">
          <Route path="index" element={<User />} />
          <Route path="edit/:uid" element={<UEdit />} />
        </Route>
        <Route path="cocktail">
          <Route path="index" element={<Cocktail />} />
          <Route path="edit/:cid" element={<CEdit />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
