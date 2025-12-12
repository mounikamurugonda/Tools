import LogoIcon from './LogoIcon';

const Logo = () => {
  return (
    <div className="flex items-center gap-2.5 group">
      <LogoIcon />
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        UtilToolkits
      </span>
    </div>
  );
};


export default Logo;
