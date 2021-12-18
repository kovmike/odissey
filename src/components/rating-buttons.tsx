import { DislikeTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useStore } from "effector-react";
import { $loggedUser } from "../features/auth/model";
import { ratingMarkAdded } from "../features/usersExp/model";
import { Point } from "./types";

export const RatingButtons: React.FC<{ record: Point }> = ({ record }) => {
  //размазал
  const loggedUser = useStore($loggedUser);

  if (
    record.hasOwnProperty("rating") &&
    record.rating![loggedUser!.uid] !== null
  ) {
    return record.rating![loggedUser!.uid] ? (
      <Tooltip title="Ты восхитился">
        <Button shape="circle" icon={<SmileTwoTone twoToneColor="#7dc41a" />} />
      </Tooltip>
    ) : (
      <Tooltip title="Ты насмехался">
        <Button shape="circle" icon={<DislikeTwoTone twoToneColor="red" />} />
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title="Восхититься">
        <Button
          shape="circle"
          icon={<SmileTwoTone twoToneColor="#7dc41a" />}
          onClick={() =>
            ratingMarkAdded({ path: `${record.name}/rating/`, rating: 1 })
          }
        />
      </Tooltip>
      <Tooltip title="Насмехаться">
        <Button
          shape="circle"
          icon={<DislikeTwoTone twoToneColor="red" />}
          onClick={() =>
            ratingMarkAdded({ path: `${record.name}/rating/`, rating: 0 })
          }
        />
      </Tooltip>
    </>
  );
};
