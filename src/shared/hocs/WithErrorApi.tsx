import { useState, type ComponentType } from "react";

export const WithErrorApi = <P extends object>(View: ComponentType<P>) => {
  const [errorApi, setErrorApi] = useState<boolean>(false);
  return (props: P) => {
    return (
      <>
        {errorApi ? (
          <h2>Error</h2>
        ) : (
          <View
            setErrorApi={setErrorApi}
            {...props}
          />
        )}
      </>
    );
  };
};
