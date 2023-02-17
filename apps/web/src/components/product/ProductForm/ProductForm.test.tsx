import { fireEvent, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import ProductFrom from ".";

describe("product form component", () => {
  it('Should render errors on validation correctly', async() => {
    const { getByRole, container }  = render(
      <SnackbarProvider>
        <ProductFrom />
      </SnackbarProvider>
    );

    const button = getByRole('button',{name: "Add"});
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(container.querySelector('#name-helper-text')).toHaveTextContent("Product name required.");
      expect(container.querySelector('#name-helper-text')).toHaveClass("Mui-error");

    });

  })

});
