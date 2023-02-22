import { ValidationError } from "@components/ui/ValidationError";
import { Box, Button, Grid, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { addOne, updateOne } from "../../../lib/api/keytype";
import { KeyType } from "../../../types/metadata";

export default function KeyTypeForm({ ktype }: { ktype?: KeyType }) {
  const { enqueueSnackbar } = useSnackbar();

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
      ...ktype,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const emp = ktype
          ? await updateOne(values as KeyType)
          : await addOne(values as KeyType);
        enqueueSnackbar(ktype ? "KeyType Updated." : "KeyType Saved.", {
          key: emp?.data?._id,
          id: `emp-form-snackbar`,
          variant: "success",
        });
        !ktype && resetForm();
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

  const errorProps = (field: keyof KeyType) => ({
    error: touched[field] && Boolean(errors[field]),
    helperText: touched[field] && errors[field],
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
            <TextField
              id="name"
              label="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              {...errorProps("name")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="description"
              label="Description"
              name="description"
              onChange={handleChange}
              value={values.description}
              {...errorProps("description")}
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
            color={ktype ? "primary" : "success"}
          >
            {ktype ? "Save" : "Add"}
          </Button>
          {!ktype && (
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
