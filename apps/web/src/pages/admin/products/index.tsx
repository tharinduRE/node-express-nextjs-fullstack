import DashboardLayout from "@components/layout/DashboardLayout";
import { ProductTable } from "@components/product";
import { ConfirmationDialog } from "@components/ui/ConfirmDialog";
import { Alert, Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ReactElement, useState } from "react";
import useSWR, { mutate } from "swr";
import { deleteOne, getProductList } from "../../../lib/api/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SELECTED } from "../../../store/slices/product";

export default function EmployeeListPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const empState = useAppSelector((state) => state.product);
  const { selectedProduct: selectedEmployee, ...rest } = empState;
  const bulidFetcherKey = `products-${JSON.stringify(rest)}`;

  const { data: data, error } = useSWR(
    bulidFetcherKey,
    () => getProductList({ ...rest }),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    }
  );

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onEdit = (row: any) => {
    dispatch({ type: SELECTED, payload: row });
    router.push(`/admin/products/edit/${row._id}`);
  };

  const onDelete = (row: any) => {
    dispatch({ type: SELECTED, payload: row });
    setOpenConfirmDialog(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteOne(selectedEmployee?._id);
      dispatch({ type: SELECTED, payload: null });
      mutate(bulidFetcherKey);
      enqueueSnackbar(`Successfully Deleted Employee`, { variant: "success" });
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
      <Box sx={{ display: "flex"}} marginBottom={1}>
          <Link passHref href={`${router.pathname}/add`}>
            <Button id="add-button" variant="contained">Add Product</Button>
          </Link>
      </Box>
        <ProductTable data={data?.data} onEditRow={onEdit} onDeleteRow={onDelete} />
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

EmployeeListPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}