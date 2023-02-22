import SelectField from "@components/ui/SelectField/SelectField";
import { ValidationError } from "@components/ui/ValidationError";
import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControlLabel, Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import useSWR from "swr";
import { getKeyValuesByKey } from "../../../lib/api/keyvalue";
import { addOne, updateOne } from "../../../lib/api/product";
import { Product } from "../../../types/product";
import { validationSchema } from "./validationSchema";

export default function ProductForm({ product }: { product?: Product }) {
  const { enqueueSnackbar } = useSnackbar();

  const {data : _categorys} = useSWR('kv-category',()=> getKeyValuesByKey('CATEGORY'))
  const {data : _subcategorys} = useSWR('kv-subcategory',()=> getKeyValuesByKey('SUB_CATEGORY'))
  const {data : _product_attrib} = useSWR('kv-product_attrib',()=> getKeyValuesByKey('PROD_ATTRIB'))

 const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      listPrice: 0,
      category: "",
      active : true,
      ...product,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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

  const {
    handleSubmit,
    handleChange,
    resetForm,
    values,
    touched,
    errors,
    isSubmitting,
  } = formik

  const errorProps = (field: keyof Product) => ({
    error: touched[field] && Boolean(errors[field]),
    helperText: touched[field] && errors[field],
  })

  return (
    <Box
      borderRadius={2}
      padding={4}
      marginX={16}
      sx={{ mx: "auto", display: "flex" }}
    >
      <FormikProvider value={formik}>
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
                {...errorProps("name")}
              />

              <TextField
                id="description"
                label="Description"
                multiline
                name="description"
                rows={5}
                onChange={handleChange}
                value={values.description}
                {...errorProps("description")}
              />
              <TextField
                id="name"
                label="Price"
                name="listPrice"
                onChange={handleChange}
                value={values.listPrice}
                {...errorProps("listPrice")}
              />
              <SelectField
                id="category"
                value={values.category}
                name="category"
                valueKey='value'
                data={_categorys?.data?.data}
                onChange={handleChange}
                {...errorProps("category")}
                />
              <SelectField
                id="name"
                label="Sub Category"
                name="subcategory"
                valueKey='value'
                data={_subcategorys?.data?.data}
                onChange={handleChange}
                value={values.subcategory}
                {...errorProps("subcategory")}
              />
                    
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
                sx={{ marginLeft: 0 }}
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
              {/* <Typography paddingBottom={2}>Attributes</Typography>
              <FieldArray
                name="attributes"
                render={(arrayHelpers) => (
                  <div>
                    {values.attributes &&
                      values.attributes.length > 0 &&
                      values.attributes.map((attr, index) => (
                        <>
                          <div
                            key={index}
                            className="flex justify-between gap-2 items-center"
                          >
                            <SelectField
                              name={`attributes.${index}.key`}
                              label="key"
                              value={attr.key}
                              onChange={handleChange}
                              data={_product_attrib?.data?.data}
                              valueKey='value'
                              />
                            <TextField
                              name={`attributes.${index}.value`}
                              label="value"
                              value={attr.value}
                              onChange={handleChange}
                            />
                            <div>
                              {" "}
                              <IconButton
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Delete />
                              </IconButton>
                            </div>
                          </div>
                        </>
                      ))}
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ key: "", value: "" })}
                    >
                      Add Attribute
                    </Button>
                  </div>
                )}
              /> */}
            </Grid>
            {/* <Grid item xs={8}> <AttributeTable attributes={values?.attributes}/></Grid> */}
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
      </FormikProvider>
    </Box>
  );
}

// export function AttributeTable({ attributes }: { attributes: any }) {
//   return (
//     <DataTable
//       data={{data : attributes}}
//       hideActions
//       headCells={[
//         {
//           id: "key",
//         },
//         {
//           id: "value",
//         },
//       ]}
//     />
//   );
// }