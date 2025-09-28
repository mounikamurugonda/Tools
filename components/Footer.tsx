import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-transparent text-center p-6 text-gray-500 dark:text-gray-400 text-sm mt-auto">
      <div className="flex justify-center space-x-6">
        <Link href="/about" className="hover:text-blue-500">About</Link>
        <Link href="/contact" className="hover:text-blue-500">Contact</Link>
        <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
      </div>
      <p className="mt-4">
        © {new Date().getFullYear()} UtilToolkits. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
