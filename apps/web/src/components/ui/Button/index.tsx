import * as React from 'react';
import ButtonUnstyled, {
  ButtonUnstyledOwnerState,
  ButtonUnstyledProps,
} from '@mui/base/ButtonUnstyled';

const Button = React.forwardRef(function Button(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <ButtonUnstyled
      {...props}
      slotProps={{
        root: (state: ButtonUnstyledOwnerState) => ({
          className: `mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:text-cyan-500 transition-colors ${
            state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : ''
          }`,
        }),
      }}
      ref={ref}
    />
  );
});

export default Button;
