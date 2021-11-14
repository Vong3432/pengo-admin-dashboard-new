import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { SWRConfig } from 'swr';
import { useToast } from '@chakra-ui/toast';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';

const App = () => {
    return (
        <ChakraProvider theme={theme} resetCSS={false}>
            <AppContent />
        </ChakraProvider>
    )
}

const AppContent = () => {
    const toast = useToast()
    return (
        <SWRConfig
            value={{
                onSuccess: (data) => {
                    console.log("success")
                },
                onError: (err) => {
                    console.log("global swr err", err)
                }
            }}
        >
            <HashRouter>
                <Switch>
                    <Route path={`/auth`} component={AuthLayout} />
                    <Route path={`/admin`} component={AdminLayout} />
                    <Route path={`/rtl`} component={RTLLayout} />
                    <Redirect from={`/`} to="/auth/signin" />
                </Switch>
            </HashRouter>
        </SWRConfig>
    )
}

export default App