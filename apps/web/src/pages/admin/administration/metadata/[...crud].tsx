import DashboardLayout from "@components/layout/Dashboard";
import KeyTypeForm from "@components/metadata/KTypeForm";
import KeyValueForm from "@components/metadata/KValueForm";
import ArrowBackSharp from "@mui/icons-material/ArrowBackSharp";
import {
  Alert, CircularProgress,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { getOneById } from "../../../../lib/api/keytype";
import { RootState } from "../../../../store/store";

export default function MetadataEdit() {
  const router = useRouter();
  const { id ,crud ,meta} = router.query;

  const selectedMetadata = useSelector(
    (state: RootState) => state.metadata
  );

  const { data: data, error } = useSWR(
    !selectedMetadata && id && router.isReady &&  crud ==='edit' ? `meta-${id}` : null,
    () => getOneById(String(id)),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <>
      <Grid container columns={2} sx={{ alignItems: "center" }}>
        <IconButton onClick={() => router.back()} sx={{marginRight:1}}>
          <ArrowBackSharp />
        </IconButton>
        <Typography variant='h6'>Edit Metadata</Typography>
      </Grid>
      {!data && router.isReady &&  crud ==='edit'? (
        error ? (
          <Alert severity="error">No Matching Metadata Found</Alert>
        ) : (
          <CircularProgress />
        )
      ) : (
         meta == 'KEYTYPE' ? <KeyTypeForm ktype={selectedMetadata.selectedKType || data?.data}/> : <KeyValueForm kvalue={selectedMetadata.selectedKValue}/> 
      )}
    </>
  );
}


MetadataEdit.getLayout = function getLayout(page:ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}