import SelectField from "@components/ui/SelectField/SelectField";
import { ValidationError } from "@components/ui/ValidationError";
import { Box, Button, Grid, TextField, Select,MenuItem } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import useSWR from "swr";
import { getKeyTypeList } from "../../../lib/api/keytype";
import { addOne, updateOne } from "../../../lib/api/keyvalue";
import { KeyValue } from "../../../types/metadata";

export default function KeyValueForm({ kvalue }: { kvalue?: KeyValue<any> | null }) {
  const { enqueueSnackbar } = useSnackbar();

  const {data : keytypes} = useSWR('keytypes',()=> getKeyTypeList({pagination : {pageSize : 0}}))
  
  const {
    handleSubmit,
    handleChange,
    resetForm,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      ...kvalue,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const emp = kvalue
          ? await updateOne(values as KeyValue<any>)
          : await addOne(values as KeyValue<any>);
        enqueueSnackbar(kvalue ? "KeyValue Updated." : "KeyValue Saved.", {
          key: emp?.data?._id,
          id: `emp-form-snackbar`,
          variant: "success",
        });
        !kvalue && resetForm();
      } catch (error) {
        let errMsg: string | React.ReactNode = "Error Occured";
        if (error instanceof AxiosError) {
          error.code === AxiosError.ERR_BAD_REQUEST
            ? (errMsg = <ValidationError response={error?.response?.data} />)
            : (errMsg = error.message);
        }
        enqueueSnackbar(errMsg, {
          variant: "error",
          id: `emp-form-snackbar`,
        });
      }
    },
  });

  const errorProps = (field: keyof KeyValue<any>) => ({
    error: touched[field] && Boolean(errors[field]),
    helperText: touched[field] && errors[field] as string,
  });

  return (
    <Box
      borderRadius={2}
      padding={1}
      marginX={16}
      sx={{ mx: "auto", display: "flex" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} columns={6} maxWidth="xl">
          <Grid item xs={6}>
            <SelectField
              id="key"
              label="key"
              name="key"
              valueKey="name"
              data={keytypes?.data?.data}
              onChange={handleChange}
              {...errorProps("key")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="value"
              label="value"
              name="value"
              onChange={handleChange}
              value={values.value}
              {...errorProps("value")}
            />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <Button
            variant="outlined"
            id="add-button-form"
            sx={{ marginTop: 1 }}
            type="submit"
            disabled={isSubmitting}
            role="button"
            color={kvalue ? "primary" : "success"}
          >
            {kvalue ? "Save" : "Add"}
          </Button>
          {!kvalue && (
            <Button
              variant="text"
              id="reset-button-form"
              sx={{ marginTop: 1 }}
              type="button"
              disabled={isSubmitting}
              onClick={() => resetForm()}
            >
              Clear
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
