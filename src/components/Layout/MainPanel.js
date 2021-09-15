import { Box, useStyleConfig, useToast } from "@chakra-ui/react";
import { SWRConfig } from "swr";
function MainPanel(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop

  const toast = useToast();
  const toastId = "global-swr-err" // prevent duplication.

  const onError = (error, key) => {
    if (error.status !== 403 && error.status !== 404) {
      // We can send the error to Sentry,
      // or show a notification UI.
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: "Oops, something went wrong!",
          description: error.toString(),
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <SWRConfig value={{ onError }}>
      <Box __css={styles} {...rest}>
        {children}
      </Box>
    </SWRConfig>
  );
}

export default MainPanel;
