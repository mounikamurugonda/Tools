"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Readable } from "stream"
import ExcelJS from "exceljs"
import {
  UploadCloud,
  File,
  Settings,
  Download,
  Copy,
  Loader2,
  RefreshCw,
  FileSpreadsheet,
  FileJson,
  Code2,
  Database,
  Users,
  X,
  CheckCircle2,
} from "lucide-react"
import type { ToolProps } from "@/types"
import ToolContainer from "@/components/ToolContainer"

type OutputFormat = "xlsx" | "csv" | "sql" | "html" | "json" | "md" | "vcf" | "tsv"
type QuoteFields = "smart" | "always" | "never"

interface ConvertOptions {
  separator: string
  includeHeaders: boolean
  quoteFields: QuoteFields
  replaceLineBreaks: boolean
  lineBreakReplacement: string
}

const outputFormats: {
  value: OutputFormat
  label: string
  icon: React.ReactNode
  description: string
  extension: string
  color: string
}[] = [
  {
    value: "xlsx",
    label: "Excel",
    icon: <FileSpreadsheet size={20} />,
    description: "Spreadsheet",
    extension: ".xlsx",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    value: "csv",
    label: "CSV",
    icon: <File size={20} />,
    description: "Text Format",
    extension: ".csv",
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "tsv",
    label: "TSV",
    icon: <File size={20} />,
    description: "Tab-Separated",
    extension: ".tsv",
    color: "from-lime-500 to-lime-600",
  },
  {
    value: "json",
    label: "JSON",
    icon: <FileJson size={20} />,
    description: "Data Format",
    extension: ".json",
    color: "from-amber-500 to-amber-600",
  },
  {
    value: "sql",
    label: "SQL",
    icon: <Database size={20} />,
    description: "Database",
    extension: ".sql",
    color: "from-purple-500 to-purple-600",
  },
  {
    value: "html",
    label: "HTML Table",
    icon: <Code2 size={20} />,
    description: "Web Format",
    extension: ".html",
    color: "from-red-500 to-red-600",
  },
  {
    value: "md",
    label: "Markdown",
    icon: <File size={20} />,
    description: "Documentation",
    extension: ".md",
    color: "from-slate-500 to-slate-600",
  },
  {
    value: "vcf",
    label: "vCard",
    icon: <Users size={20} />,
    description: "Contacts",
    extension: ".vcf",
    color: "from-pink-500 to-pink-600",
  },

]

const parseCsv = (csvString: string, separator: string): { headers: string[]; rows: string[][] } => {
  const lines = csvString.trim().split("\n")
  const headers = lines[0].split(separator).map((h) => h.trim())
  const rows = lines.slice(1).map((line) => line.split(separator).map((cell) => cell.trim()))
  return { headers, rows }
}

const convertToJson = (csvString: string, separator: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const data = rows.map((row) => {
    const obj: any = {}
    headers.forEach((header, index) => {
      obj[header] = row[index] || ""
    })
    return obj
  })
  return JSON.stringify(data, null, 2)
}

const convertToSql = (csvString: string, separator: string, tableName: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const createTable = `CREATE TABLE \`${tableName}\` (\n${headers.map((h) => `  \`${h}\` VARCHAR(255)`).join(",\n")}\n);\n\n`
  const inserts = rows
    .map((row) => {
      const values = row.map((cell) => `'${cell.replace(/'/g, "''")}'`).join(", ")
      return `INSERT INTO \`${tableName}\` (${headers.map((h) => `\`${h}\``).join(", ")}) VALUES (${values});`
    })
    .join("\n")
  return createTable + inserts
}

const convertToHtml = (csvString: string, separator: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  const head = `<thead>\n  <tr>\n${headers.map((h) => `    <th>${escapeHtml(h)}</th>`).join("\n")}\n  </tr>\n</thead>`
  const body = `<tbody>\n${rows.map((row) => `  <tr>\n${row.map((cell) => `    <td>${escapeHtml(cell)}</td>`).join("\n")}\n  </tr>`).join("\n")}\n</tbody>`
  return `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    table { border-collapse: collapse; width: 100%; }\n    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n    th { background-color: #f2f2f2; }\n  </style>\n</head>\n<body>\n<table>\n${head}\n${body}\n</table>\n</body>\n</html>`
}

const convertToMarkdown = (csvString: string, separator: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const headerLine = `| ${headers.join(" | ")} |`
  const separatorLine = `| ${headers.map(() => "---").join(" | ")} |`
  const bodyLines = rows.map((row) => `| ${row.join(" | ")} |`).join("\n")
  return [headerLine, separatorLine, bodyLines].join("\n")
}

const convertToVcf = (csvString: string, separator: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const nameHeader = headers.find((h) => /name/i.test(h)) || headers[0]
  const emailHeader = headers.find((h) => /email/i.test(h)) || headers[1]
  const phoneHeader = headers.find((h) => /phone/i.test(h)) || headers[2]

  return rows
    .map((row) => {
      const name = row[headers.indexOf(nameHeader)] || ""
      const email = row[headers.indexOf(emailHeader)] || ""
      const phone = row[headers.indexOf(phoneHeader)] || ""
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${name}`,
        `N:${name};;;;`,
        email ? `EMAIL;TYPE=INTERNET:${email}` : null,
        phone ? `TEL;TYPE=CELL:${phone}` : null,
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n")
    })
    .join("\n")
}

const convertToTsv = (csvString: string, separator: string): string => {
  const { headers, rows } = parseCsv(csvString, separator)
  const headerLine = headers.join("\t")
  const bodyLines = rows.map((row) => row.join("\t")).join("\n")
  return [headerLine, bodyLines].join("\n")
}

const convertSheetToCsv = (worksheet: ExcelJS.Worksheet, options: ConvertOptions): string => {
  const data: any[][] = []
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const rowValues = row.values as any[]
    data.push(rowValues.slice(1))
  })

  if (!options.includeHeaders && data.length > 0) {
    data.shift()
  }

  if (data.length === 0) return ""

  const escapeCell = (cell: any): string => {
    const str = String(cell === null || cell === undefined ? "" : cell)

    let finalStr = str
    if (options.replaceLineBreaks) {
      finalStr = finalStr.replace(/(\r\n|\n|\r)/gm, options.lineBreakReplacement)
    }

    let needsQuotes = false
    if (options.quoteFields === "always") {
      needsQuotes = true
    } else if (options.quoteFields === "smart") {
      needsQuotes = finalStr.includes(options.separator) || finalStr.includes('"') || finalStr.includes("\n")
    }

    if (needsQuotes) {
      return `"${finalStr.replace(/"/g, '""')}"`
    }
    return finalStr
  }

  return data.map((row) => row.map(escapeCell).join(options.separator)).join("\n")
}

const CsvXlsxConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [error, setError] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [conversionType, setConversionType] = useState<"csv-to-xlsx" | "xlsx-to-csv" | null>(null)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("xlsx")
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload")
  const [showOptions, setShowOptions] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const [csvInput, setCsvInput] = useState("")
  const [isPasted, setIsPasted] = useState(false)
  const [csvToXlsxSeparator, setCsvToXlsxSeparator] = useState(",")
  const [csvToXlsxCustomSeparator, setCsvToXlsxCustomSeparator] = useState("")
  const [hasHeaders, setHasHeaders] = useState(true)
  const [sheetName, setSheetName] = useState("Sheet1")
  const [sqlTableName, setSqlTableName] = useState("my_table")

  const [csvOutput, setCsvOutput] = useState("")
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null)
  const [sheetNames, setSheetNames] = useState<string[]>([])
  const [selectedSheet, setSelectedSheet] = useState("")
  const [xlsxToCsvSeparator, setXlsxToCsvSeparator] = useState(",")
  const [xlsxToCsvCustomSeparator, setXlsxToCsvCustomSeparator] = useState("")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [quoteFields, setQuoteFields] = useState<QuoteFields>("smart")
  const [replaceLineBreaks, setReplaceLineBreaks] = useState(true)
  const [lineBreakReplacement, setLineBreakReplacement] = useState(" ")

  const handleConvertAndDownload = async () => {
    try {
      setIsProcessing(true)
      setError("")

      const sourceCsv = conversionType === "xlsx-to-csv" ? csvOutput : csvInput
      if (!sourceCsv.trim()) {
        setError("Input data is empty or not yet processed. Please wait or check your input.")
        return
      }

      let separator: string
      if (conversionType === "xlsx-to-csv") {
        separator = xlsxToCsvSeparator === "custom" ? xlsxToCsvCustomSeparator : xlsxToCsvSeparator
      } else {
        separator = csvToXlsxSeparator === "custom" ? csvToXlsxCustomSeparator : csvToXlsxSeparator
      }

      if (!separator && outputFormat !== "csv" && outputFormat !== "xlsx") {
        setError("Separator must be defined for this conversion.")
        return
      }

      let blob: Blob
      const selectedFormat = outputFormats.find((f) => f.value === outputFormat)
      const fileName =
        (isPasted ? "converted" : uploadedFile?.name.split(".")[0] || "converted") + selectedFormat?.extension

      switch (outputFormat) {
        case "xlsx":
          const newWorkbook = new ExcelJS.Workbook()
          const stream = new Readable()
          stream.push(sourceCsv)
          stream.push(null)
          const worksheet = await newWorkbook.csv.read(stream, {
            parserOptions: { delimiter: separator, headers: hasHeaders },
          })
          worksheet.name = sheetName.trim() || "Sheet1"
          const buffer = await newWorkbook.xlsx.writeBuffer()
          blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
          break
        case "csv":
          blob = new Blob([sourceCsv], { type: "text/csv;charset=utf-8;" })
          break
        case "json":
          const json = convertToJson(sourceCsv, separator)
          blob = new Blob([json], { type: "application/json" })
          break
        case "sql":
          const sql = convertToSql(sourceCsv, separator, sqlTableName)
          blob = new Blob([sql], { type: "application/sql" })
          break
        case "html":
          const html = convertToHtml(sourceCsv, separator)
          blob = new Blob([html], { type: "text/html" })
          break
        case "md":
          const md = convertToMarkdown(sourceCsv, separator)
          blob = new Blob([md], { type: "text/markdown" })
          break
        case "vcf":
          const vcf = convertToVcf(sourceCsv, separator)
          blob = new Blob([vcf], { type: "text/vcard" })
          break
        case "tsv":
          const tsv = convertToTsv(sourceCsv, separator)
          blob = new Blob([tsv], { type: "text/tab-separated-values" })
          break

        default:
          throw new Error("Invalid output format selected")
      }
      downloadBlob(blob, fileName)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("An error occurred during conversion.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetState = () => {
    setError("")
    setUploadedFile(null)
    setIsPasted(false)
    setInputMode("upload")
    setConversionType(null)
    setCsvInput("")
    setCsvOutput("")
    setWorkbook(null)
    setSheetNames([])
    setSelectedSheet("")
    setShowOptions(false)
  }

  const handleFileUpload = useCallback(async (file: File) => {
    resetState()
    setInputMode("upload")
    setUploadedFile(file)

    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const reader = new FileReader()

    if (["xlsx", "xls"].includes(fileExtension || "")) {
      setConversionType("xlsx-to-csv")
      setOutputFormat("csv")
      reader.onload = async (event) => {
        try {
          const data = event.target?.result
          const wb = new ExcelJS.Workbook()
          await wb.xlsx.load(data as ArrayBuffer)
          setWorkbook(wb)
          const names = wb.worksheets.map((ws) => ws.name)
          setSheetNames(names)
          if (names.length > 0) {
            setSelectedSheet(names[0])
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to read XLSX file.")
        }
      }
      reader.readAsArrayBuffer(file)
    } else if (["csv", "txt"].includes(fileExtension || "")) {
      setConversionType("csv-to-xlsx")
      reader.onload = (event) => {
        const text = event.target?.result as string
        setCsvInput(text)
      }
      reader.readAsText(file)
    } else {
      setError("Unsupported file type. Please upload a .csv, .txt, .xlsx, or .xls file.")
      setUploadedFile(null)
    }
  }, [])

  const handlePaste = (pastedText: string) => {
    resetState()
    setInputMode("paste")
    setIsPasted(true)
    setCsvInput(pastedText)
    setConversionType("csv-to-xlsx")
  }

  useEffect(() => {
    if (conversionType === "xlsx-to-csv" && workbook && selectedSheet) {
      try {
        const effectiveSeparator = xlsxToCsvSeparator === "custom" ? xlsxToCsvCustomSeparator : xlsxToCsvSeparator
        if (xlsxToCsvSeparator === "custom" && !effectiveSeparator) {
          setCsvOutput("")
          return
        }
        const worksheet = workbook.getWorksheet(selectedSheet)
        if (!worksheet) {
          setError(`Sheet "${selectedSheet}" could not be found.`)
          setCsvOutput("")
          return
        }
        const csv = convertSheetToCsv(worksheet, {
          separator: effectiveSeparator,
          includeHeaders,
          quoteFields,
          replaceLineBreaks,
          lineBreakReplacement,
        })
        setCsvOutput(csv)
        setError("")
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred during conversion."
        setError(message)
        setCsvOutput("")
      }
    } else if (conversionType === "csv-to-xlsx") {
      const name = isPasted ? "PastedData" : uploadedFile?.name.split(".").slice(0, -1).join(".")
      setSheetName(name || "Sheet1")
    }
  }, [
    workbook,
    selectedSheet,
    xlsxToCsvSeparator,
    xlsxToCsvCustomSeparator,
    includeHeaders,
    quoteFields,
    replaceLineBreaks,
    lineBreakReplacement,
    conversionType,
    uploadedFile,
  ])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.currentTarget.classList.remove("border-blue-500")
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        handleFileUpload(event.dataTransfer.files[0])
      }
    },
    [handleFileUpload],
  )

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.add("border-blue-500")
  }

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.remove("border-blue-500")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <ToolContainer title="Data Converter" details={details} toolId={toolId}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          

          {!(uploadedFile || isPasted) ? (
            // STATE 1: INPUT SELECTION
            <div className="space-y-8">
              {/* Input Mode Tabs */}
              <div className="flex gap-2 justify-center border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setInputMode("upload")}
                  className={`px-6 py-3 font-medium transition-all ${inputMode === "upload" ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setInputMode("paste")}
                  className={`px-6 py-3 font-medium transition-all ${inputMode === "paste" ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                >
                  Paste Data
                </button>
              </div>

              {/* Upload Area */}
              {inputMode === "upload" ? (
                <div
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all duration-300"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <UploadCloud className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Drag & drop your file here
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">or click to browse from your computer</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Supported formats: CSV, TXT, XLSX, XLS</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv, .txt, .xlsx, .xls"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    placeholder="Paste your CSV or data here..."
                    className="w-full h-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-slate-100 font-mono text-sm resize-y"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handlePaste(csvInput)}
                      disabled={!csvInput.trim()}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            // STATE 2: CONVERSION & DOWNLOAD
            <div className="space-y-8">
              {/* File Info */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
                    <File className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Input</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs">
                      {isPasted ? "Pasted Data" : uploadedFile?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetState}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              </div>

              {/* Output Format Selection */}
              {(conversionType === "csv-to-xlsx" || conversionType === "xlsx-to-csv") && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                    Select Output Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {outputFormats
                      .filter((format) => (conversionType === "xlsx-to-csv" ? format.value !== "xlsx" : true))
                      .map((format) => (
                        <button
                          key={format.value}
                          onClick={() => setOutputFormat(format.value)}
                          className={`p-4 rounded-xl transition-all duration-300 group ${
                            outputFormat === format.value
                              ? `bg-gradient-to-br ${format.color} text-white shadow-lg scale-105`
                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <div
                            className={`flex flex-col items-center gap-2 ${outputFormat === format.value ? "text-white" : ""}`}
                          >
                            <div
                              className={
                                outputFormat === format.value ? "text-white" : "text-slate-600 dark:text-slate-400"
                              }
                            >
                              {format.icon}
                            </div>
                            <span className="text-xs font-semibold text-center leading-tight">{format.label}</span>
                            <span className="text-xs opacity-75">{format.description}</span>
                          </div>
                          {outputFormat === format.value && (
                            <div className="absolute inset-0 rounded-xl pointer-events-none">
                              <CheckCircle2 className="h-5 w-5 absolute top-1 right-1 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Options Toggle */}
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <Settings size={16} />
                <span>{showOptions ? "Hide" : "Show"} Advanced Options</span>
              </button>

              {/* Advanced Options */}
              {showOptions && (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-6">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Conversion Settings</h3>

                  {conversionType === "csv-to-xlsx" && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Separator
                        </label>
                        <select
                          value={csvToXlsxSeparator}
                          onChange={(e) => setCsvToXlsxSeparator(e.target.value)}
                          className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                        >
                          <option value=",">Comma (,)</option>
                          <option value=";">Semicolon (;)</option>
                          <option value="\t">Tab</option>
                          <option value="|">Pipe (|)</option>
                          <option value="custom">Custom</option>
                        </select>
                        {csvToXlsxSeparator === "custom" && (
                          <input
                            type="text"
                            value={csvToXlsxCustomSeparator}
                            onChange={(e) => setCsvToXlsxCustomSeparator(e.target.value)}
                            className="mt-2 w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Custom separator"
                          />
                        )}
                      </div>

                      {outputFormat === "xlsx" && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Sheet Name
                          </label>
                          <input
                            type="text"
                            value={sheetName}
                            onChange={(e) => setSheetName(e.target.value)}
                            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Sheet1"
                          />
                        </div>
                      )}

                      {outputFormat === "sql" && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Table Name
                          </label>
                          <input
                            type="text"
                            value={sqlTableName}
                            onChange={(e) => setSqlTableName(e.target.value)}
                            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., my_table"
                          />
                        </div>
                      )}

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasHeaders}
                          onChange={(e) => setHasHeaders(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          First row contains headers
                        </span>
                      </label>
                    </div>
                  )}

                  {conversionType === "xlsx-to-csv" && workbook && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Select Sheet
                        </label>
                        <select
                          value={selectedSheet}
                          onChange={(e) => setSelectedSheet(e.target.value)}
                          className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          {sheetNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Separator
                          </label>
                          <select
                            value={xlsxToCsvSeparator}
                            onChange={(e) => setXlsxToCsvSeparator(e.target.value)}
                            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value="\t">Tab</option>
                            <option value="|">Pipe (|)</option>
                            <option value="custom">Custom</option>
                          </select>
                          {xlsxToCsvSeparator === "custom" && (
                            <input
                              type="text"
                              value={xlsxToCsvCustomSeparator}
                              onChange={(e) => setXlsxToCsvCustomSeparator(e.target.value)}
                              className="mt-2 w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="Custom"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Quote Fields
                          </label>
                          <select
                            value={quoteFields}
                            onChange={(e) => setQuoteFields(e.target.value as QuoteFields)}
                            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="smart">Smart (Recommended)</option>
                            <option value="always">Always</option>
                            <option value="never">Never</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeHeaders}
                          onChange={(e) => setIncludeHeaders(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Include Headers</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={replaceLineBreaks}
                          onChange={(e) => setReplaceLineBreaks(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Replace Line Breaks
                        </span>
                      </label>

                      {replaceLineBreaks && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Replace With
                          </label>
                          <input
                            type="text"
                            value={lineBreakReplacement}
                            onChange={(e) => setLineBreakReplacement(e.target.value)}
                            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Space or character"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}



              {/* Error Alert */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Download Button */}
          {(uploadedFile || isPasted) && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleConvertAndDownload}
                disabled={isProcessing || (conversionType === "xlsx-to-csv" && !csvOutput)}
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>
                      Download {outputFormats.find((f) => f.value === outputFormat)?.label || "File"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolContainer>
  )
}

export default CsvXlsxConverter
