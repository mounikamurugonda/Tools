import { Metadata } from 'next';
import CodeSenseClientWrapper from './CodeSenseClientWrapper';

export const metadata: Metadata = {
    title: 'CodeSense | Intelligent Code Formatting & Detection',
    description:
        'Automatically detect and format your code with CodeSense. The smart coding assistant for developers.',
};

export default function CodeSensePage() {
    return <CodeSenseClientWrapper />;
}
