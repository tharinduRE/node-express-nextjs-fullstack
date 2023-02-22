import { fireEvent, render, waitFor } from "@testing-library/react";
import SelectField from "./SelectField";

describe("SelectField component", () => {
  it("Should render component even if no data is provided", async () => {
    const { getByRole, container } = render(
      <SelectField data={undefined} valueKey="none" />
    );
  });
});
