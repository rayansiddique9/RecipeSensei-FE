import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { profileApi } from "api";
import UserList from "./userList/UserList";
import "./users.css";

const Users = () => {
const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <div className="main-users-page">
      <Tabs className="tabs" value={value} onChange={handleChange} aria-label="user tabs">
        <Tab className="tab" label="Users" />
        <Tab className="tab" label="Nutritionists" />
      </Tabs>
      <Box>
        {value === 0 && <UserList queryKey="users" queryFn={profileApi.getUserList} />}
        {value === 1 && <UserList queryKey="nutritionists" queryFn={profileApi.getNutritionistList} />}
      </Box>
    </div>
  );
};

export default Users;
