import DashboardLayout from "@components/layout/Dashboard";
import { OrderTable } from "@components/order";
import { ConfirmationDialog } from "@components/ui/ConfirmDialog";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ReactElement, useState } from "react";
import useSWR, { mutate } from "swr";
import { deleteOne, getOrderList } from "../../../lib/api/order";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SELECTED } from "../../../store/slices/order";

export default function OrderListPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const empState = useAppSelector((state) => state.order);
  const { selectedOrder, ...rest } = empState;
  const bulidFetcherKey = `orders-${JSON.stringify(rest)}`;

  const { data: data, error } = useSWR(
    bulidFetcherKey,
    () => getOrderList({ ...rest }),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    }
  );

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onDelete = (row: any) => {
    dispatch(SELECTED(row));
    setOpenConfirmDialog(true);
  };

  const onEdit = (row: any) => {
    dispatch(SELECTED(row));
    router.push({pathname : router.pathname + `/details/${row._id}`});
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteOne(selectedOrder?._id);
      dispatch(SELECTED(null));
      mutate(bulidFetcherKey);
      enqueueSnackbar(`Successfully Deleted Order`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error Occured while deleteing", { variant: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  if (error)
    return <Alert severity="error">Error Occured during fetching data</Alert>;
  return (
    <>
      {/* <Box sx={{ display: "flex"}} marginBottom={1}>
          <Link passHref href={`${router.pathname}/add`}>
            <Button id="add-button" variant="contained">Add Order</Button>
          </Link>
      </Box> */}
      <OrderTable data={data?.data} onEditRow={onEdit} onDeleteRow={undefined}/>
      <ConfirmationDialog
        open={openConfirmDialog}
        keepMounted={false}
        onClose={() => setOpenConfirmDialog(false)}
        id="confirmDialog"
        onAccept={onDeleteConfirmation}
      >
        Confirm Delete ?{" "}
      </ConfirmationDialog>
    </>
  );
}

OrderListPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}