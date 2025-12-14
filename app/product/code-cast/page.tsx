import type { Metadata } from "next";
import CodeCastClient from "./CodeCastClient";

export const metadata: Metadata = {
    title: "CodeCast - Visual Coding Demo Tool",
    description: "Create beautiful coding demos and tutorials instantly.",
};

export default function CodeCastPage() {
    return <CodeCastClient />;
}
