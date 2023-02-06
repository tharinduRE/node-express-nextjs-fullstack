import { fireEvent, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import EmployeeForm from ".";

describe("emplyoee form component", () => {
  it('Should render errors on validation correctly', async() => {
    const { getByRole, container }  = render(
      <SnackbarProvider>
        <EmployeeForm />
      </SnackbarProvider>
    );

    const button = getByRole('button',{name: "Add"});
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(container.querySelector('#email-helper-text')).toHaveTextContent("Email is required");
      expect(container.querySelector('#email-helper-text')).toHaveClass("Mui-error");

    });

  })

  it('Should clear the validations and form on clear button', async() => {
    const { getByRole, container }  = render(
      <SnackbarProvider>
        <EmployeeForm />
      </SnackbarProvider>
    );
    const button = getByRole('button',{name: "Clear"});
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(container.querySelector('#email-helper-text')).toBe(null);

    });

  })

});
