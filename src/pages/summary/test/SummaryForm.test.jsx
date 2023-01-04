import { render, screen, } from '@testing-library/react';
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';

test('Initial Condition', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole("button", { name: /confirm order/i });
    expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const confirmButton = screen.getByRole("button", { name: /confirm order/i });

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test("popover response on hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // Popover starts out hidden
    const nullPopOver = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopOver).not.toBeInTheDocument();

    // Popover appears on mouseover of cheackbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);

    const popOver = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popOver).toBeInTheDocument();

    // Popover disappear when we mouse out
    await user.unhover(termsAndConditions);
    expect(popOver).not.toBeInTheDocument();

})