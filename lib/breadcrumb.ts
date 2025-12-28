import { TOOLS } from '@/constants';
import { blogs } from '@/lib/blogs';
import { TIPS } from '@/lib/tips';

export const getBreadcrumbItems = (pathname: string) => {
  const pathParts = pathname.split('/').filter(part => part);
  const breadcrumbItems = [{ name: 'Home', href: '/' }];

  let currentPath = '';
  pathParts.forEach(part => {
    currentPath += `/${part}`;
    const tool = TOOLS.find(t => t.id === part);
    const blog = blogs.find(b => b.id === part);
    const tipCategory = TIPS.find(p => p.category.toLowerCase() === part.toLowerCase());

    if (tool) {
      breadcrumbItems.push({ name: tool.name, href: currentPath });
    } else if (blog) {
      breadcrumbItems.push({ name: blog.title, href: currentPath });
    } else if (tipCategory) {
      breadcrumbItems.push({ name: tipCategory.category, href: currentPath });
    } else {
      breadcrumbItems.push({
        name: part.charAt(0).toUpperCase() + part.slice(1),
        href: currentPath,
      });
    }
  });

  return breadcrumbItems;
};
