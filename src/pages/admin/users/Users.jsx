import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { profileApi } from "api";
import UserList from "./userList/UserList";
import "./users.css";

const Users = () => {
const [tab, setTab] = useState(0);

const handleChange = (event, tab) => {
  setTab(tab);
};

  return (
    <div className="main-users-page">
      <Tabs className="tabs" value={tab} onChange={handleChange} aria-label="user tabs">
        <Tab className="tab" label="Users" />
        <Tab className="tab" label="Nutritionists" />
      </Tabs>
      <Box>
        {tab === 0 && <UserList queryKey="users" queryFn={profileApi.getUserList} />}
        {tab === 1 && <UserList queryKey="nutritionists" queryFn={profileApi.getNutritionistList} />}
      </Box>
    </div>
  );
};

export default Users;
