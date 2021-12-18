import { DislikeTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export const RatingButtons: React.FC = () => {
  return (
    <>
      <Tooltip title="Восхититься">
        <Button shape="circle" icon={<SmileTwoTone twoToneColor="#7dc41a" />} />
      </Tooltip>
      <Tooltip title="Насмехаться">
        <Button shape="circle" icon={<DislikeTwoTone twoToneColor="red" />} />
      </Tooltip>
    </>
  );
};
