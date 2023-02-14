import DashboardLayout from "@components/layout/DashboardLayout";
import { ProductTable } from "@components/product";
import { ConfirmationDialog } from "@components/ui/ConfirmDialog";
import { RefreshRounded } from "@mui/icons-material";
import { Alert, Box, Button, IconButton } from "@mui/material";
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
  const { selectedProduct: selectedEmployee, ...rest } = useAppSelector((state) => state.product);
  
  const bulidFetcherKey = `products-${JSON.stringify(rest)}`;

  const { data: data, error,isValidating } = useSWR(
    bulidFetcherKey,
    () => getProductList({ ...rest }),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    }
  );

  const refresh= () => mutate(bulidFetcherKey)

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onEdit = (row: any) => {
    dispatch(SELECTED(row));
    router.push(`/admin/products/edit/${row._id}`);
  };

  const onDelete = (row: any) => {
    dispatch(SELECTED(row));
    setOpenConfirmDialog(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteOne(selectedEmployee?._id);
      dispatch(SELECTED(null));
      refresh();
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
      <Box sx={{ display: "flex",justifyContent:'space-between'}} marginBottom={1}>
          <Link passHref href={`${router.pathname}/add`}>
            <Button id="add-button" variant="contained">Add Product</Button>
          </Link>
          <Button onClick={refresh} id="refresh-button" startIcon={<RefreshRounded/>}>Refresh</Button>
      </Box>
        <ProductTable data={data?.data} onEditRow={onEdit} onDeleteRow={onDelete} isLoading={isValidating}/>
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