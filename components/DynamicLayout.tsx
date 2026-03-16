"use client";

import dynamic from "next/dynamic";

export const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
