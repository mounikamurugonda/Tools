import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const MetaTagGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');

  const output = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="viewport" content="width=device-width, initial-scale=1">`;

  return (
    <ToolContainer title="Meta Tag Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Page Details" className="h-[calc(100%-1rem)]">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <Label>Page Title</Label>
                <span className="text-xs text-gray-500">{title.length}/60</span>
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
                placeholder="Enter page title"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <Label>Description</Label>
                <span className="text-xs text-gray-500">{description.length}/160</span>
              </div>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={160}
                placeholder="Enter page description"
                className="h-24"
              />
            </div>
            <div>
              <Label>Keywords (comma separated)</Label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            <div>
              <Label>Author</Label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
            </div>
          </div>
        </Card>

        <Card title="Generated HTML" className="h-full">
          <div className="relative h-full flex flex-col">
            <TextArea
              readOnly
              value={output}
              className="flex-1 min-h-[300px] font-mono text-sm resize-none"
            />
            <CopyButton textToCopy={output} className="absolute top-2 right-2" />
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default MetaTagGenerator;
