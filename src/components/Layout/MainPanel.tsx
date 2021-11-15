import { Box, useStyleConfig, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { SWRConfig } from "swr";
function MainPanel(props: any) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop

  const toast = useToast();
  const history = useHistory()
  const toastId = "global-swr-err" // prevent duplication.

  const onError = (error: { status: number; toString: () => any; }, key: any) => {
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
        console.log('push to signin')
        history.push('/')
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
