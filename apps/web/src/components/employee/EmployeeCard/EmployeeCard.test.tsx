import { render, screen } from "@testing-library/react";
import { EmployeeCard } from "./EmployeeCard";
const testEmployee = {
  last_name: "test",
  first_name: "test",
  gender: "m",
  number: "test",
  email: "test@test.com",
}

describe("employee card component", () => {
  it("should render employee card component correctly", () => {
    render(
      <EmployeeCard
        row={testEmployee}
        onDelete={() => {
          return;
        }}
        onEdit={() => {
          return;
        }}
      />
    );
    expect(screen.getByTestId("number")).toHaveTextContent(testEmployee.number)
    expect(screen.getByTestId('name')).toHaveTextContent(`${testEmployee.first_name} ${testEmployee.last_name}`)
  });
});
