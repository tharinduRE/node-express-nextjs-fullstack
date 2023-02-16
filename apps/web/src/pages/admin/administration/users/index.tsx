import DashboardLayout from "@components/layout/Dashboard";
import { UserTable } from "@components/user";
import { Alert } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";
import { getUserList } from "../../../../lib/api/user";
import { useAppSelector } from "../../../../store/hooks";

export default function UserListPage() {
  const { selectedUser, ...rest } = useAppSelector((state) => state.user);
  const bulidFetcherKey = `users-${JSON.stringify(rest)}`;

  const { data: data, error } = useSWR(bulidFetcherKey, () =>
    getUserList({ ...rest })
  );

  // const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // const onDelete = (row: any) => {
  //   dispatch(SELECTED(row));
  //   setOpenConfirmDialog(true);
  // };

  // const onDeleteConfirmation = async () => {
  //   try {
  //     await deleteOne(selectedUser?._id);
  //     dispatch(SELECTED(null));
  //     mutate(bulidFetcherKey);
  //     enqueueSnackbar(`Successfully Deleted User`, { variant: "success" });
  //   } catch (error) {
  //     enqueueSnackbar("Error Occured while deleteing", { variant: "error" });
  //   } finally {
  //     setOpenConfirmDialog(false);
  //   }
  // };

  if (error)
    return <Alert severity="error">Error Occured during fetching data</Alert>;
  return (
    <>
      <UserTable data={data?.data} hideActions/>
      {/* <ConfirmationDialog
        open={openConfirmDialog}
        keepMounted={false}
        onClose={() => setOpenConfirmDialog(false)}
        id="confirmDialog"
        onAccept={onDeleteConfirmation}
      >
        Confirm Delete ?{" "}
      </ConfirmationDialog> */}
    </>
  );
}

UserListPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
