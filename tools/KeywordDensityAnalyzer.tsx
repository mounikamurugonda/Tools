'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, Eraser } from 'lucide-react';

const STOP_WORDS = new Set<string>([
  'a','about','above','after','again','against','all','am','an','and','any','are','as','at',
  'be','because','been','before','being','below','between','both','but','by','can','could',
  'did','do','does','doing','down','during','each','few','for','from','further','had','has',
  'have','having','he','her','here','hers','herself','him','himself','his','how','i','if','in',
  'into','is','it','its','itself','just','me','more','most','my','myself','no','nor','not',
  'now','of','off','on','once','only','or','other','our','ours','ourselves','out','over','own',
  's','same','she','should','so','some','such','t','than','that','the','their','theirs','them',
  'themselves','then','there','these','they','this','those','through','to','too','under','until',
  'up','very','was','we','were','what','when','where','which','while','who','whom','why','will',
  'with','would','you','your','yours','yourself','yourselves',
]);

type Ngram = { keyword: string; count: number; density: number };
type Sort = 'count' | 'density' | 'alpha';

function topNgrams(words: string[], n: number, total: number, sort: Sort): Ngram[] {
  if (words.length < n) return [];
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const g = words.slice(i, i + n).join(' ');
    map.set(g, (map.get(g) ?? 0) + 1);
  }
  const arr: Ngram[] = Array.from(map.entries())
    .filter(([, c]) => c >= 2 || n === 1)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: total ? (count / total) * 100 : 0,
    }));
  arr.sort((a, b) => {
    if (sort === 'count') return b.count - a.count || a.keyword.localeCompare(b.keyword);
    if (sort === 'density')
      return b.density - a.density || a.keyword.localeCompare(b.keyword);
    return a.keyword.localeCompare(b.keyword);
  });
  return arr.slice(0, 25);
}

const KeywordDensityAnalyzer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog. The dog was not amused. The fox laughed.'
  );
  const [ignoreStop, setIgnoreStop] = useState(true);
  const [sort, setSort] = useState<Sort>('count');
  const toast = useToast();

  const debounced = useDebounce(text, 300);

  const analysis = useMemo(() => {
    const cleaned = debounced.toLowerCase().replace(/[^\p{L}\p{N}\s']/gu, '');
    const all = cleaned.split(/\s+/).filter(Boolean);
    const filtered = ignoreStop ? all.filter(w => !STOP_WORDS.has(w)) : all;
    return {
      totalRaw: all.length,
      totalFiltered: filtered.length,
      uniqueRaw: new Set(all).size,
      uniqueFiltered: new Set(filtered).size,
      one: topNgrams(filtered, 1, filtered.length, sort),
      two: topNgrams(filtered, 2, filtered.length, sort),
      three: topNgrams(filtered, 3, filtered.length, sort),
    };
  }, [debounced, ignoreStop, sort]);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const t = await file.text();
        setText(t);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const exportCsv = useCallback(() => {
    const rows = [
      'ngram_length,keyword,count,density_pct',
      ...analysis.one.map(r => `1,"${r.keyword}",${r.count},${r.density.toFixed(2)}`),
      ...analysis.two.map(r => `2,"${r.keyword}",${r.count},${r.density.toFixed(2)}`),
      ...analysis.three.map(r => `3,"${r.keyword}",${r.count},${r.density.toFixed(2)}`),
    ].join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-density.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [analysis]);

  return (
    <ToolContainer title="Keyword Density Analyzer" details={details} toolId={toolId}>
      <div className="space-y-4">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,.html,text/plain"
          maxSizeMB={20}
          title="Drop a document"
          description="or paste content below"
        />

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="kw-input">Source text</Label>
            <button
              type="button"
              onClick={() => setText('')}
              disabled={!text}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
              aria-label="Clear"
              title="Clear"
            >
              <Eraser size={16} />
            </button>
          </div>
          <TextArea
            id="kw-input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text here to analyze keyword density..."
            className="h-48"
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={ignoreStop}
                onChange={e => setIgnoreStop(e.target.checked)}
              />
              Ignore common stop words ({STOP_WORDS.size} terms)
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Sort:</span>
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
                {(['count', 'density', 'alpha'] as Sort[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSort(s)}
                    aria-pressed={sort === s}
                    className={`px-2.5 py-1 text-xs rounded ${
                      sort === s ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={exportCsv}
              disabled={analysis.totalFiltered === 0}
              className="ml-auto"
            >
              <Download size={14} className="mr-1" /> Export CSV
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <Stat label="Total words" v={analysis.totalRaw} />
            <Stat label="Unique words" v={analysis.uniqueRaw} />
            <Stat label="After stop-word filter" v={analysis.totalFiltered} />
            <Stat label="Unique after filter" v={analysis.uniqueFiltered} />
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <KeywordTable title="1-word keywords" data={analysis.one} onCopy={k => copyToast(k, toast)} />
          <KeywordTable title="2-word phrases" data={analysis.two} onCopy={k => copyToast(k, toast)} />
          <KeywordTable title="3-word phrases" data={analysis.three} onCopy={k => copyToast(k, toast)} />
        </div>
      </div>
    </ToolContainer>
  );
};

function copyToast(value: string, toast: ReturnType<typeof useToast>) {
  navigator.clipboard
    .writeText(value)
    .then(() => toast.success(`"${value}" copied`))
    .catch(() => toast.error('Copy failed'));
}

const Stat: React.FC<{ label: string; v: number }> = ({ label, v }) => (
  <div className="rounded-lg bg-gray-50 dark:bg-gray-800/40 px-3 py-2 border border-gray-200 dark:border-gray-700">
    <div className="text-gray-500 dark:text-gray-400">{label}</div>
    <div className="text-base font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
      {v.toLocaleString()}
    </div>
  </div>
);

interface TableProps {
  title: string;
  data: Ngram[];
  onCopy: (kw: string) => void;
}
const KeywordTable: React.FC<TableProps> = ({ title, data, onCopy }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
    <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">{title}</h3>
    <div data-lenis-prevent className="overflow-auto h-80">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0">
          <tr>
            <th scope="col" className="px-3 py-2">Keyword</th>
            <th scope="col" className="px-3 py-2 text-right">Count</th>
            <th scope="col" className="px-3 py-2 text-right">Density</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(({ keyword, count, density }) => (
              <tr
                key={keyword}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-900/40 cursor-pointer"
                onClick={() => onCopy(keyword)}
                title="Click to copy"
              >
                <td className="px-3 py-1.5 font-medium inline-flex items-center gap-1">
                  <Copy size={11} className="opacity-30" />
                  {keyword}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums">{count}</td>
                <td className="px-3 py-1.5 text-right tabular-nums">{density.toFixed(2)}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No data to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default KeywordDensityAnalyzer;
