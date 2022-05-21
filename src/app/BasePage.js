import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutSplashScreen } from "../_theme/layout";
import { FooterPage } from "../_theme/layout/components/Footer/Footer";
import { HeaderPage } from "../_theme/layout/components/Header/Header";
import { NavbarPage } from "../_theme/layout/components/Navbar/Navbar";
import "../_theme/layout/styles/layout.css";

export default function BasePage() {

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
        {/* <HeaderPage /> */}
        <NavbarPage />
        <Outlet />
        <FooterPage />
        </Suspense>
    );
}
