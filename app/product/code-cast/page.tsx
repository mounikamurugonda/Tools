import type { Metadata } from "next";
import CodeCastManager from "./CodeCastManager";

export const metadata: Metadata = {
    title: "Code Cast | Real-time Code Broadcasting",
    description: "Broadcast your code in real-time. Share your editor view with anyone, anywhere. Free for now (Watermarked).",
};

export default function CodeCastPage() {
    return <CodeCastManager />;
}
