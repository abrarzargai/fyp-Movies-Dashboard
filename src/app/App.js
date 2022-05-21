/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { MyRoutes } from "../app/Routes";
import ScrollToTop from "react-scroll-to-top";
import { LayoutSplashScreen } from "../_theme/layout";
import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
              {/* Provide `react-intl` context synchronized with Redux state.  */}
                {/* Render routes with provided `Layout`. */}
                <ScrollToTop  component={<i className="fa fa-chevron-up"></i>} style={{ paddingLeft: "1.5rem", backgroundColor: "#bd1212", color: "#FFFFFF"}} smooth />
                <MyRoutes />
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
