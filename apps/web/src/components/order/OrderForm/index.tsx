import { getDummyImage } from "@components/product/helpers";
import { ValidationError } from "@components/ui/ValidationError";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { addOne, updateOne } from "../../../lib/api/order";
import { Order, status } from "../../../types/order";

export default function OrderForm({ order }: { order?: Order }) {
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
      ...order,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const emp = order
          ? await updateOne(values as Order)
          : await addOne(values as Order);
        enqueueSnackbar(order ? "Order Updated." : "Order Saved.", {
          key: emp?.data?._id,
          id: `emp-form-snackbar`,
          variant: "success",
        });
        !order && resetForm();
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
    <form onSubmit={handleSubmit}>
      <Box
        borderRadius={2}
        padding={4}
        marginX={16}
        sx={{ mx: "auto", display: "flex" }}
      >
        <Grid container spacing={4} columns={12} maxWidth="xl">
          <Grid item xs={6}>
            <TextField
              id="slug"
              label="Order Total Amount"
              InputProps={{
                readOnly: true,
              }}
              disabled
              value={values.amount}
            />
            <Box paddingY={2}>
              Items :
              <List dense>
                {order?.items?.map((item, idx) => (
                  <ListItem key={idx} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        sx={{
                          width: 72,
                          height: 72,
                          marginRight: 5,
                          borderRadius: 2,
                        }}
                        src={getDummyImage(item.product)}
                        alt="product-image"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      title={item?.product.name}
                      // secondary={item?.product.description}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="text.primary">
                          {item?.product.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="p"
                            variant="body1"
                            color="text.primary"
                          >
                            {`Qty : ${item?.quantity}`}
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            color="text.primary.light"
                          >
                            {item?.product.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <FormControl
              variant="standard"
              sx={{ minWidth: 120 }}
              margin="dense"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>

              <Select
                id="status"
                value={values.status}
                name="status"
                onChange={handleChange}
              >
                {status.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="slug"
              label="Ordered On"
              InputProps={{
                readOnly: true,
              }}
              disabled
              value={values.createdAt}
            />
            <TextField
              id="slug"
              label="Last Updated"
              InputProps={{
                readOnly: true,
              }}
              disabled
              value={values.updatedAt}
            />
            <TextField
              id="slug"
              label="Ordered By"
              InputProps={{
                readOnly: true,
              }}
              disabled
              value={values.userId?.email}
            />
          </Grid>
          <Grid item>
            <Box marginTop={2}>
              <Button
                variant="outlined"
                id="add-button-form"
                sx={{ marginTop: 1 }}
                type="submit"
                disabled={isSubmitting}
                role="button"
                color={order ? "primary" : "success"}
              >
                {order ? "Update" : "Add"}
              </Button>
              {!order && (
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
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
