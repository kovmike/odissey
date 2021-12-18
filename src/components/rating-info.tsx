import { DislikeTwoTone, MehTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Point } from "./types";

export const RatingInfo: React.FC<{ record: Point }> = ({ record }) => {
  if (!record.hasOwnProperty("rating"))
    return <MehTwoTone twoToneColor="#8b00ff" />;

  const bless = Object.values(record.rating!).filter(Boolean);
  const blame = Object.values(record.rating!).filter((mark) => mark === 0);

  return (
    <>
      {bless.map((_) => (
        <SmileTwoTone twoToneColor="#7dc41a" />
      ))}
      {blame.map((_) => (
        <DislikeTwoTone twoToneColor="red" />
      ))}
    </>
  );
};
