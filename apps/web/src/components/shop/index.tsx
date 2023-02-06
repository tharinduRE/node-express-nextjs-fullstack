/* eslint-disable @next/next/no-img-element */
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Badge, BadgeProps, Box, Button, Dialog, Drawer, Grid, IconButton, Slide, styled } from "@mui/material";
import { useState } from "react";
import ShoppingCart from "./ShoppingCart";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 20,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function CartBadge() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <StyledBadge badgeContent={4} color="secondary">
        <IconButton className="mr-4" onClick={handleClickOpen}>
          <ShoppingCartIcon className="w-6" />
        </IconButton>
      </StyledBadge>
      <Drawer
        open={open}
        anchor='right'
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{width:'384px'}}
        hideBackdrop
      >
        <DialogTitle>Shopping Cart</DialogTitle>
        <Button onClick={handleClose}>Close</Button>
        <Box >
   
        <ShoppingCart />
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Button variant="contained" fullWidth>
                  Checkout
                </Button>

                <Button fullWidth sx={{ marginTop: 2 }}>
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </div>
            </div>
     
        </Box>
      </Drawer>
     
    </>
  );
}
