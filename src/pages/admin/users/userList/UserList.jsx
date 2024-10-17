import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  CircularProgress,
  Avatar,
  Pagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { ConfirmationDialog } from "components";
import { GLOBALS } from "common";
import { authApi } from "api";
import { UserModal } from "modals";
import "./userList.css";

const UserList = ({ queryKey, queryFn }) => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn({ pageParam: page }),
  });

  const handleClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    if (!userToDelete) return;
    try {
      await authApi.deleteUser(userToDelete);
      setIsDialogOpen(false);
      refetch();
    } catch (error) {}
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const users = data?.results ?? [];
  const totalPages = Math.ceil(data?.count / GLOBALS.PAGE_SIZE) || 1;

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <List className="user-list">
            {users.map((user) => (
              <ListItem
                key={user.id}
                onClick={() => handleClick(user)}
                className="user-list-item"
                secondaryAction={
                  <IconButton
                    className="user-del-btn"
                    edge="end"
                    aria-label="delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      setUserToDelete(user.user.username);
                      setIsDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.user.username} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
          </Box>

          {selectedUser && <UserModal open={isModalOpen} onClose={handleCloseModal} userDetails={selectedUser} />}

          {isDialogOpen && (
            <ConfirmationDialog
              open={isDialogOpen}
              description="Do you want to delete this user?"
              handleClose={() => setIsDialogOpen(false)}
              handleConfirm={handleDelete}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default UserList;

