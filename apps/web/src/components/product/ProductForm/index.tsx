import { ValidationError } from "@components/ui/ValidationError";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { addOne, updateOne } from "../../../lib/api/product";
import { Product } from "../../../types/product";

export default function ProductForm({ product }: { product?: Product }) {
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
      description: "",
      listPrice: 0,
      category: "",
      ...product,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const emp = product
          ? await updateOne(values as Product)
          : await addOne(values as Product);
        enqueueSnackbar(product ? "Product Updated." : "Product Saved.", {
          key: emp?.data?._id,
          id: `emp-form-snackbar`,
          variant: "success",
        });
        !product && resetForm();
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

  return (
    <Box
      borderRadius={2}
      padding={4}
      marginX={16}
      sx={{ mx: "auto", display: "flex" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} columns={12} maxWidth="xl">
          <Grid item xs={6}>
            <TextField
              id="name"
              label="Product ID"
              InputProps={{
                readOnly: true,
              }}
              disabled
              placeholder="Auto Generated"
              value={values.itemId}
            />
            <TextField
              id="name"
              label="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
            />

            <TextField
              id="description"
              label="Description"
              multiline
              name="description"
              rows={5}
              onChange={handleChange}
              value={values.description}
            />
            <TextField
              id="name"
              label="Price"
              name="listPrice"
              onChange={handleChange}
              value={values.listPrice}
            />
            <TextField
              id="name"
              label="Category"
              name="category"
              onChange={handleChange}
              value={values.category}
            />
            <TextField
              id="name"
              label="Sub Category"
              name="subcategory"
              onChange={handleChange}
              value={values.subcategory}
            />
            {/* <FormControl
              variant="standard"
              sx={{ minWidth: 120 }}
              margin="dense"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>

              <Select
                id="category"
                value={values.category}
                name="category"
                onChange={handleChange}
              ></Select>
            </FormControl> */}
          </Grid>
          <Grid item xs={6}>
            {product && (
              <TextField
                id="slug"
                label="Slug"
                InputProps={{
                  readOnly: true,
                }}
                disabled
                helperText="Used to build SEO friendly URLs"
                value={values.slug}
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={values.active}
                  onChange={handleChange}
                  value={values.active}
                  name="active"
                />
              }
              label="Active"
              labelPlacement="start"
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
            color={product ? "primary" : "success"}
          >
            {product ? "Save" : "Add"}
          </Button>
          {!product && (
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
