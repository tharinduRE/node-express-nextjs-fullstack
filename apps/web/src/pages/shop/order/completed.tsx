import { CheckCircleRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function OrderCompleted() {
  const router = useRouter();
  return (
    <div className="h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <div className="text-center">
          <CheckCircleRounded sx={{fontSize: 64}} color="success"/>
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Order Placed Successfully!
          </h3>
          <h5 className="md:text-xl text-base text-gray-900 font-semibold text-center">
            Order No: {router?.query?.ref}
          </h5>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              href="/shop">
              <Button variant='contained' size="large">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
