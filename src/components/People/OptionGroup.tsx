import { User } from "@/types";
export function OptionGroup({
  allUsers,
  curr,
  other,
}: {
  allUsers: User[];
  curr: string;
  other: string;
}) {
  return (
    <>
      <option disabled selected value="">
        select a user
      </option>
      {allUsers
        .map(
          (x) =>
            x._id !== other && (
              <option value={x._id} selected={curr && curr === x._id}>
                {x.name}
              </option>
            )
        )
        .filter(Boolean)}
    </>
  );
}
