import { ValidationError } from "@components/ui/ValidationError";
import {
  Box,
  Button,
  FormControl,
  Grid, TextField
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { addOne, updateOne } from "../../../lib/api/product";
import { Product } from "../../../types/product";
import { validationSchema } from "./validationSchema";

export default function ProductForm({ product }: { product?: Product }) {
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, handleChange,resetForm, values, touched, errors, isSubmitting } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        listPrice: 0,
        category: "",
        ...product,
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async () => {
        try {
          const emp = product ? await updateOne(values as Product) : await addOne(values as Product);
          enqueueSnackbar(product ? "Product Updated." : "Product Saved.", {
            key: emp?.data?._id,
            id: `emp-form-snackbar`,
            variant: "success",
          });
          resetForm()
        } catch (error) {
          let errMsg : string | React.ReactNode = "Error Occured";
          if(error instanceof AxiosError){
              error.code === AxiosError.ERR_BAD_REQUEST
                ? (errMsg = <ValidationError response={error?.response?.data}/> )
                : (errMsg = error.message);
          }
          enqueueSnackbar(errMsg, {
            variant: "error",
            id: `emp-form-snackbar`,
          });
        }
      },
    });

  return (
    <Box
      borderRadius={2}
      padding={4}
      marginX={16}
      sx={{ mx: "auto", display: "flex" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={16}>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              First Name
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="first_name"
                  label=""
                  variant="filled"
                  name="first_name"
                  onChange={handleChange}
                  // error={touched.first_name && Boolean(errors.first_name)}
                  // helperText={touched.first_name && errors.first_name}
                  value={values.name}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Last Name{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  id="last_name"
                  name="last_name"
                  onChange={handleChange}
                  // error={touched.last_name && Boolean(errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
                  value={values?.description}
                />
              </FormControl>{" "}
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Email{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="email"
                  label=""
                  variant="filled"
                  name="email"
                  // error={touched.email && Boolean(errors.email)}
                  // helperText={touched.email && errors.email}
                  onChange={handleChange}
                  value={values?.category}
                />
              </FormControl>{" "}
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Phone{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="number"
                  label=""
                  variant="filled"
                  name="number"
                  onChange={handleChange}
                  // value={values?.number}
                  // error={touched.number && Boolean(errors.number)}
                  // helperText={touched.number && errors.number}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            id="add-button-form"
            sx={{marginTop: 2 }}
            type="submit"
            disabled={isSubmitting}
            role='button'
          >
            {product ? "Save" : "Add"}
          </Button>
          {!product && <Button
            variant='text'
            id="reset-button-form"
            sx={{ marginTop: 1 }}
            type="button"
            disabled={isSubmitting}
            onClick={()=>resetForm()}
          >
            Clear
          </Button>}
        </Grid>
      </form>
    </Box>
  );
}