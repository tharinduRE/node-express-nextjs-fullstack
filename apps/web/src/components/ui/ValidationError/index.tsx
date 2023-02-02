type ValidationErrorReponse = {
  response: {
    message: string;
    errors: {
      [s: string]: string;
    };
  };
};

/**
 * 
 *  Backend Validation Error Response
 */
export function ValidationError({
  response: { errors, message },
}: ValidationErrorReponse) {
  return (
    <div>
      <span className="capitalize">{message}</span>
      {errors && (
        <ul className="">
          {Object.entries(errors).map(([k, v], i) => (
            <li className="capitalize" key={i}>{`${k} - ${v}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
