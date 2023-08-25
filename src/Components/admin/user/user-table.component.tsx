import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserColumn } from "./user-column.component";
import { IUser } from "models/user.model";
import { useUser } from "hooks/user.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import slugify from "slugify";

type Prop = {
  createUser: () => void
}
const UserTable: React.FC<Prop> = ({ createUser }) => {
  const { users, setUser } = useUser();
  const {userTableColumns} = useUserColumn();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (user: IUser) => {
    setUser(user);
    router(`/admin/users/${slugify(user.username, '-')}`);
  };

  return (
    <>
      {users && users.length ? (
        <Table<IUser>
          dataSource={users}
          columns={userTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IUser) => {
            return {
              onClick: (e) => {
                console.log(e)
                handleRowClick(record);
              },
            };
          }}
        />
      ) : (
        <NoContent
          title="No data for user"
          showButton={true}
          buttonLabel="Add User"
          handleClick={createUser}
        />
      )}
    </>
  );
};

export default UserTable;
