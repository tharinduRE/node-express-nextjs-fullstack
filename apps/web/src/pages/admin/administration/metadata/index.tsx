import DashboardLayout from "@components/layout/Dashboard";
import { KeyTypeTable, KeyValueTable } from "@components/metadata";
import KeyTypeForm from "@components/metadata/KTypeForm";
import { ConfirmationDialog } from "@components/ui";
import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ReactElement, useState } from "react";
import useSWR, { mutate } from "swr";
import { deleteOne, getKeyTypeList } from "../../../../lib/api/keytype";
import { getKeyValueList } from "../../../../lib/api/keyvalue";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { SelectKType } from "../../../../store/slices/metadata";

export default function UserListPage() {
  const { selectedKType, ...rest } = useAppSelector((state) => state.metadata);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const bulidFetcherKeyKT = `keytypes-${JSON.stringify(rest)}`;
  const bulidFetcherKeyKV = `keyvalues-${JSON.stringify(rest)}`;

  const { data: keytypes, error } = useSWR(bulidFetcherKeyKT, () =>
    getKeyTypeList({ ...rest })
  );

  const { data: keyvalues } = useSWR(bulidFetcherKeyKV, () =>
    getKeyValueList({ ...rest })
  );

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onDelete = (row: any) => {
    dispatch(SelectKType(row));
    setOpenConfirmDialog(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteOne(selectedKType?._id);
      dispatch(SelectKType(null));
      // mutate(bulidFetcherKey);
      enqueueSnackbar(`Successfully Deleted User`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error Occured while deleteing", { variant: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const onEdit = (row: any) => {
    dispatch(SelectKType(row));
  };

  if (error)
    return <Alert severity="error">Error Occured during fetching data</Alert>;
  return (
    <>
      <Box
        sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
        // marginBottom={1}
      >
        <div>
        <Link passHref href={{pathname : `${router.pathname}/add` , query :{ meta : 'KEYTYPE'}}}>
          <Button id="add-button">Add KeyType </Button>
        </Link>
        <Link passHref href={{pathname : `${router.pathname}/add` , query :{ meta : 'KEYVALUE'}}}>
          <Button id="add-button">Add Key Value </Button>
        </Link>
        </div>
      </Box>
      <Divider sx={{marginTop : 1}}/>
      <Typography variant='body1' paddingY={2}>Key Types</Typography>
      <KeyTypeTable data={keytypes?.data} onEditRow={onEdit}  hideActions />
      <Divider sx={{paddingY:2}}/>
      <Typography variant='body1' paddingY={2}>Key Values</Typography>
      <KeyValueTable data={keyvalues?.data} hideActions />
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

UserListPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
