import { ToolDetails } from '@/types';

const PRIVACY_STATEMENT =
  "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";

export const TOOL_DETAILS: Record<string, ToolDetails> = {
  'json-to-typescript': {
    introduction: "Convert JSON to Typescript",
    howToUse: ["Paste JSON", "Copy TS"],
    features: ["Instantly generate TypeScript interfaces from JSON objects.", "Supports nested JSON objects and arrays.", "Copy generated TypeScript with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "This tool simplifies front-end and back-end development by automating the creation of TypeScript interfaces and types from raw JSON data. Instead of manually defining each property and its type, you can paste your JSON, and the tool will infer the structure and generate the corresponding TypeScript code, saving significant development time and reducing errors.",
    usageExamples: [
      "Generating type definitions for API responses in a web application.",
      "Creating interfaces for configuration files that use JSON format.",
      "Quickly prototyping data models for new features or projects.",
      "Learning how JSON structures map to TypeScript types."
    ],
    underlyingConcept: "The tool works by parsing the input JSON string into a JavaScript object. It then recursively traverses this object, inferring the data type of each key-value pair (e.g., string, number, boolean, array, object). For arrays, it analyzes the first element to determine the array's item type. Finally, it constructs the TypeScript `interface` or `type` definitions based on these inferred types.",
    faqs: [
      {
        "question": "What is JSON to TypeScript conversion?",
        "answer": "It is the process of converting a JSON object into a TypeScript interface, which provides type safety and autocompletion in your code."
      },
      {
        "question": "Why should I use a JSON to TypeScript converter?",
        "answer": "It saves you time and effort by automatically generating TypeScript interfaces from your JSON data, reducing the chances of manual errors."
      },
      {
        "question": "Is this tool free to use?",
        "answer": "Yes, this is a completely free online tool to convert your JSON data to TypeScript interfaces."
      }
    ],
  },
  'code-to-image': {
    introduction: "Create screenshots of code.",
    howToUse: ["Paste Code", "Select Theme", "Snapshot"],
    features: ["Create beautiful images of your code snippets.", "Supports multiple themes and languages.", "Customize background color and padding."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Code to Image tool transforms plain code snippets into visually appealing images. This is particularly useful for presentations, social media sharing, or documentation where you want to showcase code with attractive styling, syntax highlighting, and customizable backgrounds without it being editable.",
    usageExamples: [
      "Creating stunning code screenshots for a technical blog post or article.",
      "Generating images of code examples for a presentation slide deck.",
      "Sharing beautifully formatted code snippets on social media platforms like Twitter or LinkedIn.",
      "Embedding static code visuals in documentation where interactivity is not required."
    ],
    underlyingConcept: "This tool leverages client-side rendering to interpret the code input. It applies syntax highlighting using a library (like Prism.js or Highlight.js) and then uses HTML5 Canvas or SVG to render the styled text onto an image. The user's styling choices (theme, background, padding) are applied during this rendering process, and the final image is generated for download without server interaction.",
    faqs: [
      {
        "question": "How can I create an image from my code?",
        "answer": "You can use this tool to paste your code, select a theme, and then take a snapshot to create a beautiful image of your code."
      },
      {
        "question": "Can I customize the appearance of the code image?",
        "answer": "Yes, you can choose from multiple themes, and customize the background color and padding to match your style."
      },
      {
        "question": "Is my code secure?",
        "answer": "Yes, all the processing is done in your browser. Your code is not sent to any server."
      }
    ],
  },
  'sql-formatter': {
    introduction: "Format SQL queries.",
    howToUse: ["Paste SQL", "Click Format"],
    features: ["Format and beautify your SQL queries.", "Supports various SQL dialects.", "Copy formatted SQL with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The SQL Formatter tool takes unformatted or poorly formatted SQL queries and restructures them into a clean, readable, and consistent style. This process involves proper indentation, line breaks, and consistent capitalization of keywords, making complex SQL statements much easier to understand, debug, and maintain.",
    usageExamples: [
      "Beautifying a long, single-line SQL query received from a colleague.",
      "Standardizing the format of SQL scripts across a development team.",
      "Debugging complex stored procedures or database migrations by making the code legible.",
      "Preparing SQL code for presentations or documentation to ensure clarity."
    ],
    underlyingConcept: "SQL formatting is typically achieved by parsing the SQL query into an Abstract Syntax Tree (AST) or tokenizing it into individual keywords, operators, and identifiers. The formatter then traverses this structure, applying a predefined set of rules (e.g., indent `SELECT` clauses, new line after `FROM`, uppercase keywords) to reconstruct the query in a standardized, human-readable format.",
    faqs: [
      {
        "question": "What is an SQL formatter?",
        "answer": "An SQL formatter is a tool that automatically formats your SQL queries to make them more readable and consistent with standard SQL formatting rules."
      },
      {
        "question": "Does this tool support different SQL dialects?",
        "answer": "Yes, this tool supports various SQL dialects, so you can format your queries correctly for your specific database."
      },
      {
        "question": "Is it easy to use?",
        "answer": "Yes, you just need to paste your SQL query and click the format button to get the beautifully formatted query."
      }
    ],
  },
  'cron-generator': {
    introduction: "Build Cron expressions visually.",
    howToUse: ["Select intervals", "Copy string"],
    features: ["Visually build and explain cron job schedules.", "Supports all cron expression fields.", "Generates human-readable descriptions of cron jobs."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Cron Expression Generator simplifies the creation and understanding of cron job schedules. Cron expressions are strings used by Unix-like operating systems to schedule tasks, but their syntax can be complex. This tool provides a user-friendly interface to visually construct these expressions and translates them into human-readable descriptions, preventing errors and ensuring tasks run as intended.",
    usageExamples: [
      "Scheduling a daily backup script to run at 2:00 AM.",
      "Setting up a weekly report generation every Monday at 9:00 AM.",
      "Configuring a server to clear temporary files on the first day of every month.",
      "Understanding an existing cron expression to debug a scheduled task issue."
    ],
    underlyingConcept: "A cron expression consists of five or six fields representing minute, hour, day of month, month, day of week, and an optional year. Each field can contain numbers, ranges, lists, and wildcards (`*`) to specify execution times. The tool's visual interface maps user selections to these fields, and its explanation logic parses the resulting string back into natural language by analyzing each field's value.",
    faqs: [
      {
        "question": "What is a cron expression?",
        "answer": "A cron expression is a string of characters that defines a schedule for a cron job, which is a time-based job scheduler in Unix-like computer operating systems."
      },
      {
        "question": "How can I generate a cron expression?",
        "answer": "You can use this tool to visually build a cron expression by selecting the desired intervals for minutes, hours, days, months, and days of the week."
      },
      {
        "question": "Does this tool explain the cron expression?",
        "answer": "Yes, it generates a human-readable description of the cron job schedule, so you can easily understand what the expression means."
      }
    ],
  },
  'slug-generator': {
    introduction: "Create URL slugs.",
    howToUse: ["Type title", "Copy slug"],
    features: ["Convert text into SEO-friendly URL slugs.", "Removes special characters and spaces.", "Supports multiple languages."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Slug Generator is a utility that transforms ordinary text, such as a blog post title or product name, into a clean, URL-friendly string known as a \"slug.\" This process typically involves converting text to lowercase, replacing spaces with hyphens, and removing special characters, resulting in a format optimized for search engines and readability in web addresses.",
    usageExamples: [
      "Creating SEO-friendly URLs for blog posts or articles from their titles.",
      "Generating unique identifiers for product pages on an e-commerce website.",
      "Normalizing user-generated content titles into web-safe formats.",
      "Preparing human-readable file names from complex string inputs."
    ],
    underlyingConcept: "A slug is a web-friendly version of a title that appears in a URL. The generation process involves several steps: transliteration (converting non-ASCII characters to their closest ASCII equivalents), lowercasing the entire string, replacing all whitespace with a separator (usually a hyphen), and removing any characters that are not alphanumeric or the chosen separator. This ensures the resulting string is valid for use in URLs and is easily understood by both humans and search engine crawlers.",
    faqs: [
      {
        "question": "What is a URL slug?",
        "answer": "A URL slug is the part of a URL that identifies a particular page on a website in an easy-to-read form. It's usually a kebab-cased version of the page title."
      },
      {
        "question": "Why are SEO-friendly slugs important?",
        "answer": "SEO-friendly slugs are important because they can improve your website's search engine rankings by including relevant keywords and being easy for users to understand."
      },
      {
        "question": "How does this slug generator work?",
        "answer": "This tool converts your text into a URL-friendly slug by removing special characters, converting spaces to hyphens, and making the text lowercase."
      }
    ],
  },
  'meta-tag-generator': {
    introduction: "Create HTML meta tags.",
    howToUse: ["Enter details", "Copy HTML"],
    features: ["Generate SEO meta tags for your website.", "Includes title, description, and keywords.", "Generates tags for social media platforms."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Meta Tag Generator helps website owners and SEO professionals create essential HTML meta tags that provide search engines and social media platforms with crucial information about a webpage's content. These tags, while not visible on the page itself, are vital for improving search engine rankings, controlling how content appears when shared, and enhancing overall online visibility.",
    usageExamples: [
      "Crafting compelling title tags and meta descriptions to improve click-through rates from search results.",
      "Generating Open Graph tags for Facebook and Twitter Cards to control how links are previewed on social media.",
      "Setting `robots` meta tags to instruct search engine crawlers on how to index (or not index) a page.",
      "Quickly creating a set of standard meta tags for new web pages."
    ],
    underlyingConcept: "Meta tags are snippets of text that live in the `<head>` section of an HTML document. They serve as metadata – data about data – providing structured information that browsers, search engines, and social media platforms can understand. Different types of meta tags (e.g., `<title>`, `<meta name=\"description\">`, `<meta property=\"og:title\">`) adhere to specific standards (like HTML5 and Open Graph Protocol) to convey different aspects of a page's identity and content.",
    faqs: [
      {
        "question": "What are meta tags?",
        "answer": "Meta tags are snippets of text that describe a page's content; they don't appear on the page itself, but only in the page's code. They are important for SEO."
      },
      {
        "question": "Which meta tags are important for SEO?",
        "answer": "The most important meta tags for SEO are the title tag, meta description, and meta keywords. This tool helps you generate all of them."
      },
      {
        "question": "Does this tool generate social media meta tags?",
        "answer": "Yes, it generates Open Graph meta tags for social media platforms like Facebook and Twitter."
      }
    ],
  },
  'contrast-checker': {
    introduction: "Check color contrast.",
    howToUse: ["Select colors", "See rating"],
    features: ["Check color contrast accessibility (WCAG).", "Supports AA and AAA levels.", "Provides a color picker to select colors."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Contrast Checker tool evaluates the legibility of text against its background color, ensuring accessibility for users with visual impairments. It provides instant feedback on whether your color combinations meet the Web Content Accessibility Guidelines (WCAG) standards, specifically AA and AAA levels, which are crucial for inclusive web design.",
    usageExamples: [
      "Verifying color schemes for website text and backgrounds to ensure WCAG compliance.",
      "Designing accessible buttons or interactive elements where text needs to stand out.",
      "Auditing existing designs to identify and fix poor contrast issues.",
      "Selecting accessible color palettes for branding and user interfaces."
    ],
    underlyingConcept: "Color contrast is a measure of the difference in luminance (light intensity) or color between two adjacent colors. WCAG defines specific mathematical formulas and thresholds for minimum contrast ratios to ensure content is readable by a wide range of users, including those with color blindness or low vision. This tool applies these formulas to the input colors to calculate and report the contrast ratio.",
    faqs: [
      {
        "question": "What is color contrast?",
        "answer": "Color contrast is the difference in light between the foreground and background colors. It is important for accessibility, as it affects how people with visual impairments can read the text on your website."
      },
      {
        "question": "What are WCAG AA and AAA levels?",
        "answer": "WCAG (Web Content Accessibility Guidelines) defines two levels of contrast compliance: AA (minimum) and AAA (enhanced). This tool helps you check your color combinations against both levels."
      },
      {
        "question": "How do I use this tool?",
        "answer": "Simply select the foreground and background colors using the color pickers, and the tool will show you the contrast ratio and whether it passes the WCAG AA and AAA levels."
      }
    ],
  },
  'chmod-calculator': {
    introduction: "Calculate Linux permissions.",
    howToUse: ["Check boxes", "Copy code"],
    features: ["Visual calculator for Unix file permissions.", "Supports read, write, and execute permissions.", "Generates octal and symbolic notations."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Chmod Calculator provides a user-friendly interface to easily determine and understand Unix-like file permissions. Instead of memorizing octal codes or symbolic representations, you can visually select read, write, and execute permissions for the owner, group, and others. The tool then instantly generates both the octal and symbolic notations, simplifying file permission management.",
    usageExamples: [
      "Setting appropriate permissions for shell scripts (`755` for execute, read, write for owner, read/execute for group/others).",
      "Restricting access to sensitive configuration files (`600` for read/write only for owner).",
      "Understanding the permissions of a shared directory or file on a Linux server.",
      "Quickly generating the `chmod` command needed to apply specific permissions."
    ],
    underlyingConcept: "Unix-like file permissions control who can read, write, or execute a file or directory. These permissions are assigned to three entities: the file owner, the group the file belongs to, and others (everyone else). Each permission (read, write, execute) has a numerical value (4, 2, 1 respectively). The octal representation is a sum of these values for each entity, while the symbolic representation uses letters (r, w, x) and hyphens.",
    faqs: [
      {
        "question": "What is chmod?",
        "answer": "chmod is a command in Unix and Unix-like operating systems that is used to change the access permissions of file system objects (files and directories)."
      },
      {
        "question": "What are octal and symbolic notations?",
        "answer": "Octal notation uses numbers to represent permissions (e.g., 755), while symbolic notation uses letters (e.g., rwxr-xr-x). This tool generates both."
      },
      {
        "question": "How do I use this calculator?",
        "answer": "Simply check the boxes for the read, write, and execute permissions for the owner, group, and others, and the tool will generate the corresponding chmod command."
      }
    ],
  },
  'utm-builder': {
    introduction: "Create tracking links.",
    howToUse: ["Enter URL", "Add params", "Copy"],
    features: ["Build tracking URLs for marketing campaigns.", "Supports all UTM parameters.", "Generates short URLs with Bitly."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The UTM Builder helps marketers and analysts create custom URLs with UTM (Urchin Tracking Module) parameters. These parameters are small pieces of code added to a URL that enable web analytics tools, like Google Analytics, to track the source, medium, campaign, and content of traffic to your website. This provides valuable insights into the effectiveness of your marketing efforts.",
    usageExamples: [
      "Tracking the performance of a specific email marketing campaign.",
      "Analyzing which social media platforms drive the most conversions.",
      "Differentiating traffic from various ad creatives within the same campaign.",
      "Measuring the success of affiliate links or sponsored content."
    ],
    underlyingConcept: "UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) are standardized tags appended to a URL as query string parameters. When a user clicks a URL with these tags, the analytics software on the destination website records the values, allowing you to segment and analyze your traffic data to understand visitor behavior and campaign ROI.",
    faqs: [
      {
        "question": "What are UTM parameters?",
        "answer": "UTM parameters are tags that you add to a URL. When someone clicks on the URL, the tags are sent back to your Google Analytics for tracking."
      },
      {
        "question": "Which UTM parameters are supported?",
        "answer": "This tool supports all standard UTM parameters: utm_source, utm_medium, utm_campaign, utm_term, and utm_content."
      },
      {
        "question": "Can I shorten the generated URL?",
        "answer": "Yes, this tool can generate short URLs using the Bitly service."
      }
    ],
  },
  'aspect-ratio-calculator': {
    introduction: "Calculate aspect ratios.",
    howToUse: ["Enter dims", "See ratio"],
    features: ["Calculate dimensions and aspect ratios for images and video.", "Supports common aspect ratios.", "Calculates new dimensions based on a given aspect ratio."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Aspect Ratio Calculator is a tool designed to help users accurately calculate and maintain the proportional relationship between an image's or video's width and height. This is crucial for ensuring that media content appears correctly scaled across different screens and platforms, preventing distortion and maintaining visual integrity.",
    usageExamples: [
      "Determining new dimensions for an image while preserving its original aspect ratio for web design.",
      "Calculating the correct video resolution for platforms like YouTube or social media stories.",
      "Cropping images or videos to a specific aspect ratio without distorting the content.",
      "Understanding the aspect ratio of a given screen or display."
    ],
    underlyingConcept: "An aspect ratio is a ratio of an image's width to its height. It is commonly expressed as two numbers separated by a colon, such as 16:9 or 4:3. The calculator works by taking two known values (e.g., original width and height, or one new dimension and the aspect ratio) and applying simple proportional mathematics to solve for the unknown dimension, thereby maintaining the desired ratio.",
    faqs: [
      {
        "question": "What is aspect ratio?",
        "answer": "The aspect ratio of an image is the ratio of its width to its height. It is commonly expressed as two numbers separated by a colon, as in 16:9."
      },
      {
        "question": "How can I calculate the aspect ratio?",
        "answer": "You can use this tool to calculate the aspect ratio by entering the width and height of the image or video."
      },
      {
        "question": "Can I calculate new dimensions with a given aspect ratio?",
        "answer": "Yes, you can enter a known aspect ratio and one dimension (width or height) to calculate the other dimension."
      }
    ],
  },
  'css-triangle-generator': {
    introduction: "Create CSS triangles.",
    howToUse: ["Set direction/color", "Copy CSS"],
    features: ["Generate CSS code for geometric triangles.", "Customize triangle size and color.", "Supports all four directions."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The CSS Triangle Generator simplifies the creation of geometric triangle shapes using pure CSS. By manipulating borders of an HTML element, developers can create various triangle orientations and sizes without the need for image assets. This tool provides a visual interface to define the triangle's direction, size, and color, and then outputs the exact CSS code for easy integration into web projects.",
    usageExamples: [
      "Creating dropdown menu arrows or tooltips with directional pointers.",
      "Designing speech bubbles or chat message indicators in user interfaces.",
      "Building decorative elements or abstract shapes in web layouts.",
      "Adding subtle design accents to buttons or navigation items."
    ],
    underlyingConcept: "CSS triangles are a clever trick exploiting the way borders render in block-level elements. When an element has zero width and height, its borders meet at a point. By making three of the four borders transparent and giving the remaining border a color, a triangle pointing in the direction of the colored border is formed. Adjusting the width of the transparent borders and the colored border allows for control over the triangle's size and shape.",
    faqs: [
      {
        "question": "How are CSS triangles created?",
        "answer": "CSS triangles are created using the border property of an element. By setting the width and height to zero and making one border colored and the others transparent, you can create a triangle."
      },
      {
        "question": "Can I customize the triangle?",
        "answer": "Yes, you can customize the size, color, and direction of the triangle using this tool."
      },
      {
        "question": "Is the generated CSS code cross-browser compatible?",
        "answer": "Yes, the generated CSS code for triangles is compatible with all modern browsers."
      }
    ],
  },
  'xml-formatter': {
    introduction: "Format XML.",
    howToUse: ["Paste XML", "Copy formatted"],
    features: ["Beautify and format XML strings.", "Supports indentation levels.", "Validates XML syntax."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The XML Formatter is a specialized tool designed to take unformatted or irregularly structured XML code and transform it into a clean, well-indented, and human-readable format. This process significantly improves the clarity of complex XML documents, making them easier for developers, data analysts, and content managers to read, debug, and work with.",
    usageExamples: [
      "Beautifying minified XML responses from APIs for easier debugging.",
      "Standardizing the indentation and structure of XML configuration files.",
      "Improving the readability of XML data extracts for analysis or reporting.",
      "Preparing XML code snippets for documentation or presentations."
    ],
    underlyingConcept: "XML (Extensible Markup Language) uses a tree-like structure of elements and attributes to organize data. When XML is not properly formatted (e.g., all on one line), its hierarchical nature becomes difficult to discern. An XML formatter parses the document, identifies its elements, attributes, and text nodes, and then reconstructs the document by applying consistent indentation and line breaks, revealing its logical structure.",
    faqs: [
      {
        "question": "What is XML?",
        "answer": "XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable."
      },
      {
        "question": "Why should I format my XML?",
        "answer": "Formatting your XML makes it easier to read and understand, which is especially helpful when you are working with large and complex XML files."
      },
      {
        "question": "Does this tool validate my XML?",
        "answer": "Yes, this tool also validates your XML syntax and will show you an error if it is not well-formed."
      }
    ],
  },
  'morse-converter': {
    introduction: "Text to Morse conversion.",
    howToUse: ["Type text", "See dots/dashes"],
    features: ["Translate text to Morse code and vice versa.", "Supports letters, numbers, and punctuation.", "Listen to the Morse code sound."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Morse Code Converter provides a seamless way to translate text into Morse code and decode Morse code back into readable text. This tool serves both as a practical utility for communication and an educational resource for learning the historic telegraphic code. It supports standard characters, numbers, and common punctuation, offering both visual representation and an optional audio output of the Morse signals.",
    usageExamples: [
      "Learning and practicing Morse code by seeing instant translations.",
      "Sending coded messages to friends for fun or puzzles.",
      "Transcribing historical telegraphs or signals.",
      "Exploring an alternative method of communication."
    ],
    underlyingConcept: "Morse code assigns a series of dots (short signals) and dashes (long signals) to each letter of the Latin alphabet, numbers, and some punctuation marks. The converter operates by mapping input characters to their corresponding Morse sequences (for encoding) or by recognizing patterns of dots and dashes and mapping them back to characters (for decoding). The timing between dots, dashes, and the spaces between them is crucial for accurate interpretation.",
    faqs: [
      {
        "question": "What is Morse code?",
        "answer": "Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks that can be directly understood by a skilled listener or observer without special equipment."
      },
      {
        "question": "Can I translate from Morse code to text?",
        "answer": "Yes, this tool can translate both from text to Morse code and from Morse code to text."
      },
      {
        "question": "Can I listen to the Morse code?",
        "answer": "Yes, you can listen to the sound of the Morse code for the text you have entered."
      }
    ],
  },
  'binary-converter': {
    introduction: "Convert text to 0s and 1s.",
    howToUse: ["Type text", "Get binary"],
    features: ["Translate text to binary code and back.", "Supports UTF-8 characters.", "Copy binary code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Binary Converter facilitates the translation of human-readable text into its binary representation and vice-versa. Binary code, composed solely of 0s and 1s, is the fundamental language of computers. This tool allows users to see how text is encoded at a machine level, which can be useful for educational purposes, low-level debugging, or simply understanding data representation.",
    usageExamples: [
      "Exploring how characters are represented in digital systems.",
      "Debugging data corruption issues by examining the underlying binary.",
      "Creating a unique, machine-level representation of short messages.",
      "Understanding the basics of computer data storage and transmission."
    ],
    underlyingConcept: "At its core, the tool performs character encoding. Each character in the input text is typically converted into its numerical Unicode (or ASCII) value, and then this numerical value is translated into its binary equivalent. For decoding, the process is reversed: binary strings are grouped, converted back to their numerical values, and then mapped to their corresponding characters based on the chosen encoding standard (e.g., UTF-8).",
    faqs: [
      {
        "question": "What is binary code?",
        "answer": "Binary code is a system of representing text or computer processor instructions by the use of two-symbol system: '0' and '1'."
      },
      {
        "question": "How does this tool convert text to binary?",
        "answer": "This tool converts each character of the text into its corresponding 8-bit binary representation based on the UTF-8 encoding."
      },
      {
        "question": "Can I convert binary back to text?",
        "answer": "Yes, you can paste the binary code into the input field and the tool will convert it back to text."
      }
    ],
  },
  'password-strength': {
    introduction: "Check password strength.",
    howToUse: ["Type password", "See score"],
    features: ["Test the strength of your passwords.", "Provides feedback on password complexity.", "Estimates time to crack the password."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Password Strength Checker analyzes a given password and provides an immediate assessment of its security. It evaluates factors like length, character diversity (uppercase, lowercase, numbers, symbols), and common patterns or dictionary words to help users create robust passwords that are resistant to guessing and brute-force attacks. The tool often offers suggestions for improvement and may estimate the time it would take to crack the password.",
    usageExamples: [
      "Testing the strength of a new password before using it for an online account.",
      "Educating users on best practices for creating secure and memorable passwords.",
      "Auditing a set of existing passwords for potential vulnerabilities.",
      "As a component in user registration forms to enforce strong password policies."
    ],
    underlyingConcept: "Password strength algorithms typically work by assigning points or a score based on various criteria. Points are added for length, inclusion of different character types, and randomness, while points are deducted for common patterns, repeated characters, or dictionary words. Advanced algorithms might use entropy calculations (measuring randomness) and compare the password against databases of compromised or common passwords to provide a more accurate strength assessment.",
    faqs: [
      {
        "question": "What makes a password strong?",
        "answer": "A strong password is long, complex (containing a mix of uppercase and lowercase letters, numbers, and symbols), and unpredictable."
      },
      {
        "question": "How does this tool measure password strength?",
        "answer": "This tool measures password strength based on several factors, including length, character variety, and common patterns. It then provides a score and an estimated time to crack the password."
      },
      {
        "question": "Is my password safe with this tool?",
        "answer": "Yes, your password is not sent to any server. All calculations are done in your browser, so your password remains private."
      }
    ],
  },
  'string-escaper': {
    introduction: "Escape special characters.",
    howToUse: ["Paste text", "Select format"],
    features: ["Escape strings for JSON, HTML, URL, and Java.", "Supports multiple escaping formats.", "Copy escaped string with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The String Escaper tool converts special characters within a string into their appropriate \"escaped\" representations for various programming and markup contexts like JSON, HTML, URLs, and Java. This is crucial for preventing syntax errors, data corruption, and security vulnerabilities (such as cross-site scripting in HTML or SQL injection) when embedding raw string data into a different format or language.",
    usageExamples: [
      "Sanitizing user-generated input before inserting it into an HTML page to prevent XSS attacks.",
      "Preparing a string that contains special characters (like quotes or backslashes) to be a valid JSON value.",
      "Encoding parts of a URL to ensure all characters are properly transmitted and interpreted by web servers.",
      "Handling literal strings in Java code that might otherwise conflict with syntax (e.g., file paths with backslashes)."
    ],
    underlyingConcept: "Escaping is a mechanism used to represent characters that have a special meaning in a particular context as literal data. For example, a double quote `\"` has a special meaning in JSON (denoting the start/end of a string). To include a literal double quote within a JSON string, it must be \"escaped\" as `\\\"`. The specific escaping rules and characters vary between different contexts (e.g., HTML uses `&lt;` for `<`, URLs use `%20` for space). The tool applies these context-specific rules to transform the input string.",
    faqs: [
      {
        "question": "What is string escaping?",
        "answer": "String escaping is the process of converting special characters in a string to a representation that will not be misinterpreted by a computer program or data format."
      },
      {
        "question": "Why do I need to escape strings?",
        "answer": "You need to escape strings to prevent errors and security vulnerabilities when you are embedding them in another context, such as a JSON object, an HTML document, or a URL."
      },
      {
        "question": "Which escaping formats does this tool support?",
        "answer": "This tool supports escaping for JSON, HTML, URL, and Java."
      }
    ],
  },
  'percentage-calculator': {
    introduction: "Calculate percentages.",
    howToUse: ["Enter numbers", "Get result"],
    features: ["Quickly calculate percentages for common math problems.", "Supports various percentage calculations.", "Easy to use interface."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Percentage Calculator is a versatile online tool designed to simplify a variety of percentage-related computations. Whether you need to find a percentage of a number, determine what percentage one number is of another, or calculate percentage increases and decreases, this tool provides instant and accurate results, eliminating manual calculations.",
    usageExamples: [
      "Calculating discounts on sale items while shopping.",
      "Determining tips at a restaurant or service charge percentages.",
      "Finding the percentage change in sales figures month-over-month.",
      "Calculating interest on loans or investments."
    ],
    underlyingConcept: "Percentages are a way of expressing a number as a fraction of 100. The core concept revolves around the formula `Part = (Percentage / 100) * Whole`. This tool applies this fundamental relationship and its algebraic rearrangements to solve for the unknown variable, allowing for quick computation across different percentage problems.",
    faqs: [
      {
        "question": "How do I calculate a percentage?",
        "answer": "To calculate a percentage, you can use the formula: (part / whole) * 100. This tool makes it easy by providing fields for different percentage calculations."
      },
      {
        "question": "What kind of percentage calculations can I do?",
        "answer": "You can calculate what is X% of Y, X is what percent of Y, and the percentage increase or decrease from one number to another."
      },
      {
        "question": "Is this calculator free to use?",
        "answer": "Yes, this is a completely free online tool for all your percentage calculation needs."
      }
    ],
  },
  'markdown-table-generator': {
    introduction: "Generate MD tables.",
    howToUse: ["Set rows/cols", "Fill data", "Copy"],
    features: ["Create Markdown tables easily with a visual editor.", "Add and remove rows and columns.", "Copy Markdown table with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Markdown Table Generator provides an intuitive visual interface to create tables for Markdown documents. Markdown's syntax for tables can be cumbersome to write manually, especially for complex structures. This tool simplifies the process by allowing users to define rows and columns, input data, and then automatically generates the correctly formatted Markdown table code, saving time and reducing syntax errors.",
    usageExamples: [
      "Quickly creating data tables for GitHub README files or project documentation.",
      "Preparing tabular data for blog posts written in Markdown.",
      "Converting spreadsheet-like information into a version-controllable text format.",
      "Learning and experimenting with Markdown table syntax."
    ],
    underlyingConcept: "Markdown tables rely on pipe (`|`) characters to delineate columns and hyphens (`-`) to separate the header row from the data rows. Alignment (left, right, center) is indicated by colons within the header separator line. The generator dynamically constructs this character-based structure based on the user's visual input, ensuring proper alignment and syntax required for rendering by Markdown parsers.",
    faqs: [
      {
        "question": "What is Markdown?",
        "answer": "Markdown is a lightweight markup language with plain-text-formatting syntax. It is designed so that it can be converted to HTML and many other formats."
      },
      {
        "question": "How do I create a table in Markdown?",
        "answer": "You can create a table in Markdown by using pipes (|) to separate columns and hyphens (-) to create the header. This tool provides a visual editor to make it even easier."
      },
      {
        "question": "Can I add or remove rows and columns?",
        "answer": "Yes, you can easily add and remove rows and columns in the visual editor, and the Markdown code will be updated automatically."
      }
    ],
  },
  'list-randomizer': {
    introduction: "Randomize lists.",
    howToUse: ["Paste list", "Shuffle"],
    features: ["Shuffle and randomize a list of items.", "Supports multi-line lists.", "Copy randomized list with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The List Randomizer is a straightforward utility designed to shuffle and reorder any given list of items. Whether you need to randomize names, ideas, or selections for a lottery, this tool provides a quick and unbiased way to generate a new, random sequence from your input, making decisions fair or simply adding an element of chance.",
    usageExamples: [
      "Randomly selecting a winner from a list of participants for a giveaway.",
      "Shuffling a playlist or a sequence of tasks for variety.",
      "Generating random team assignments for sports or group projects.",
      "Aiding in decision-making when an unbiased order is required."
    ],
    underlyingConcept: "At its core, the List Randomizer employs a shuffling algorithm to rearrange the elements of the input list. A common and effective algorithm for this purpose is the Fisher-Yates shuffle (or Knuth shuffle), which ensures that every possible permutation of the list is equally likely. This method guarantees a truly random reordering of the items, providing fairness and unpredictability.",
    faqs: [
      {
        "question": "How does the list randomizer work?",
        "answer": "This tool uses a shuffling algorithm to randomize the order of the items in your list. Each time you click the shuffle button, you will get a new random order."
      },
      {
        "question": "Can I randomize a list with multiple lines?",
        "answer": "Yes, you can paste a list with multiple lines, and each line will be treated as a separate item to be randomized."
      },
      {
        "question": "Is the randomization truly random?",
        "answer": "The randomization is based on the Fisher-Yates shuffle algorithm, which is a widely used and effective method for generating a random permutation of a finite sequence."
      }
    ],
  },
  'text-cleaner': {
    introduction: "Clean up text.",
    howToUse: ["Paste text", "Click clean"],
    features: ["Remove extra spaces, line breaks, and format text.", "Supports multiple cleaning options.", "Copy cleaned text with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Text Cleaner is a utility designed to quickly tidy up raw text by removing unwanted characters, excessive whitespace, and inconsistent formatting. It's particularly useful for processing text copied from various sources (websites, documents, PDFs) which often come with extraneous line breaks, multiple spaces, or non-standard characters, making the text clean and consistent for further use.",
    usageExamples: [
      "Cleaning text copied from web pages before pasting into a document or email.",
      "Removing extra line breaks from raw data dumps or logs.",
      "Standardizing whitespace and formatting in user-generated content for a consistent look.",
      "Preparing text for analysis where uniform formatting is crucial."
    ],
    underlyingConcept: "Text cleaning typically involves applying regular expressions or string manipulation functions to identify and replace specific patterns. For instance, multiple spaces can be replaced with a single space, various line break characters (`\\n`, `\\r\\n`) can be standardized or removed, and non-printable characters can be stripped. The tool systematically processes the input string based on a set of defined cleaning rules to produce a refined output.",
    faqs: [
      {
        "question": "What does the text cleaner do?",
        "answer": "The text cleaner removes unnecessary characters from your text, such as extra spaces, line breaks, and tabs, to make it clean and easy to read."
      },
      {
        "question": "What cleaning options are available?",
        "answer": "You can choose to remove extra spaces, remove all line breaks, or convert multiple spaces to a single space."
      },
      {
        "question": "Is this tool safe to use with sensitive text?",
        "answer": "Yes, all the text cleaning is done in your browser. Your text is not sent to any server, so it remains private."
      }
    ],
  },
  'svg-to-data-uri': {
    introduction: "Convert SVG to URI.",
    howToUse: ["Paste SVG", "Copy URI"],
    features: ["Convert SVG code into a Data URI for use in CSS.", "URL-encodes the SVG for optimal compatibility.", "Copy the Data URI with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The SVG to Data URI converter transforms raw SVG (Scalable Vector Graphics) code into a compact, URL-encoded string that can be directly embedded into HTML or CSS. This eliminates the need for external image files, reducing HTTP requests and potentially speeding up web page load times, especially for small icons and graphics.",
    usageExamples: [
      "Inlining small SVG icons directly into CSS backgrounds to optimize website performance.",
      "Embedding SVG graphics within HTML without linking to an external file.",
      "Using dynamically generated SVG for interactive elements without server-side processing.",
      "Simplifying asset management by having graphics directly within the stylesheet or markup."
    ],
    underlyingConcept: "A Data URI is a scheme that allows content to be embedded directly within web documents, rather than linking to it externally. For SVG, the process involves URL-encoding the XML-based SVG code (converting special characters like `<`, `>`, and `#` into their percent-encoded equivalents) and then prepending it with the `data:image/svg+xml,` MIME type. This results in a single, self-contained string that represents the entire SVG image.",
    faqs: [
      {
        "question": "What is a Data URI?",
        "answer": "A Data URI is a scheme that provides a way to include data in-line in web pages as if they were external resources. It is commonly used to embed images in CSS or HTML."
      },
      {
        "question": "Why should I convert SVG to a Data URI?",
        "answer": "Converting SVG to a Data URI can improve performance by reducing the number of HTTP requests your website needs to make. It is especially useful for small icons and images."
      },
      {
        "question": "How do I use the generated Data URI?",
        "answer": "You can use the generated Data URI as the value for the `url()` function in your CSS, for example, as a `background-image`."
      }
    ],
  },

  'json-yaml-converter': {
    introduction: "Convert between JSON and YAML.",
    howToUse: ["Select conversion direction", "Paste code", "Copy result"],
    features: ["Convert JSON to YAML and vice versa.", "Real-time validation.", "Simple and clean interface."],
    privacy: PRIVACY_STATEMENT,
    explanation: "This tool provides a seamless way to convert data between JSON (JavaScript Object Notation) and YAML (YAML Ain't Markup Language) formats. Whether you are migrating configuration files or debugging data structures, this bidirectional converter ensures accurate and quick transformation of your data.",
    usageExamples: [
      "Converting Kubernetes configuration from JSON to YAML.",
      "Transforming API responses (JSON) into a more readable YAML format.",
      "Migrating data between systems using different serialization standards."
    ],
    underlyingConcept: "The tool parses the input string into a JavaScript object structure and then re-serializes it into the target format. It handles the nuances of both specifications, such as JSON's strict bracketing and YAML's indentation-based hierarchy.",
    faqs: [
      {
        "question": "What is the difference between JSON and YAML?",
        "answer": "JSON is widely used for data interchange in web applications, while YAML is preferred for configuration files due to its readability. JSON uses brackets and braces, whereas YAML uses indentation."
      },
      {
        "question": "Can I convert complex nested structures?",
        "answer": "Yes, the tool supports deep nesting of objects and arrays in both formats."
      },
      {
        "question": "Is the conversion reversible?",
        "answer": "Generally yes, provided the data types are supported in both formats. Some specific YAML features (like references) might be lost when converting to standard JSON."
      }
    ],
  },
  'json-csv-converter': {
    introduction: "Convert between JSON and CSV.",
    howToUse: ["Select conversion direction", "Paste data", "Start conversion"],
    features: ["Convert JSON arrays to CSV and vice versa.", "Customizable delimiters.", "Support for nested objects (flattening)."],
    privacy: PRIVACY_STATEMENT,
    explanation: "This tool simplifies the process of transforming data between structured JSON and tabular CSV formats. It's essential for data migration, analysis, and interoperability between web APIs (JSON) and spreadsheet software (CSV).",
    usageExamples: [
      "Converting a database export from JSON to CSV for analysis in Excel.",
      "Preparing CSV data for upload to a REST API.",
      "Flattening nested JSON data into a table format."
    ],
    underlyingConcept: "When converting JSON to CSV, the tool iterates through the array of objects, extracting keys as headers and mapping values to rows. For CSV to JSON, it parses the delimiter-separated lines, using the first row as keys to construct an array of objects.",
    faqs: [
      {
        "question": "How does it handle nested JSON objects?",
        "answer": "The behavior depends on the specific settings, but typically nested objects are either stringified or flattened to fit the 2D CSV structure."
      },
      {
        "question": "Can I use custom delimiters?",
        "answer": "Yes, you can specify custom separators like semicolons or tabs instead of commas."
      },
      {
        "question": "Is it suitable for large files?",
        "answer": "Yes, but performance depends on your browser's capabilities as processing happens locally."
      }
    ],
  },
  'youtube-thumbnail': {
    introduction: "Grab video thumbnails.",
    howToUse: ["Paste URL", "Get Images"],
    features: ["Download thumbnails from any YouTube video in max resolution.", "Supports all thumbnail sizes.", "Download thumbnails with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The YouTube Thumbnail Downloader is a utility that allows users to quickly extract and download high-resolution thumbnail images from any YouTube video. By simply providing the video's URL, the tool accesses YouTube's API to retrieve all available thumbnail sizes, offering a convenient way to get promotional images for content creators, designers, or anyone needing a snapshot from a video.",
    usageExamples: [
      "Downloading a specific frame as a thumbnail for a blog post featuring a YouTube video.",
      "Content creators saving their own thumbnails for backup or repurposing.",
      "Designers needing high-quality images for mockups or presentations related to YouTube content.",
      "Creating custom share images for social media posts linking to YouTube videos."
    ],
    underlyingConcept: "YouTube automatically generates several thumbnail images for each uploaded video in various resolutions (e.g., default, medium, high, standard, maxres). These thumbnails are publicly accessible via predictable URL patterns based on the video ID. This tool extracts the video ID from the provided YouTube URL and then constructs the direct URLs to these high-resolution thumbnails, allowing the user to view and download them.",
    faqs: [
      {
        "question": "How do I download a YouTube thumbnail?",
        "answer": "Simply paste the YouTube video URL into the input field, and this tool will generate all available thumbnail sizes for you to download."
      },
      {
        "question": "What is the maximum resolution available?",
        "answer": "This tool can download the maximum resolution thumbnail available for the video, which is usually 1280x720 pixels."
      },
      {
        "question": "Is it legal to download YouTube thumbnails?",
        "answer": "YouTube thumbnails are generally copyrighted by the video owner. You should only download thumbnails for personal use or with permission from the copyright holder."
      }
    ],
  },
  'fancy-font-generator': {
    introduction: "Create fancy text.",
    howToUse: ["Type text", "Copy style"],
    features: ["Generate stylish text for social media bios.", "Supports various font styles.", "Copy generated text with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Fancy Font Generator transforms ordinary text into a wide array of decorative and stylish character combinations. Unlike traditional fonts that require installation, this tool uses Unicode characters that resemble different typestyles, allowing users to create visually unique text that can be copied and pasted into social media bios, posts, or messages to add flair and stand out.",
    usageExamples: [
      "Creating eye-catching social media bios with unique and artistic text.",
      "Designing special headings or titles for personal blogs or creative projects.",
      "Adding decorative text to chat messages or online forums.",
      "Making announcements or promotional content more visually appealing."
    ],
    underlyingConcept: "The tool works by leveraging the extensive character set of Unicode. Beyond standard alphanumeric characters, Unicode includes thousands of symbols, diacritics, and stylistic variations that, when combined, can mimic different font styles. Each \"fancy font\" is essentially a mapping of standard characters to these alternative Unicode characters, which are then rendered by any system that supports Unicode.",
    faqs: [
      {
        "question": "How can I generate fancy fonts for my social media bio?",
        "answer": "You can use this tool to type your text and it will generate a variety of stylish fonts that you can copy and paste into your social media bio."
      },
      {
        "question": "Are these actual fonts?",
        "answer": "No, these are not actual fonts. They are Unicode characters that look like different font styles. This is why you can copy and paste them anywhere."
      },
      {
        "question": "Will the fancy fonts work on all social media platforms?",
        "answer": "Most modern social media platforms support Unicode characters, so the fancy fonts should work on platforms like Instagram, Twitter, and Facebook."
      }
    ],
  },
  'hashtag-extractor': {
    introduction: "Find all hashtags.",
    howToUse: ["Paste text", "Copy tags"],
    features: ["Extract hashtags from a block of text.", "Supports multi-line text.", "Copy extracted hashtags with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Hashtag Extractor is a specialized tool that scans a given block of text and automatically identifies and lists all embedded hashtags. This utility is invaluable for social media managers, content strategists, and data analysts who need to quickly pinpoint trending topics, analyze campaign performance, or organize user-generated content by relevant tags.",
    usageExamples: [
      "Analyzing the trending hashtags in a collection of social media posts.",
      "Extracting relevant hashtags from customer feedback or comments for sentiment analysis.",
      "Curating a list of popular tags for a marketing campaign.",
      "Cleaning text data by separating hashtags from the main content."
    ],
    underlyingConcept: "Hashtags are words or phrases prefixed with a hash symbol (`#`) and are used on social media platforms to categorize content and make it discoverable. The tool operates by applying pattern matching, typically using regular expressions, to identify sequences of characters that start with `#` and are followed by alphanumeric characters (and sometimes underscores), until a whitespace or punctuation mark is encountered.",
    faqs: [
      {
        "question": "What is a hashtag extractor?",
        "answer": "A hashtag extractor is a tool that automatically finds and extracts all the hashtags from a block of text."
      },
      {
        "question": "How do I use this tool?",
        "answer": "Simply paste your text into the input field, and the tool will extract all the hashtags and display them in a list for you to copy."
      },
      {
        "question": "Does it support multiple hashtags in a single line?",
        "answer": "Yes, this tool can extract multiple hashtags from a single line of text, as well as from multi-line text."
      }
    ],
  },
  'image-filters': {
    introduction: "Apply effects to images.",
    howToUse: ["Upload image", "Adjust sliders", "Download"],
    features: ["Apply CSS filters like grayscale, sepia, and blur to images.", "Adjust brightness, contrast, and saturation.", "Download the filtered image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Image Filters tool allows users to apply various visual effects to images directly within their browser. Utilizing CSS filter properties, it enables real-time adjustments such as grayscale conversion, sepia toning, blurring, brightness control, and more, all without needing complex image editing software. This makes it ideal for quick edits, design prototyping, and experimenting with visual styles.",
    usageExamples: [
      "Quickly adjusting the brightness or contrast of a photo for web use.",
      "Applying a vintage sepia tone to an image for a nostalgic effect.",
      "Blurring sensitive areas of an image before sharing.",
      "Experimenting with different filter combinations for creative design."
    ],
    underlyingConcept: "CSS filters are a powerful feature that can be applied to elements on a webpage, including images, to achieve various visual effects. These filters operate directly on the pixels of the rendered element. For instance, `grayscale()` converts an image to shades of gray, `sepia()` gives it a brownish tint, and `blur()` applies a Gaussian blur effect. The tool provides sliders or input fields that directly manipulate the values of these CSS properties, which are then applied to the image in real-time using JavaScript.",
    faqs: [
      {
        "question": "How can I apply filters to my photos?",
        "answer": "You can use this tool to upload your photo and apply various CSS filters like grayscale, sepia, and blur. You can also adjust the brightness, contrast, and saturation."
      },
      {
        "question": "Are these the same filters as on Instagram?",
        "answer": "These are not the exact same filters as on Instagram, but they are similar CSS-based filters that can give your photos a professional look."
      },
      {
        "question": "Can I download the edited photo?",
        "answer": "Yes, after you have applied the filters and adjusted the settings, you can download the filtered image to your device."
      }
    ],
  },
  'svg-blob-generator': {
    introduction: "Generate random blobs.",
    howToUse: ["Adjust settings", "Copy SVG"],
    features: ["Create organic blob shapes for backgrounds.", "Customize complexity and contrast.", "Copy the SVG code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The SVG Blob Generator is a creative tool that allows users to easily design unique, organic, and irregularly shaped SVG (Scalable Vector Graphics) blobs. These versatile shapes are popular in modern web design for adding a playful, fluid, and dynamic touch to backgrounds, sections, or UI elements, without the performance overhead of raster images.",
    usageExamples: [
      "Designing abstract background elements for website hero sections or banners.",
      "Creating unique shapes for UI components like buttons, cards, or containers.",
      "Adding organic design elements to digital art or illustrations.",
      "Experimenting with fluid geometric forms for branding or visual identity."
    ],
    underlyingConcept: "SVG blobs are typically generated using mathematical curves, often Bézier curves, which allow for smooth, continuous shapes. The tool manipulates parameters such as the number of control points, their distances from the center, and the smoothness of the curves to create a wide variety of \"blobby\" forms. These parameters are often randomized to produce unique shapes with each generation, and the output is pure SVG code, which is resolution-independent and highly scalable.",
    faqs: [
      {
        "question": "What is an SVG blob?",
        "answer": "An SVG blob is an organic, irregular shape created with SVG (Scalable Vector Graphics). They are often used as background elements in web design to add a modern and creative touch."
      },
      {
        "question": "How can I customize the blob shape?",
        "answer": "You can customize the complexity and contrast of the blob shape using the sliders in this tool. You can also generate a new random blob with a single click."
      },
      {
        "question": "How do I use the generated SVG code?",
        "answer": "You can copy the SVG code and paste it directly into your HTML file, or save it as an .svg file and use it as an image."
      }
    ],
  },
  'svg-wave-generator': {
    introduction: "Create page dividers.",
    howToUse: ["Set layers", "Copy SVG"],
    features: ["Generate smooth wave dividers for your website.", "Customize wave height, layers, and color.", "Copy the SVG code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The SVG Wave Generator is a creative design tool that enables users to effortlessly produce smooth, customizable wave shapes in SVG (Scalable Vector Graphics) format. These waves are commonly employed as elegant visual dividers or background elements on websites, adding a modern, dynamic, and aesthetically pleasing touch to layouts without relying on raster images that can pixelate or increase load times.",
    usageExamples: [
      "Creating stylish section dividers between different content blocks on a webpage.",
      "Designing unique background patterns for hero sections or footers.",
      "Adding fluid, organic shapes to presentations or digital art.",
      "Enhancing the visual appeal of web applications with custom wave designs."
    ],
    underlyingConcept: "Similar to SVG blobs, SVG waves are constructed using mathematical curves, typically Bézier curves, which define the path of the wave. The generator allows manipulation of parameters such as amplitude (wave height), frequency (number of waves), layers, and color. By adjusting these parameters, the tool dynamically generates the SVG path data that renders the desired wave pattern, providing a lightweight, responsive, and resolution-independent graphic.",
    faqs: [
      {
        "question": "What are SVG waves?",
        "answer": "SVG waves are smooth, wave-like shapes created with SVG (Scalable Vector Graphics) that are often used as page dividers or background elements in web design."
      },
      {
        "question": "How can I customize the waves?",
        "answer": "You can customize the height, layers, and color of the waves using the controls in this tool. You can also randomize the waves to get a unique shape."
      },
      {
        "question": "Can I use the generated SVG code on my website?",
        "answer": "Yes, you can copy the SVG code and paste it directly into your HTML or use it in your CSS to create beautiful wave dividers on your website."
      }
    ],
  },
  'keycode-info': {
    introduction: "Find key codes.",
    howToUse: ["Press key", "See codes"],
    features: ["Get JavaScript event codes for any key press.", "Displays key, code, and which properties.", "Useful for keyboard event handling in JavaScript."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Keycode Event Info tool is an interactive utility for web developers and programmers to quickly identify JavaScript event properties (like `key`, `code`, and `which`) associated with any keyboard key press. This real-time feedback is invaluable for accurately implementing keyboard shortcuts, game controls, or any interactive feature that relies on specific key inputs in web applications.",
    usageExamples: [
      "Developing custom keyboard shortcuts for a web-based text editor or application.",
      "Implementing game controls in a browser-based game using specific key inputs.",
      "Debugging unexpected behavior in JavaScript keydown/keyup event listeners.",
      "Learning about the different key identifiers available in JavaScript event objects."
    ],
    underlyingConcept: "When a key is pressed on a keyboard, the browser generates a keyboard event object. This object contains several properties that describe the event, including `key` (the string value of the key, accounting for modifiers like Shift), `code` (the physical key pressed, regardless of modifiers), and the deprecated `which` (the ASCII value or virtual key code). The tool listens for these DOM keyboard events and displays these properties in real-time, providing immediate insight into the event data.",
    faqs: [
      {
        "question": "What are key codes?",
        "answer": "Key codes are numerical values that represent the keys on a keyboard. They are used in JavaScript to detect which key has been pressed."
      },
      {
        "question": "What is the difference between key, code, and which?",
        "answer": "`key` returns the value of the key pressed, `code` returns the physical key code, and `which` is a deprecated property that returns the key code."
      },
      {
        "question": "Why would I need this tool?",
        "answer": "This tool is useful for developers who are working with keyboard events in JavaScript and need to know the key codes for different keys."
      }
    ],
  },
  'screen-info': {
    introduction: "Check your resolution.",
    howToUse: ["Open tool", "See stats"],
    features: ["View your current screen and viewport dimensions.", "Includes color depth and pixel ratio.", "Useful for responsive design testing."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Screen Resolution Info tool provides detailed information about your current display environment, including screen resolution, viewport dimensions, color depth, and pixel ratio. This is particularly valuable for web developers, designers, and testers who need to ensure their content renders optimally across a wide array of devices and screen configurations, aiding in responsive design and accessibility efforts.",
    usageExamples: [
      "Verifying the actual viewport size when developing responsive web applications.",
      "Testing how designs scale on different screen resolutions.",
      "Debugging layout issues that appear only on specific display configurations.",
      "Understanding pixel density (DPI/PPI) for optimizing image assets."
    ],
    underlyingConcept: "Web browsers provide access to various screen and window properties through the JavaScript `window.screen` and `window.innerWidth`/`innerHeight` objects. `window.screen` gives information about the physical screen (total resolution, color depth), while `window.innerWidth`/`innerHeight` provides the dimensions of the browser's viewport (the visible area of the webpage). The tool queries these browser APIs in real-time to display the relevant statistics to the user.",
    faqs: [
      {
        "question": "What is screen resolution?",
        "answer": "Screen resolution is the number of distinct pixels in each dimension that can be displayed on a screen. It is usually quoted as width × height."
      },
      {
        "question": "What is the difference between screen resolution and viewport size?",
        "answer": "Screen resolution is the total number of pixels on your screen, while viewport size is the visible area of the web page in your browser window."
      },
      {
        "question": "Why is this information useful?",
        "answer": "This information is useful for web developers who are testing the responsive design of their websites on different screen sizes."
      }
    ],
  },
  'text-to-speech': {
    introduction: "Read text aloud.",
    howToUse: ["Type text", "Click speak"],
    features: ["Convert text to spoken audio in your browser.", "Supports multiple voices and languages.", "Adjust pitch and speed of the voice."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Text to Speech (TTS) tool converts written text into synthesized spoken audio directly within your web browser. This accessibility feature is invaluable for users with visual impairments, learning disabilities, or anyone who prefers to listen to content. It offers customizable voices, languages, and speech parameters, making digital content more engaging and accessible.",
    usageExamples: [
      "Listening to articles, e-books, or long documents while multitasking.",
      "Assisting individuals with reading difficulties or visual impairments to consume digital content.",
      "Practicing pronunciation in different languages.",
      "Creating audio versions of short texts for presentations or educational materials."
    ],
    underlyingConcept: "The tool utilizes the Web Speech API (specifically, `SpeechSynthesis` and `SpeechSynthesisUtterance`) available in modern web browsers. This API allows JavaScript to access the device's built-in text-to-speech capabilities. When text is input, an `SpeechSynthesisUtterance` object is created with the text and desired parameters (voice, pitch, rate), which is then spoken by the `SpeechSynthesis` interface. All processing happens client-side, ensuring privacy.",
    faqs: [
      {
        "question": "How does text-to-speech work?",
        "answer": "Text-to-speech (TTS) is a type of assistive technology that reads digital text aloud. It's sometimes called 'read aloud' technology."
      },
      {
        "question": "Can I choose a different voice or language?",
        "answer": "Yes, this tool supports multiple voices and languages. You can select your preferred voice and language from the dropdown menus."
      },
      {
        "question": "Can I adjust the speed and pitch of the voice?",
        "answer": "Yes, you can adjust the pitch and speed of the voice using the sliders to make it sound just the way you want it."
      }
    ],
  },
  'roman-numeral-converter': {
    introduction: "Convert numbers.",
    howToUse: ["Enter number", "See result"],
    features: ["Convert numbers to Roman numerals and back.", "Supports both integer to Roman and Roman to integer conversion.", "Easy to use interface."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Roman Numeral Converter is a utility for translating modern Arabic numerals into their ancient Roman counterparts and vice-versa. This tool simplifies working with a numeral system that, despite its historical significance, can be challenging to manipulate manually, especially for larger numbers. It's useful for educational purposes, historical contexts, or specific design applications.",
    usageExamples: [
      "Converting years (e.g., 2023) into Roman numerals for architectural inscriptions or copyright dates.",
      "Reading and understanding Roman numerals found in historical documents or movie credits.",
      "Using Roman numerals for aesthetic numbering in outlines or lists.",
      "Educational purposes to learn the Roman numeral system."
    ],
    underlyingConcept: "The Roman numeral system uses seven basic symbols (I, V, X, L, C, D, M) which represent specific values. Numbers are formed by combining these symbols, often following a principle of addition (symbols placed right of a larger value add to it) and subtraction (symbols placed left of a larger value subtract from it, e.g., IV = 4). The converter implements an algorithm that iteratively subtracts or adds values based on these rules to perform the conversion.",
    faqs: [
      {
        "question": "What are Roman numerals?",
        "answer": "Roman numerals are a numeral system that originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages."
      },
      {
        "question": "How do I convert a number to a Roman numeral?",
        "answer": "You can use this tool to enter a number and it will be automatically converted to its Roman numeral representation."
      },
      {
        "question": "Can I convert a Roman numeral to a number?",
        "answer": "Yes, you can also enter a Roman numeral and the tool will convert it back to a number."
      }
    ],
  },
  'age-calculator': {
    introduction: "Find your exact age.",
    howToUse: ["Enter birthdate", "See age"],
    features: ["Calculate your exact age in years, months, and days.", "Shows the total number of days you have lived.", "Easy to use interface."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Age Calculator is a simple yet precise tool that determines a person's exact age in years, months, and days based on their birth date and the current date. Beyond just providing the age, it offers a detailed breakdown of the duration, useful for various personal, administrative, or ceremonial purposes.",
    usageExamples: [
      "Quickly finding out someone's exact age for personal records or curiosity.",
      "Calculating age for legal or administrative purposes where precise age is required.",
      "Determining the time remaining until a significant future event, like a birthday.",
      "Educational purposes to understand date arithmetic."
    ],
    underlyingConcept: "The Age Calculator performs date arithmetic. It takes two date inputs (birth date and current date) and calculates the difference by sequentially subtracting years, then months, then days. Special attention is paid to handling month and day rollovers (e.g., crossing month boundaries or leap years) to ensure the exact number of days, months, and years between the two dates is accurately computed.",
    faqs: [
      {
        "question": "How can I calculate my age?",
        "answer": "You can use this tool to calculate your exact age in years, months, and days by entering your date of birth."
      },
      {
        "question": "Does it show my age in days?",
        "answer": "Yes, this tool also shows the total number of days you have lived since your date of birth."
      },
      {
        "question": "Is my date of birth stored anywhere?",
        "answer": "No, your date of birth is not stored anywhere. All calculations are done in your browser, so your data remains private."
      }
    ],
  },
  'random-number-generator': {
    introduction: "Get random numbers.",
    howToUse: ["Set range", "Generate"],
    features: ["Generate random numbers within a specific range.", "Set minimum and maximum values.", "Generate multiple random numbers at once."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Random Number Generator is a utility that produces a sequence of numbers or a single number with no discernible pattern, within a user-defined range. This tool is valuable for simulations, games, statistical sampling, or any scenario where unpredictability and a lack of bias are desired. Users can specify minimum, maximum, and whether to generate integers or floating-point numbers.",
    usageExamples: [
      "Drawing lottery numbers or making random selections for games.",
      "Simulating dice rolls or coin flips for a game or experimental setup.",
      "Generating unique IDs or temporary passwords for testing purposes.",
      "Creating random data sets for statistical analysis or machine learning model training."
    ],
    underlyingConcept: "While true randomness is difficult to achieve in deterministic computer systems, this tool typically employs a pseudorandom number generator (PRNG). A PRNG starts with an initial value (seed) and uses a deterministic algorithm to produce a sequence of numbers that appear random. Modern browsers often use cryptographically secure PRNGs (CSPRNGs) which are suitable for most general-purpose random number generation tasks, providing a high degree of statistical randomness and unpredictability.",
    faqs: [
      {
        "question": "How can I generate a random number?",
        "answer": "You can use this tool to generate a random number within a specific range by setting the minimum and maximum values."
      },
      {
        "question": "Can I generate more than one random number at a time?",
        "answer": "Yes, you can specify the number of random numbers you want to generate, and the tool will generate them for you."
      },
      {
        "question": "Is the generated number truly random?",
        "answer": "The numbers are pseudo-random, which means they are generated by an algorithm that produces a sequence of numbers that appears to be random. For most purposes, they are random enough."
      }
    ],
  },
  'duplicate-remover': {
    introduction: "Clean lists.",
    howToUse: ["Paste list", "Remove dupes"],
    features: ["Remove duplicate entries from a list of text.", "Supports case-sensitive and case-insensitive matching.", "Copy the cleaned list with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Duplicate Line Remover is an essential utility for data cleaning and text processing. It efficiently scans a given block of text or a list of items and eliminates redundant entries, leaving only unique lines. This helps in refining data sets, ensuring accuracy, and improving the efficiency of various text-based tasks by removing unnecessary repetition.",
    usageExamples: [
      "Cleaning mailing lists or contact databases to remove duplicate entries.",
      "Consolidating log files or server output to focus on unique events.",
      "Refining keyword lists for SEO campaigns to avoid targeting the same phrases multiple times.",
      "Preparing unique items for a randomized selection process."
    ],
    underlyingConcept: "The tool typically processes the input text line by line. Each line is compared against a collection of lines already encountered. If a line is found to be identical to one already in the collection (based on either case-sensitive or case-insensitive comparison, depending on user settings), it is discarded. Otherwise, it is added to the collection of unique lines and retained in the output. This comparison is usually performed using hash tables or set data structures for optimal performance.",
    faqs: [
      {
        "question": "How do I remove duplicate lines from my text?",
        "answer": "Simply paste your text into the input field, and this tool will automatically remove all the duplicate lines, leaving you with a clean list of unique lines."
      },
      {
        "question": "Does it matter if the duplicates have different capitalization?",
        "answer": "You can choose whether you want the comparison to be case-sensitive or case-insensitive. If you choose case-insensitive, 'Apple' and 'apple' will be treated as duplicates."
      },
      {
        "question": "Will this tool preserve the original order of the list?",
        "answer": "Yes, this tool will preserve the original order of the unique items in your list."
      }
    ],
  },
  'html-entity': {
    introduction: "Escape HTML.",
    howToUse: ["Paste text", "Encode/Decode"],
    features: ["Encode/Decode text to HTML entities.", "Supports all HTML special characters.", "Copy the result with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The HTML Entity Encoder/Decoder converts special characters in text into their corresponding HTML entity references (e.g., `&lt;` for `<`) and vice-versa. This is essential for correctly displaying reserved HTML characters in web content without them being interpreted as markup, preventing layout issues, and mitigating certain types of security vulnerabilities like Cross-Site Scripting (XSS).",
    usageExamples: [
      "Displaying code snippets or mathematical symbols accurately within an HTML document.",
      "Sanitizing user-generated content before rendering it on a webpage to prevent malicious script injection (XSS).",
      "Converting special characters in database entries to a web-safe format for consistent display.",
      "Decoding HTML entities back into their original characters for readability or further text processing."
    ],
    underlyingConcept: "HTML entities are special codes used in HTML to represent characters that are reserved (like `<`, `>`, `&`, `\"`) or not easily typable on a standard keyboard (like `©`, `™`). Encoding involves replacing these actual characters with their entity references. Decoding reverses this process. The tool implements a lookup table or character mapping to perform these conversions according to the HTML standard, ensuring characters are rendered as intended by browsers.",
    faqs: [
      {
        "question": "What are HTML entities?",
        "answer": "HTML entities are used to display reserved characters in HTML. For example, if you want to display the less than sign (<), you need to use the entity &lt;."
      },
      {
        "question": "Why do I need to encode HTML entities?",
        "answer": "You need to encode HTML entities to prevent the browser from misinterpreting your text as HTML code. This is especially important when you are displaying code snippets or user-generated content."
      },
      {
        "question": "Can I decode HTML entities as well?",
        "answer": "Yes, this tool can both encode and decode HTML entities, so you can easily convert between the two formats."
      }
    ],
  },
  'css-cursors': {
    introduction: "View CSS cursors.",
    howToUse: ["Hover boxes", "Copy CSS"],
    features: ["Visual reference for all CSS cursor types.", "Hover to see the cursor in action.", "Copy the CSS code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The CSS Cursor Viewer is a practical reference tool that visually showcases all available CSS cursor properties. By hovering over each example, users can instantly see how different cursor styles appear, making it easy to select the perfect cursor for interactive web elements. This eliminates the need for guesswork or repeated testing, streamlining the design and development process for user interfaces.",
    usageExamples: [
      "Choosing an appropriate cursor for draggable elements (`grab`, `grabbing`).",
      "Indicating interactive elements that are clickable (`pointer`) versus static text (`text`).",
      "Designing custom resize handles (`nw-resize`, `se-resize`).",
      "Providing visual cues for loading states (`wait`, `progress`)."
    ],
    underlyingConcept: "The `cursor` CSS property defines the mouse cursor to display when the pointer is over an element. Browsers provide a set of predefined keyword values (e.g., `auto`, `default`, `none`, `pointer`, `help`, `wait`, `text`, `move`, `not-allowed`, `zoom-in`, `alias`, `copy`, `grab`, `grabbing`, and various resizing cursors). The tool simply renders elements with these different `cursor` property values and allows users to interactively preview them.",
    faqs: [
      {
        "question": "What is the CSS cursor property?",
        "answer": "The CSS cursor property specifies the mouse cursor to be displayed when pointing over an element."
      },
      {
        "question": "How can I see the different cursor types?",
        "answer": "You can hover over the boxes in this tool to see a live preview of each cursor type. You can then copy the CSS code for the cursor you want to use."
      },
      {
        "question": "Are all these cursors supported by all browsers?",
        "answer": "Most of these cursors are supported by all modern browsers. However, some of the less common cursors may have limited support."
      }
    ],
  },
  'device-resolutions': {
    introduction: "Check device sizes.",
    howToUse: ["Search device", "See specs"],
    features: ["Reference guide for common device screen sizes.", "Includes viewport size, resolution, and pixel density.", "Search for specific devices."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Device Resolution List serves as a comprehensive reference guide for web developers and designers, cataloging common screen sizes and resolutions across various devices (desktops, laptops, tablets, and mobile phones). This resource is crucial for designing and testing responsive web layouts, ensuring optimal user experience regardless of the device used to access the content.",
    usageExamples: [
      "Designing responsive layouts that adapt seamlessly to different screen dimensions.",
      "Testing website breakpoints and media queries against real-world device sizes.",
      "Ensuring content is readable and interactive on various mobile and tablet displays.",
      "Making informed decisions about image and video asset optimization based on common device pixel densities."
    ],
    underlyingConcept: "Modern web design heavily relies on responsive principles, where layouts fluidly adjust to the user's screen size. This tool provides a curated dataset of these common dimensions. While browsers offer APIs to detect screen/viewport sizes, having a static reference helps in planning and ensuring cross-device compatibility, especially considering the vast and ever-growing ecosystem of digital devices.",
    faqs: [
      {
        "question": "Why is it important to know the screen resolutions of different devices?",
        "answer": "It is important for web developers and designers to know the screen resolutions of different devices to ensure that their websites are responsive and look good on all screen sizes."
      },
      {
        "question": "What is the difference between viewport size and resolution?",
        "answer": "Resolution is the total number of pixels on the screen, while viewport size is the visible area of the web page in the browser window. The viewport size can be smaller than the resolution if the user has zoomed in or if there are browser toolbars."
      },
      {
        "question": "Can I search for a specific device?",
        "answer": "Yes, you can use the search bar to find the screen size information for a specific device."
      }
    ],
  },
  'lorem-image-generator': {
    introduction: "Get dummy images.",
    howToUse: ["Set size", "Copy URL"],
    features: ["Generate placeholder image URLs.", "Customize image size and grayscale.", "Get a random image or a specific one by ID."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Lorem Picsum Generator provides a simple and efficient way to generate placeholder image URLs. These URLs can be used in web development and design mockups to quickly populate layouts with visually appealing, royalty-free images of various sizes and styles. It eliminates the need to source or create temporary image assets, streamlining the prototyping and development process.",
    usageExamples: [
      "Rapidly populating image galleries or hero sections in web development mockups.",
      "Testing responsive image loading with different dimensions.",
      "Creating placeholders for design wireframes or presentations.",
      "Generating quick, visually diverse images for development sandbox environments."
    ],
    underlyingConcept: "Lorem Picsum operates as an image placeholder service. When a request is made to its API (typically through a URL containing desired width, height, and optional parameters), the service dynamically serves a random or specific image from its collection. The tool generates these specialized URLs, allowing developers to integrate diverse placeholders without local storage or complex setup, relying on the external service to deliver the image content.",
    faqs: [
      {
        "question": "What is a placeholder image?",
        "answer": "A placeholder image is a temporary image that is used in a design to represent a final image that is not yet available. It is often used in web design and development to test the layout and design of a page."
      },
      {
        "question": "How can I customize the placeholder image?",
        "answer": "You can customize the size of the image, and you can also choose to have a grayscale image. You can also get a specific image by providing an ID."
      },
      {
        "question": "How do I use the generated URL?",
        "answer": "You can copy the generated URL and use it as the `src` attribute of an `<img>` tag in your HTML."
      }
    ],
  },
  'css-borders': {
    introduction: "Preview borders.",
    howToUse: ["Click style", "Copy code"],
    features: ["Visualizer for all CSS border styles.", "Click to see the border style in action.", "Copy the CSS code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The CSS Border Preview tool offers an interactive visual guide to all standard CSS border styles. Developers and designers can quickly explore how different border styles (like solid, dotted, dashed, groove, ridge, inset, outset) render, select a style, and instantly get the corresponding CSS code. This streamlines the process of adding custom and visually distinct borders to web elements.",
    usageExamples: [
      "Experimenting with various border styles to find the perfect visual treatment for UI elements.",
      "Designing visually distinct containers or sections on a webpage.",
      "Creating emphasis around specific content blocks.",
      "Quickly obtaining CSS code for standard border properties without manual lookup."
    ],
    underlyingConcept: "The `border-style` CSS property defines the style of an element's four borders. It accepts a range of keywords, each with a specific rendering behavior defined by the CSS specification. For example, `solid` creates a single, straight line, `dotted` creates a series of dots, and `groove` creates a carved-in appearance. The tool dynamically applies these `border-style` properties to a sample element and displays them, allowing for direct visual comparison and code generation.",
    faqs: [
      {
        "question": "What is the CSS border property?",
        "answer": "The CSS border property is a shorthand property for setting the individual border properties (border-width, border-style, and border-color) in one place in a style sheet."
      },
      {
        "question": "How can I see the different border styles?",
        "answer": "You can click on the different border styles in this tool to see a live preview of how they look. You can then copy the CSS code for the border style you want to use."
      },
      {
        "question": "Are all these border styles supported by all browsers?",
        "answer": "Yes, all the border styles in this tool are part of the CSS standard and are supported by all modern browsers."
      }
    ],
  },
  'css-patterns': {
    introduction: "Create patterns.",
    howToUse: ["Select style", "Customize", "Copy"],
    features: ["Generate pure CSS background patterns.", "Customize colors and pattern size.", "Copy the CSS code with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The CSS Background Patterns tool enables web developers and designers to create intricate and visually appealing background patterns using only CSS, completely avoiding image files. This approach results in lightweight, resolution-independent, and easily customizable patterns that can enhance the aesthetic of any webpage without negatively impacting load times or scalability.",
    usageExamples: [
      "Designing subtle textured backgrounds for website sections or entire pages.",
      "Creating repeating geometric patterns for banners or hero images.",
      "Implementing unique visual motifs for UI components or cards.",
      "Experimenting with different pattern densities and color combinations for branding."
    ],
    underlyingConcept: "Pure CSS patterns are typically generated using a combination of CSS `background-image` properties with multiple linear or radial gradients, `background-size`, and `background-position`. By strategically layering and repeating these gradients, complex visual effects can be achieved. For example, a simple grid pattern might involve two linear gradients crossing each other. The tool provides a visual interface to manipulate these CSS properties and then outputs the generated CSS snippet.",
    faqs: [
      {
        "question": "What are CSS background patterns?",
        "answer": "CSS background patterns are repeating patterns created with CSS that can be used as the background for an element on a web page. They are a lightweight alternative to using images for backgrounds."
      },
      {
        "question": "How can I customize the patterns?",
        "answer": "You can customize the colors and the size of the pattern using the controls in this tool. You can also choose from a variety of different pattern styles."
      },
      {
        "question": "Is the generated CSS code cross-browser compatible?",
        "answer": "Yes, the generated CSS code for the background patterns is compatible with all modern browsers."
      }
    ],
  },
  'signature-pad': {
    introduction: "Draw signature.",
    howToUse: ["Draw", "Download"],
    features: ["Draw and save digital signatures.", "Customize pen color and thickness.", "Download the signature as a PNG image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Signature Pad is an interactive tool that enables users to create and save digital representations of their handwritten signatures directly in the browser. It provides a canvas where users can draw with a mouse or touchscreen, offering customizable pen styles. This is useful for digitizing signatures for online documents, forms, or personal use without the need for scanning or external hardware.",
    usageExamples: [
      "Signing digital documents or online forms that require a handwritten signature.",
      "Creating a personal digital signature for emails or artistic projects.",
      "Quickly digitizing a signature for use in presentations or design mockups.",
      "Collecting consent or approval for online agreements in a visually authentic manner."
    ],
    underlyingConcept: "The Signature Pad utilizes HTML5 Canvas technology to provide a drawing surface. When a user interacts with the canvas (e.g., mouse down, move, up events), the tool captures these coordinates and renders lines between them, creating the appearance of a handwritten stroke. The final signature can then be exported as an image (typically PNG or SVG) by converting the canvas content into a data URL. All drawing and processing occur client-side for user privacy.",
    faqs: [
      {
        "question": "What is an online signature pad?",
        "answer": "An online signature pad is a tool that allows you to draw your signature digitally using a mouse, stylus, or touchscreen. You can then save the signature as an image to use in digital documents."
      },
      {
        "question": "How can I create a digital signature for free?",
        "answer": "You can use our free Signature Pad tool to draw your signature and download it as a high-quality PNG image. No sign-up is required."
      },
      {
        "question": "Is my signature stored on your servers?",
        "answer": "No. Your privacy is our priority. All drawing and processing happen in your browser, and your signature is never uploaded or stored on our servers."
      }
    ],
  },
  'readability-score-calculator': {
    introduction:
      "Write with confidence and clarity. Our Readability Score Calculator instantly analyzes your text to see how easy it is to understand. Using trusted metrics like Flesch Reading Ease and Flesch-Kincaid Grade Level, this tool helps you connect with your audience, improve engagement, and make your message accessible to everyone. Perfect for bloggers, marketers, and writers who care about quality.",

    howToUse: [
      "Paste your text into the input field.",
      "Watch as the tool analyzes your writing in real-time.",
      "Review your scores, including Flesch Reading Ease and the estimated U.S. grade level.",
      "Get detailed stats like word count, sentence length, and syllable count.",
      "Refine your text to match your audience's reading level and boost clarity.",
    ],

    features: [
      "Instant Readability Scores: Get Flesch Reading Ease and Flesch-Kincaid Grade Level in seconds.",
      "Detailed Text Analysis: See stats on words, sentences, syllables, and more.",
      "Audience-Focused Writing: Create content that's perfectly tailored to your readers.",
      "Essential for Professionals: A must-have for SEOs, marketers, educators, and UX writers.",
      "Completely Private: Your text is analyzed locally in your browser and never stored.",
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "Readability scores measure how simple your writing is to understand. Formulas like Flesch-Kincaid analyze sentence length and word complexity (syllables) to generate a score. A higher Reading Ease score (0-100) means your text is easier to read, while the Grade Level score shows the U.S. school grade needed to comprehend it. Using these metrics helps you create clear, effective content that resonates with a broader audience.",

    usageExamples: [
      "A blogger ensuring their post is easy for a general audience to digest.",
      "A technical writer simplifying complex documentation for clarity.",
      "A marketer crafting landing page copy that converts.",
      "A UX writer making sure in-app instructions are crystal clear.",
    ],

    underlyingConcept:
      "The tool implements two proven readability formulas. The Flesch Reading Ease formula: 206.835 - 1.015 × (Total Words / Total Sentences) - 84.6 × (Total Syllables / Total Words). The Flesch-Kincaid Grade Level formula: 0.39 × (Total Words / Total Sentences) + 11.8 × (Total Syllables / Total Words) - 15.59. These calculations provide a reliable measure of text complexity, empowering writers to improve clarity.",

    faqs: [
      {
        question: "What is a good readability score?",
        answer:
          "For most online content, a Flesch Reading Ease score of 60-70 is great. This means your text is easily understood by the average reader (around an 8th-grade level).",
      },
      {
        question: "Is a higher grade level better?",
        answer:
          "Not always. Simpler is often better. A high grade level means your text is complex, which can alienate readers. Aim for a grade level that matches your target audience.",
      },
      {
        question: "Is my text private?",
        answer:
          "Yes. All analysis happens on your device. Your text never touches our servers.",
      },
    ],
  },
  'loan-calculator': {
    introduction:
      "Demystify your loan and take control of your financial future. Our advanced Loan Calculator gives you a crystal-clear breakdown of any loan, whether it's a mortgage, car loan, or personal financing. Instantly see your monthly payments, the total interest you'll pay, and a detailed amortization schedule. Make smarter financial decisions by comparing scenarios and finding the loan that works for you.",

    howToUse: [
      "Enter the total Loan Amount you wish to borrow.",
      "Input the annual Interest Rate (e.g., 5 for 5%).",
      "Set the Loan Term in either years or months.",
      "Instantly see your estimated monthly payment, total interest, and total cost.",
      "Explore the full Amortization Schedule to see how your payments reduce the principal over time.",
      "Adjust the numbers to compare different loans and find your best fit.",
    ],

    features: [
      "Accurate Payment Calculation: Get precise monthly payment estimates for any fixed-rate loan.",
      "Full Amortization Schedule: See a detailed, month-by-month breakdown of interest vs. principal.",
      "Total Cost Breakdown: Understand the true cost of your loan with total interest calculations.",
      "Flexible Terms: Supports loan terms in both years and months for ultimate flexibility.",
      "Instant Comparisons: Adjust values on the fly to compare different loan options.",
      "100% Private & Secure: All calculations are performed in your browser. Your financial data is never stored.",
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "An amortization schedule reveals how your loan is paid off over time. With each payment, a portion goes to interest and the rest to the principal (the amount you borrowed). In the beginning, more of your payment covers interest. As you pay down the balance, more goes toward the principal, accelerating your path to being debt-free. Our calculator uses the standard formula to give you a precise financial forecast.",

    usageExamples: [
      "A homebuyer comparing 15-year vs. 30-year mortgage terms.",
      "A car buyer determining what interest rate they can afford.",
      "A student planning their repayment strategy for an education loan.",
      "An entrepreneur forecasting costs for a new business loan.",
    ],

    underlyingConcept:
      "The calculator uses the standard amortizing loan formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where M is the monthly payment, P is the principal, r is the monthly interest rate, and n is the number of payments. This industry-standard formula ensures you get an accurate and reliable financial picture.",

    faqs: [
      {
        question: "Why do my first few payments mostly go to interest?",
        answer:
          "Interest is calculated on your outstanding balance. Since your balance is highest at the start, the interest portion of your payment is also at its peak. As you pay down the principal, this amount decreases.",
      },
      {
        question: "How can I pay less interest overall?",
        answer:
          "Choose a shorter loan term, secure a lower interest rate, or make extra payments toward the principal. Even small extra payments can save you thousands over the life of the loan.",
      },
      {
        question: "Does this work for all types of loans?",
        answer:
          "Yes, it works perfectly for any fixed-rate installment loan, including mortgages, auto loans, and personal loans.",
      },
    ],
  },
  'timezone-converter': {
    introduction:
      "Effortlessly sync with the world. The Time Zone Converter eliminates confusion when dealing with global times. Whether you're scheduling a meeting with an international client, planning your next trip, or coordinating with a remote team, this tool provides instant, accurate time conversions. See the exact time anywhere on the planet with a clean, simple interface.",

    howToUse: [
      "Pick the date and time you want to convert.",
      "Select your 'From' and 'To' time zones from the dropdown lists.",
      "The converted date and time appear instantly.",
      "Use the 'Swap' button to quickly reverse the conversion.",
      "The tool automatically handles Daylight Saving Time (DST) for you.",
    ],

    features: [
      "Instant & Accurate: Real-time conversions between any two global time zones.",
      "Clear Comparison: A side-by-side display makes it easy to see the time difference.",
      "DST Aware: Automatically adjusts for Daylight Saving Time so you don't have to.",
      "Comprehensive List: Search from a clean, IANA-standard list of time zones.",
      "Swap Functionality: Quickly flip your 'From' and 'To' locations with one click.",
      "Completely Private: All calculations happen in your browser. Your data is never saved.",
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "This converter uses your browser's built-in Internationalization API (Intl) for maximum accuracy. By formatting a single time object according to different IANA time zone rules (like 'America/New_York' or 'Asia/Tokyo'), it ensures every conversion is precise and accounts for regional complexities like Daylight Saving Time, all without needing external servers.",

    usageExamples: [
      "A project manager finding the perfect meeting time for a team spread across continents.",
      "A traveler checking their arrival time in the local destination.",
      "A remote worker making sure they don't message a colleague in the middle of the night.",
      "Someone sending birthday wishes at exactly midnight in a friend's time zone.",
    ],

    underlyingConcept:
      "Powered by `Intl.DateTimeFormat`, the tool renders a single UTC timestamp in the context of different IANA time zones. This modern approach guarantees accuracy by respecting regional offsets, DST rules, and date boundaries, providing a reliable conversion every time.",

    faqs: [
      {
        question: "What are IANA time zones?",
        answer:
          "They are standardized identifiers for time zones, like 'America/Los_Angeles' or 'Europe/London'. They are the global standard and automatically account for local rules and DST.",
      },
      {
        question: "Why is the converted day sometimes different?",
        answer:
          "When the time difference between two zones is large, it can cross over midnight. For example, evening in New York might already be the next morning in Tokyo.",
      },
      {
        question: "Is my data private?",
        answer:
          "Absolutely. All conversions happen locally on your device. Nothing is ever stored or transmitted.",
      },
    ],
  },
  'case-converter': {
    tip: "Use 'Title Case' for professional-looking headlines and 'Sentence case' for easy-to-read paragraphs.",
    introduction:
      "Tired of manually fixing text case? Our Case Converter tool instantly transforms your text into the format you need. Whether it's for a headline, a document, or a piece of code, you can switch between UPPERCASE, lowercase, Sentence case, Title Case, and more in a single click. Save time and eliminate errors with this simple yet powerful tool.",
    explanation:
      "The tool uses smart logic to apply the correct case transformation. For Title Case, it capitalizes major words while ignoring minor ones (like 'a' or 'the'). For Sentence case, it capitalizes the first letter of each sentence. It's fast, efficient, and all done in your browser.",
    usageExamples: [
      "A writer converting a headline to Title Case for a blog post.",
      "A developer changing variable names to UPPER_CASE for constants.",
      "A student formatting an essay with proper Sentence case.",
    ],
    underlyingConcept:
      "Text casing is crucial for readability and style. Different cases serve different purposes: uppercase for emphasis, title case for headlines, and sentence case for readability. This tool automates these conventions, handling various languages and special characters with Unicode support.",
    howToUse: [
      "Paste your text into the input box.",
      "Click the button for the case you want (e.g., UPPER CASE, lower case).",
      "Your converted text appears instantly in the result area.",
      "Copy the result with a single click.",
    ],
    features: [
      "Multiple Formats: Supports UPPER, lower, Sentence, Title case, and more.",
      "Instant Conversion: No delays, no server processing.",
      "Simple Interface: Clean, intuitive, and easy to use.",
      "Handles Large Text: Works efficiently even with long documents.",
    ],
    faqs: [
      {
        question: "Does it work with other languages?",
        answer:
          "Yes, it supports Unicode, so it works with accented letters and other alphabets.",
      },
      {
        question: "Can I convert a whole document?",
        answer:
          "Absolutely. The tool can handle large blocks of text without a problem.",
      },
      {
        question: "Is there a text limit?",
        answer:
          "No strict limit. Performance with extremely large texts depends on your browser.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'word-counter': {
    introduction:
      "Every word matters. Our free Word Counter gives you a real-time analysis of your text, helping you write with precision and meet any requirement. Whether you're a student drafting an essay, a blogger optimizing for SEO, or a marketer crafting the perfect social media post, this tool provides the essential metrics you need: word count, character count, sentence and paragraph totals, and even an estimated reading time. It's fast, accurate, and designed to keep you focused.",
    howToUse: [
      "Start typing or paste your text into the input area.",
      "Watch the counts for words, characters, sentences, and paragraphs update in real-time.",
      "Check the estimated reading time to see how long it will take to read your content.",
      "Use the clean, distraction-free interface to focus on your writing.",
    ],
    features: [
      "Real-Time Analytics: Instant counts for words, characters, sentences, and paragraphs.",
      "Reading Time Estimator: See how long your text will take to read.",
      "Multi-Language Support: Works accurately with any language thanks to Unicode compatibility.",
      "Clean & Focused UI: A minimalist design with dark mode for comfortable writing sessions.",
      "Advanced Detection: Smartly recognizes sentences, even with abbreviations.",
      "Privacy-First: All analysis is done locally in your browser. Your text is never stored.",
    ],
    privacy: PRIVACY_STATEMENT,
    explanation:
      "This Word Counter uses smart linguistic parsing to deliver precise metrics. Words are identified by spaces and punctuation, sentences by analyzing boundaries, and paragraphs by line breaks. This provides a deeper understanding of your writing style and structure, helping you improve readability and meet specific guidelines for any platform.",
    usageExamples: [
      "A student ensuring their essay meets the required word count.",
      "A blogger optimizing an article's length for better reader engagement.",
      "A social media manager checking character limits for a post.",
      "An editor analyzing sentence structure and pacing in a manuscript.",
    ],
    faqs: [
      {
        question: "How are words counted?",
        answer:
          "Words are counted based on spaces and punctuation. Hyphenated words and contractions (like 'don't') are counted as single words for accuracy.",
      },
      {
        question: "What's the difference between character counts?",
        answer:
          "Characters 'with spaces' includes every keystroke, while 'without spaces' measures only the letters and symbols, which is useful for certain SEO analyses.",
      },
      {
        question: "Does it work for other languages?",
        answer:
          "Yes. The tool is built with Unicode support, ensuring accurate counts for languages like Spanish, Chinese, Arabic, and more.",
      },
      {
        question: "How is reading time calculated?",
        answer:
          "It's estimated based on an average reading speed of 200-300 words per minute (WPM), but this can vary depending on the complexity of the text.",
      },
    ],
    underlyingConcept:
      "The tool uses computational linguistics to tokenize and segment text. Words are identified by delimiters, sentences by punctuation patterns, and paragraphs by line breaks. This mirrors the methods used in NLP frameworks, providing insights into text density, structure, and readability.",
  },
  'character-counter': {
    introduction:
      "Stay within the limits. Our Character Counter is a precision tool for anyone who writes for digital platforms. It instantly calculates characters (with and without spaces) and total byte size, making it perfect for crafting social media posts, SMS messages, or API payloads. Ensure your text fits every time, without the guesswork.",

    explanation:
      "This tool counts every character in real-time. For byte size, it encodes your text in UTF-8 to measure the exact storage space required, which is crucial for handling multi-byte characters like emojis and international symbols.",

    usageExamples: [
      "Crafting the perfect tweet that fits within the 280-character limit.",
      "Ensuring an SMS message doesn't get split into multiple texts.",
      "Verifying that an API payload won't exceed data limits.",
      "Checking that a title or caption meets a platform's character requirements.",
    ],

    underlyingConcept:
      "Character counting is more than just counting letters. With UTF-8 encoding, standard ASCII characters use 1 byte, but special characters like emojis can use up to 4 bytes. This tool distinguishes between visual characters and their actual byte size, giving developers and writers the precise information they need.",

    howToUse: [
      "Paste or type your text into the input area.",
      "Instantly see the counts for characters (with and without spaces) and the UTF-8 byte size.",
      "The counts will update in real-time as you edit.",
    ],

    features: [
      "Instant Character Counts: See counts with and without spaces as you type.",
      "Accurate Byte Size: Calculates the UTF-8 byte size for technical precision.",
      "Full Unicode Support: Correctly counts all characters, including emojis and symbols.",
      "Real-Time Feedback: Watch the numbers update instantly as you write.",
      "Essential for Digital Content: Perfect for social media, SMS, and development.",
    ],

    faqs: [
      {
        question: "Why is the byte size different from the character count?",
        answer:
          "Because special characters like emojis (👍) or accented letters (é) require more than one byte of storage in UTF-8 encoding.",
      },
      {
        question: "Does it count spaces?",
        answer:
          "Yes, it provides counts both with and without spaces so you have all the information you need.",
      },
      {
        question: "Is it accurate for all languages?",
        answer:
          "Yes, it fully supports Unicode, ensuring every language is counted correctly.",
      },
    ],

    privacy: PRIVACY_STATEMENT,
  },
  'lorem-ipsum-generator': {
    introduction:
      "Focus on design, not content. Our Lorem Ipsum Generator instantly creates professional placeholder text for your projects. Whether you're a designer crafting a website, a developer building a UI, or a strategist creating a wireframe, this tool provides the perfect filler text to make your layouts look complete. Generate paragraphs, sentences, or words to fit any design.",

    howToUse: [
      "Choose whether you want to generate paragraphs, sentences, or words.",
      "Use the slider to select the amount of text you need.",
      "Click 'Generate' to create your custom placeholder text.",
      "Copy the text with a single click and paste it into your design.",
    ],

    features: [
      "Flexible Generation: Create paragraphs, sentences, or words to fit any layout.",
      "Customizable Length: Easily control the amount of text you generate.",
      "Classic & Random: Uses traditional Latin text for a professional look.",
      "Instant & Easy: Generate and copy text in seconds.",
      "Perfect for Designers: Ideal for Figma, Sketch, Adobe XD, and more.",
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "Lorem Ipsum is the industry standard for placeholder text. It mimics the flow of real language without distracting from the design. Our generator uses a smart algorithm to create natural-looking passages, ensuring your mockups and wireframes look polished and professional.",

    usageExamples: [
      "A web designer testing typography and spacing on a new site.",
      "A UI/UX designer populating a wireframe in Figma or Sketch.",
      "A print designer creating a mockup for a brochure or flyer.",
      "A developer styling a component with realistic-looking text.",
    ],

    faqs: [
      {
        question: "Why use Lorem Ipsum?",
        answer:
          "It allows you and your clients to focus on the design and layout without getting distracted by the actual content.",
      },
      {
        question: "Is this real Latin?",
        answer:
          "It's based on a classical Latin text by Cicero, but it's intentionally scrambled to be nonsensical, which is what makes it great for placeholder text.",
      },
      {
        question: "Can I generate text in other languages?",
        answer:
          "This tool focuses on the classic Latin Lorem Ipsum. For other languages, you can use a translation tool on the generated text.",
      },
      {
        question: "Will this hurt my SEO?",
        answer:
          "No, as long as you replace it with real content before you publish your site. Search engines are smart enough to ignore placeholder text.",
      },
    ],

    underlyingConcept:
      "The generator uses procedural generation to combine words and phrases from a classical Latin text, creating passages that have a natural rhythm and word distribution. This avoids the repetitive look of simple copy-pasted text, making your designs feel more realistic.",
  },
  'text-reverser': {
    introduction:
      "Type, and watch it flip! Our Text Reverser is a simple and fun tool that instantly reverses any text you enter. Whether you're creating a quirky social media post, making a puzzle, or just having fun, this tool flips letters, words, and even emojis in real-time. It's fast, easy, and works with any language.",

    explanation:
      "The tool takes your text, splits it into individual characters, reverses their order, and then joins them back together. It's a classic string manipulation that works seamlessly with all Unicode characters, including emojis.",

    usageExamples: [
      "Creating fun, backwards posts for social media.",
      "Making clues for a puzzle or game.",
      "Testing a string reversal function for a coding interview.",
      "Generating a 'mirror' effect for a design.",
    ],

    underlyingConcept:
      "Text reversal is a fundamental operation in computer science that demonstrates basic array and string manipulation. By iterating through a string from end to beginning, each character is repositioned to create a mirror image of the original text.",

    howToUse: [
      "Type or paste your text into the 'Original Text' box.",
      "The reversed text will appear instantly in the box below.",
      "Copy your new, backwards text with a single click.",
    ],

    features: [
      "Instant Reversal: See your text flip in real-time as you type.",
      "Full Unicode Support: Correctly reverses all characters, symbols, and emojis.",
      "Simple & Fun: Easy to use for creative projects, puzzles, and more.",
      "100% Private: All processing happens in your browser.",
    ],

    faqs: [
      {
        question: "Does it reverse the whole text or just the words?",
        answer:
          "It reverses the entire string, character by character. For example, 'hello world' becomes 'dlrow olleh'.",
      },
      {
        question: "Are emojis reversed correctly?",
        answer:
          "Yes, emojis are treated as single characters and will appear correctly in the reversed text.",
      },
      {
        question: "Can I reverse multiple lines?",
        answer:
          "Yes, the tool will reverse the entire block of text, including line breaks.",
      },
    ],

    privacy: PRIVACY_STATEMENT,
  },
  'markdown-previewer': {
    introduction:
      "Write, preview, and perfect your Markdown in one seamless experience. Our live Markdown Previewer shows you exactly how your text will look as you type. With a side-by-side view of your code and the rendered HTML, it's the perfect tool for developers creating READMEs, bloggers drafting posts, and writers working on documentation. No more switching tabs or guessing formats—just fast, accurate, real-time results.",

    explanation:
      "The tool parses your Markdown syntax on the fly and converts it into clean, standard HTML. It supports all the essentials—headers, lists, code blocks, links, images, and tables—giving you an exact preview of your final document.",

    usageExamples: [
      "A developer drafting a GitHub README and checking the formatting live.",
      "A blogger writing a post and seeing how it will look before publishing.",
      "A technical writer creating documentation with instant visual feedback.",
      "Anyone learning Markdown and wanting to see how the syntax works.",
    ],

    underlyingConcept:
      "Markdown is a lightweight markup language designed for readability. This tool uses a powerful parser to instantly translate your plain text into structured HTML, making it easy to create beautiful, well-formatted web content without writing a single line of HTML.",

    howToUse: [
      "Type your Markdown in the editor on the left.",
      "Watch the live preview appear on the right.",
      "The preview updates automatically as you edit.",
      "Use standard Markdown syntax for headers, lists, code blocks, and more.",
    ],

    features: [
      "Live Side-by-Side Preview: See your changes instantly as you type.",
      "Full Markdown Support: Works with standard and GitHub Flavored Markdown (GFM).",
      "Clean HTML Output: Generates a perfect visual representation of your content.",
      "Fast & Efficient: No delays, no lag. Just smooth, real-time rendering.",
      "Secure & Private: All processing is done in your browser.",
    ],

    faqs: [
      {
        question: "Does it support GitHub Flavored Markdown (GFM)?",
        answer:
          "Yes, it supports GFM features like tables, task lists, and strikethrough.",
      },
      {
        question: "Can I add images?",
        answer:
          "Absolutely. Just use the standard Markdown image syntax: `![alt text](image_url)`.",
      },
      {
        question: "Is the preview safe?",
        answer:
          "Yes, all output is sanitized to prevent security risks like XSS attacks.",
      },
    ],

    privacy: PRIVACY_STATEMENT,
  },
  'base64-converter': {
    introduction:
      "The ultimate Base64 tool for developers. Our free Base64 Converter lets you effortlessly encode text and files into Base64 strings or decode them back to their original form. It's perfect for embedding images in CSS, transmitting data in JSON, or handling file uploads in web applications. Fast, secure, and entirely browser-based—no server uploads required.",
    howToUse: [
      "Choose whether you want to 'Encode' to Base64 or 'Decode' from it.",
      "For text, simply paste your content into the input field.",
      "For files, drag and drop an image, PDF, or any other file.",
      "The tool processes it instantly, and the result appears below.",
      "Copy the output with a single click or download the decoded file.",
    ],
    features: [
      "Encode & Decode: Seamlessly switch between encoding and decoding.",
      "File Support: Works with images, PDFs, and other binary files.",
      "Real-Time Processing: Instant results as you type or upload.",
      "URL-Safe Option: Generate URL-safe Base64 for use in web addresses.",
      "Error Highlighting: Instantly spots and flags invalid Base64 strings.",
      "100% Browser-Based: Your data is never uploaded, ensuring complete privacy.",
    ],
    privacy: PRIVACY_STATEMENT,
    explanation:
      "Base64 is an encoding scheme that converts binary data into a text-based format, making it safe to transmit over protocols that only support plain text (like email or JSON). It works by translating binary data into a 64-character set. Our tool handles this process perfectly, including the necessary padding, so you get a reliable result every time.",
    usageExamples: [
      "Embedding a small icon directly into a CSS file to reduce HTTP requests.",
      "Encoding a JSON object for safe transmission in an API call.",
      "Preparing an image for an inline `src` attribute in HTML.",
      "Decoding a Base64 string from an API response to view the original content.",
    ],
    faqs: [
      {
        question: "What is Base64 used for?",
        answer:
          "It's used to encode binary data (like images) into text so it can be safely sent over text-only systems like email or included in text files like HTML and CSS.",
      },
      {
        question: "Does Base64 make my data smaller?",
        answer:
          "No, it actually increases the size by about 33%. Its purpose is safe transmission, not compression.",
      },
      {
        question: "Is this tool secure?",
        answer:
          "Yes. All encoding and decoding happens locally in your browser. Your data is never sent to our servers.",
      },
      {
        question: "Why did my decoding fail?",
        answer:
          "This usually happens if the text is not a valid Base64 string, has incorrect padding, or contains invalid characters. Our tool will highlight these errors for you.",
      },
    ],
    underlyingConcept:
      "Base64 encoding maps groups of 3 bytes of binary data into 4 characters from a 64-character alphabet. If the data is not a multiple of 3, padding (`=`) is added. This ensures that the binary data can be reliably transmitted through systems designed to handle only text.",
  },
  'url-encoder': {
    introduction:
      "Ensure your URLs are always safe and valid. Our URL Encoder/Decoder makes it easy to convert strings with special characters (like spaces, `&`, or `?`) into a format that can be safely transmitted over the web. It's an essential tool for developers building APIs, marketers creating campaign links, or anyone who needs to handle complex URLs.",
    explanation:
      "URL encoding, also known as percent-encoding, replaces unsafe characters with a `%` followed by their two-digit hex code. This prevents browsers and servers from misinterpreting your URLs. Our tool uses the standard `encodeURIComponent` function for maximum safety and compatibility.",
    usageExamples: [
      "Building a search query with user-generated input.",
      "Creating a link with special characters in the parameters.",
      "Debugging a malformed URL from a server log.",
    ],
    underlyingConcept:
      "Following the RFC 3986 standard, URL encoding ensures that data in a URL is correctly interpreted. Reserved characters (like `?` and `&`) have special meanings, so they and other non-standard characters must be encoded to be treated as literal data.",
    howToUse: [
      "Paste your string or URL into the input box.",
      "Click 'Encode' to convert it into a URL-safe format.",
      "To reverse the process, paste an encoded string and click 'Decode'.",
    ],
    features: [
      "Safe & Reliable: Uses the standard `encodeURIComponent()` function.",
      "Handles All Special Characters: Correctly encodes spaces, symbols, and more.",
      "Instant Results: Real-time encoding and decoding.",
      "Simple Interface: Clean, fast, and easy to use.",
    ],
    faqs: [
      {
        question: "What's the difference between this and `encodeURI`?",
        answer:
          "`encodeURIComponent` is safer because it encodes more characters. It's best for encoding individual URL parameters, while `encodeURI` is for encoding a full URL.",
      },
      {
        question: "How are spaces handled?",
        answer:
          "Spaces are typically converted to `%20` or `+`, depending on the context. Our tool uses `%20` for broad compatibility.",
      },
      {
        question: "Is it safe for full URLs?",
        answer:
          "It's safest to encode only the components of a URL, not the entire thing, as that can break the `http://` part.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'json-formatter': {
    tip: "Paste a messy, single-line JSON response from an API and click 'Format' to make it beautiful and readable in a second!",
    introduction:
      "Tired of trying to read ugly, minified JSON? Our JSON Formatter instantly transforms messy data into a clean, perfectly indented, and human-readable format. It also validates your JSON, pointing out any syntax errors so you can fix them fast. It's an essential tool for any developer working with APIs or configuration files.",
    explanation:
      "The tool first tries to parse your text using `JSON.parse()`. If it's valid JSON, it's then re-formatted with `JSON.stringify()` using indentation to make it 'pretty'. If it's not valid, it catches the error and tells you where to look.",
    usageExamples: [
      "Debugging a JSON response from an API.",
      "Formatting a `.json` configuration file to make it easier to read.",
      "Validating JSON created by a user or another system.",
    ],
    underlyingConcept:
      "JSON (JavaScript Object Notation) is a lightweight data-interchange format. While it's easy for machines to parse, it can be hard for humans to read when it's 'minified' (all on one line). 'Pretty-printing' adds indentation and line breaks to reveal its nested structure.",
    howToUse: [
      "Paste your raw JSON into the input box.",
      "Click the 'Format / Validate' button.",
      "If your JSON is valid, it will be beautifully formatted below.",
      "If there's an error, a helpful message will appear telling you what's wrong.",
    ],
    features: [
      "Pretty-Prints JSON: Turns minified JSON into a readable, indented structure.",
      "Validates Your Code: Instantly checks for syntax errors.",
      "Clear Error Messages: Helps you find and fix problems fast.",
      "Clean Interface: Simple, fast, and easy to use.",
    ],
    faqs: [
      {
        question: "Can it handle large JSON files?",
        answer:
          "Yes, it can handle large amounts of text, though performance may depend on your browser.",
      },
      {
        question: "Does it change the order of the keys?",
        answer:
          "No, the original order of the keys in your objects is preserved.",
      },
      {
        question: "What if my JSON is invalid?",
        answer:
          "The tool will display a descriptive error message, often with a line number, to help you find the mistake.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'regex-tester': {
    introduction:
      "Stop the guesswork and master regular expressions. Our online Regex Tester lets you build and test your patterns in real-time, instantly showing you the matches and capture groups in your text. It's the perfect playground for developers, data analysts, and anyone looking to harness the power of regex for validation, parsing, or data extraction.",
    explanation:
      "The tool creates a JavaScript `RegExp` object from your pattern and flags, then uses it to find all matches in your test string. The results are highlighted instantly, giving you immediate feedback as you type.",
    usageExamples: [
      "Validating an email address or phone number format.",
      "Extracting all the links from a block of HTML.",
      "Building a search-and-replace pattern for your code editor.",
    ],
    underlyingConcept:
      "Regular expressions (regex) are powerful patterns used to match and manipulate text. They are a fundamental tool in programming for tasks like input validation, data scraping, and text processing. This tool provides a safe and easy way to experiment with them.",
    howToUse: [
      "Enter your regex pattern in the 'Regular Expression' field.",
      "Add any flags you need (like `g` for global or `i` for case-insensitive).",
      "Type or paste the text you want to test in the 'Test String' area.",
      "See your matches highlighted instantly in the results panel.",
    ],
    features: [
      "Real-Time Highlighting: Matches and capture groups are highlighted as you type.",
      "Flag Support: Supports all standard JavaScript regex flags (g, i, m, s, etc.).",
      "Detailed Match List: See a clear list of all matches found.",
      "Error Detection: Instantly flags invalid regex patterns.",
    ],
    faqs: [
      {
        question: "What flags are supported?",
        answer:
          "It supports all standard JavaScript flags: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotall), `u` (unicode), and `y` (sticky).",
      },
      {
        question: "Is this specific to JavaScript regex?",
        answer:
          "Yes, this tool uses the JavaScript regex engine, so it's perfect for web developers.",
      },
      {
        question: "Does it show replacements?",
        answer:
          "Currently, it focuses on matching and capturing. A replacement feature may be added in the future.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'uuid-generator': {
    introduction:
      "Generate cryptographically strong, random Version 4 UUIDs (Universally Unique Identifiers) with a single click. This tool is essential for developers and database administrators who need guaranteed unique IDs for records, sessions, or distributed systems. No libraries, no commands—just instant, secure UUIDs.",
    explanation:
      "This tool uses the browser's built-in `crypto.randomUUID()` method, which generates a 128-bit random UUID according to the RFC 4122 standard. This is the most secure and modern way to create UUIDs on the web.",
    usageExamples: [
      "Assigning a unique primary key to a new database record.",
      "Generating a secure session ID for a user.",
      "Creating a unique identifier for a transaction in a distributed system.",
    ],
    underlyingConcept:
      "A Version 4 UUID is a 128-bit number that is generated randomly. The sheer number of possible combinations (2^122) makes the probability of two randomly generated UUIDs being the same virtually zero, making them ideal for decentralized systems.",
    howToUse: [
      "Click the 'Generate UUID' button.",
      "A new, random UUID will appear instantly.",
      "Click the 'Copy' button to copy it to your clipboard.",
    ],
    features: [
      "Cryptographically Strong: Generates secure, random UUIDs (v4).",
      "Browser-Native Security: Uses the Web Crypto API for maximum security.",
      "One-Click Generation: Instantly create and copy a new UUID.",
      "No Collisions: The probability of a duplicate is practically zero.",
    ],
    faqs: [
      {
        question: "Is a v4 UUID truly unique?",
        answer:
          "For all practical purposes, yes. The chance of generating a duplicate is astronomically low.",
      },
      {
        question: "Can I generate more than one?",
        answer:
          "Yes, just keep clicking the 'Generate UUID' button for as many as you need.",
      },
      {
        question: "What about other UUID versions?",
        answer:
          "This tool focuses on Version 4, which is the most common and recommended version for generating random IDs. Other versions, like v1, are based on timestamps.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'hash-generator': {
    introduction:
      "Quickly generate secure cryptographic hashes from any text. Our Hash Generator supports SHA-1, SHA-256, and SHA-512, making it an essential tool for verifying data integrity, creating checksums, or hashing sensitive information. It's fast, secure, and runs entirely in your browser.",
    explanation:
      "The tool takes your text, converts it into bytes, and then uses the browser's native Web Crypto API to generate a secure hash. The result is a fixed-length hexadecimal string that is unique to your input.",
    usageExamples: [
      "Creating a checksum to verify that a file has not been altered.",
      "Hashing a password before storing it in a database.",
      "Generating a unique key from a string of text.",
    ],
    underlyingConcept:
      "A cryptographic hash function is a one-way function that takes an input and produces a fixed-size string of bytes, known as the 'hash'. Good hash functions are designed to be fast, deterministic, and collision-resistant. SHA (Secure Hash Algorithm) is a family of widely-used cryptographic hash functions.",
    howToUse: [
      "Enter the text you want to hash in the input box.",
      "Select the hash algorithm you want to use (SHA-1, SHA-256, or SHA-512).",
      "Click 'Generate' to see the resulting hash in hexadecimal format.",
    ],
    features: [
      "Multiple Algorithms: Supports SHA-1, SHA-256, and SHA-512.",
      "Secure & Private: Uses the browser's Web Crypto API, so your data never leaves your machine.",
      "Instant Results: Generates hashes in real-time.",
      "Easy to Use: A simple interface for quick hash generation.",
    ],
    faqs: [
      {
        question: "Is SHA-1 still secure?",
        answer:
          "SHA-1 is considered insecure and should not be used for security purposes. It's included here for legacy use cases. For new applications, always use SHA-256 or SHA-512.",
      },
      {
        question: "Can this tool hash files?",
        answer:
          "This tool is designed for text only. Hashing large files requires a different approach to read the file in chunks.",
      },
      {
        question: "What does the hexadecimal output mean?",
        answer:
          "It's the standard way of representing the binary hash digest in a human-readable format.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'jwt-debugger': {
    introduction:
      "Demystify your JSON Web Tokens. Our JWT Decoder instantly breaks down a JWT into its header and payload, displaying them in a clean, readable format. It's an essential tool for any developer or security analyst working with token-based authentication. Debug your tokens, inspect claims, and understand your auth flow with ease.",
    explanation:
      "A JWT consists of three parts separated by dots: the header, the payload, and the signature. This tool takes a JWT, Base64-decodes the first two parts, and then pretty-prints the resulting JSON. It does not and cannot verify the signature, as that requires your secret key.",
    usageExamples: [
      "Debugging an authentication token from an API.",
      "Inspecting the claims (like user ID or roles) inside a token.",
      "Verifying the structure of a JWT before implementing it in an application.",
    ],
    underlyingConcept:
      "JWT (JSON Web Token) is a compact, URL-safe standard (RFC 7519) for creating access tokens. The header contains metadata, and the payload contains 'claims' (statements about the user and token). The signature is used to verify that the token has not been tampered with.",
    howToUse: [
      "Paste your JWT into the input field.",
      "The decoded header and payload will appear instantly in separate, readable boxes.",
      "If the token is malformed, an error message will be displayed.",
    ],
    features: [
      "Real-Time Decoding: See the decoded header and payload as you type.",
      "Clear Separation: Displays the header and payload in distinct, easy-to-read panels.",
      "Pretty-Printed JSON: Automatically formats the JSON for readability.",
      "Error Detection: Instantly flags malformed tokens.",
    ],
    faqs: [
      {
        question: "Does this tool verify the signature?",
        answer:
          "No. Signature verification requires a secret key that should never be shared with a third-party tool. This decoder is for inspecting the public parts of the token only.",
      },
      {
        question: "Can it decode encrypted JWTs (JWE)?",
        answer:
          "No, this tool is for standard, Base64-encoded JWTs (JWS), not encrypted ones.",
      },
      {
        question: "What kind of information is in the payload?",
        answer:
          "The payload contains 'claims,' which are statements about the user and the token itself, such as the user's ID, roles, and the token's expiration time (`exp`).",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'diff-checker': {
    introduction:
      "Stop wasting time manually searching for changes. Our Diff Checker instantly compares two blocks of text or code and highlights every difference, line by line. Whether you're reviewing a code change, comparing document versions, or checking for subtle edits, this tool helps you spot every modification in seconds.",
    explanation:
      "The tool uses a powerful diffing algorithm (similar to the one used in Git) to detect insertions, deletions, and modified lines between two texts. It then renders the results in a clean, side-by-side view, with additions highlighted in green and deletions in red.",
    usageExamples: [
      "A developer reviewing code changes before a merge.",
      "A writer comparing two drafts of an article to see what's changed.",
      "An editor checking for revisions in a document.",
    ],
    underlyingConcept:
      "Based on the principles of version control systems, a 'diff' (difference) algorithm calculates the minimal set of edits needed to transform one text into another. This allows for an efficient and accurate representation of changes.",
    howToUse: [
      "Paste the original text into the panel on the left.",
      "Paste the modified text into the panel on the right.",
      "The differences will be highlighted instantly.",
    ],
    features: [
      "Side-by-Side Comparison: A clear, intuitive view of the changes.",
      "Line-by-Line Highlighting: Instantly spot additions (green) and deletions (red).",
      "Real-Time Updates: The diff updates automatically as you edit.",
      "Essential for Collaboration: Perfect for developers, writers, and editors.",
    ],
    faqs: [
      {
        question: "Does it compare word by word?",
        answer:
          "Currently, it highlights differences on a line-by-line basis. Word-level highlighting is a planned future update.",
      },
      {
        question: "Can it handle large files?",
        answer:
          "It's optimized for typical code and text files. Extremely large files may be slower to process depending on your browser.",
      },
      {
        question: "Can I ignore whitespace changes?",
        answer:
          "This feature is not yet available but is on our roadmap for future improvements.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'csv-to-json': {
    introduction:
      "Unlock your data. Our CSV to JSON converter instantly transforms your comma-separated data into a clean, structured JSON array. It's the perfect tool for developers needing to import spreadsheet data into a web application, prepare data for an API, or simply switch between formats. No coding, no hassle—just instant, accurate conversion.",
    explanation:
      "The tool parses your CSV, automatically using the first row as headers for the JSON keys. It correctly handles quoted values and newlines, generating a well-formatted JSON array that's ready to be used in your code.",
    usageExamples: [
      "Importing data from a spreadsheet into a web application.",
      "Converting a database export into a format suitable for an API.",
      "Transforming CSV log files for data analysis.",
    ],
    underlyingConcept:
      "CSV is a tabular data format, while JSON is a hierarchical key-value format. This tool bridges the gap by converting each row of the CSV into a JSON object, with the column headers serving as the keys.",
    howToUse: [
      "Paste your CSV content into the input box.",
      "Click 'Convert' to instantly generate the JSON.",
      "Copy the JSON array or download it as a file.",
    ],
    features: [
      "Instant Conversion: Client-side processing for maximum speed.",
      "Smart Header Detection: Automatically uses the first row as JSON keys.",
      "Handles Standard CSV: Correctly parses quoted values and delimiters.",
      "Pretty-Printed Output: Generates clean, readable JSON.",
    ],
    faqs: [
      {
        question: "What if my CSV doesn't have a header row?",
        answer:
          "The tool will use the first row as headers by default. If you need to handle CSVs without headers, that's a great suggestion for a future feature!",
      },
      {
        question: "Does it handle commas inside quotes?",
        answer:
          "Yes, it correctly parses fields that contain commas, as long as they are properly quoted.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Since the conversion happens in your browser, very large files may be limited by your browser's memory.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'json-to-csv': {
    introduction:
      "Easily transform your JSON data into a CSV file. Our JSON to CSV converter takes a JSON array and instantly turns it into a clean, well-formatted CSV, ready for Excel, Google Sheets, or any data analysis tool. It's the perfect way to export API data or JavaScript objects for reporting and analysis.",
    explanation:
      "The tool automatically detects the keys from the first object in your JSON array to create the CSV headers. It then flattens each object into a row, correctly quoting fields to handle commas and newlines.",
    usageExamples: [
      "Exporting the results of an API call to a CSV for a report.",
      "Converting a JavaScript array of objects into a spreadsheet.",
      "Migrating data from a JSON-based system to a CSV-based one.",
    ],
    underlyingConcept:
      "This tool performs the reverse of a CSV-to-JSON conversion. It takes a hierarchical data format (JSON) and flattens it into a tabular one (CSV), making it compatible with traditional spreadsheet applications.",
    howToUse: [
      "Paste your JSON array into the input box.",
      "The CSV will be generated instantly in the output area.",
      "Copy the CSV or download it as a file.",
    ],
    features: [
      "Automatic Header Detection: Creates CSV headers from the JSON keys.",
      "Smart Formatting: Correctly handles commas and newlines within your data.",
      "Instant Download: Download your CSV file with a single click.",
      "Client-Side & Secure: Your data is never sent to a server.",
    ],
    faqs: [
      {
        question: "What if the objects in my JSON array have different keys?",
        answer:
          "The tool will create a column for every unique key found in the array. If an object doesn't have a particular key, that field will be left empty in the CSV.",
      },
      {
        question: "Does it support nested JSON objects?",
        answer:
          "This tool works best with flat JSON arrays. Nested objects will be represented as `[object Object]`. For complex nested data, you may need to flatten your JSON first.",
      },
      {
        question: "What format is the downloaded file?",
        answer: "A standard, UTF-8 encoded `.csv` file.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'csv-xlsx-converter': {
    introduction:
      "Stop wrestling with incompatible file formats. Our Universal Data Converter is your all-in-one solution for instantly transforming data. Whether you have a CSV from a database export, an Excel sheet from a colleague, or pasted data, you can convert it into JSON for your web app, SQL for your database, an HTML table for a report, or many other formats. It's powerful, fast, and 100% private.",
    howToUse: [
      "Upload a CSV or Excel (.xlsx) file, or paste your raw CSV data into the text area.",
      "The tool instantly processes your input.",
      "Select your desired output format from the list: JSON, SQL, HTML, Markdown, and more.",
      "Configure advanced options if needed (like separators or table names).",
      "Click 'Download' to get your newly converted file.",
    ],
    features: [
      "Multi-Format Support: Convert from CSV or XLSX to JSON, SQL, HTML, Markdown, TSV, vCard, and more.",
      "Two-Way Conversion: Not just from CSV/XLSX, but also enables conversions like JSON to CSV.",
      "Intelligent Parsing: Automatically detects headers and handles various delimiters.",
      "Advanced Options: Fine-tune your output with options for separators, headers, and SQL table names.",
      "100% Browser-Based: Your data is never sent to a server. All conversions happen locally for maximum privacy and speed.",
      "Handles Large Files: Efficiently processes large datasets right in your browser.",
    ],
    explanation:
      "In a data-driven world, information rarely stays in one place or one format. A CSV file is great for spreadsheets, but a web application needs JSON. A data analyst might need SQL `INSERT` statements. This tool acts as a universal translator for your data, bridging the gap between different systems and requirements without needing complex software or command-line scripts.",
    usageExamples: [
      "A developer converting a client's Excel price list into a JSON object for an e-commerce site.",
      "A data analyst transforming a CSV export into SQL `INSERT` statements to populate a database.",
      "A project manager pasting tabular data and converting it to a Markdown table for a GitHub wiki.",
      "An office administrator converting a XLSX contact list into vCards for easy import into a phone.",
    ],
    faqs: [
      {
        question: "What is the largest file size you support?",
        answer:
          "Since all processing happens in your browser, the limit depends on your computer's memory and browser version. It's optimized for typical datasets but may slow down with extremely large files (hundreds of megabytes).",
      },
      {
        question: "Are my files and data secure?",
        answer:
          "Yes. Your data never leaves your computer. All conversions are done locally, ensuring your information remains 100% private.",
      },
      {
        question: "Can I convert from JSON to CSV?",
        answer:
          "This specific tool is optimized for converting *from* tabular data (CSV/XLSX) to other formats. For JSON to CSV, please use our dedicated 'JSON to CSV' converter.",
      },
      {
        question: "Does the tool retain my original file's styling?",
        answer:
          "No. The converter focuses on extracting and transforming the raw data. It does not preserve any styling, formulas, or formatting from Excel files.",
      },
    ],
    underlyingConcept:
      "This tool leverages powerful JavaScript libraries like SheetJS (for XLSX parsing) and custom data-structure mapping to transform data. It first converts any input into a standardized internal representation (an array of objects), and then serializes that representation into the target output format, whether it's a structured language like SQL or a markup format like HTML.",
    privacy: PRIVACY_STATEMENT,
  },
  'image-to-base64': {
    tip: "Base64 is perfect for inlining small icons in CSS. It reduces HTTP requests, which can make your website load faster!",
    introduction:
      "Tired of managing countless small image files? Our Image to Base64 converter transforms any image into a single line of text that you can embed directly in your code. This is the secret to faster-loading websites, cleaner code, and easier-to-manage assets. Perfect for developers who want to inline small icons, logos, or background images.",
    explanation:
      "This tool reads your image file and uses the browser's FileReader API to create a Data URL. This URL includes the Base64-encoded version of your image, which can be used directly in web pages.",
    usageExamples: [
      "Embedding a logo directly into an email signature.",
      "Inlining small icons in a CSS file to reduce server requests.",
      "Storing image data within a JSON file for a web application.",
    ],
    underlyingConcept:
      "Data URLs (defined in RFC 2397) allow content to be embedded in web pages as if they were external resources. Base64 is the encoding scheme used to convert the binary image data into a text format that can be included in the URL.",
    howToUse: [
      "Drag and drop your image or click to upload.",
      "Instantly see a preview of your image on the left.",
      "The Base64 data URL will be generated automatically on the right.",
      "Click 'Copy' to grab the entire string and paste it into your HTML or CSS.",
    ],
    features: [
      "Supports All Major Formats: Works with PNG, JPEG, GIF, SVG, and more.",
      "Instant Preview: See your uploaded image immediately.",
      "Ready-to-Use Output: Generates a complete data URL for `src` attributes or CSS `url()`.",
      "Improves Performance: Reduces HTTP requests by inlining small images.",
      "100% Secure & Private: All conversions happen in your browser. Your images are never uploaded.",
    ],
    faqs: [
      {
        question: "Why should I use Data URLs?",
        answer:
          "They are great for small images because they eliminate the need for an extra server request, which can speed up page load times.",
      },
      {
        question: "Does this increase the file size?",
        answer:
          "Yes, Base64 encoding increases the size of the data by about 33%. It's best used for small images where the overhead is less than the cost of an HTTP request.",
      },
      {
        question: "Is it supported in all browsers?",
        answer: "Yes, Data URLs are supported by all modern web browsers.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'base64-to-image': {
    introduction:
      "Found a Base64 string embedded in code and wondering what it is? Our Base64 to Image converter instantly decodes it, revealing the hidden image. Preview the image directly in your browser and download it as a standard file. It's the perfect tool for extracting embedded assets from CSS, HTML, or API responses.",
    explanation:
      "The tool takes your Base64 Data URL and sets it as the `src` of an image element to generate a preview. It then creates a 'blob' from the data, which allows you to download it as a file.",
    usageExamples: [
      "Extracting an embedded image from a CSS file.",
      "Downloading an image from an email signature.",
      "Converting a Base64 image from an API response into a file.",
    ],
    underlyingConcept:
      "This tool performs the reverse of Base64 encoding. It parses the MIME type and Base64 data from the Data URL, converts the Base64 text back into binary data, and then renders that data as an image.",
    howToUse: [
      "Paste your Base64 data URL (it should start with `data:image/...`).",
      "The image will instantly appear in the preview box.",
      "Click the 'Download Image' button to save it to your device.",
    ],
    features: [
      "Instant Decoding: Renders an image preview from any valid Base64 string.",
      "Easy Download: Save the decoded image as a standard file (e.g., PNG, JPG).",
      "Smart Validation: Automatically detects if the string is a valid image data URL.",
      "Developer's Companion: An essential tool for working with APIs and web assets.",
    ],
    faqs: [
      {
        question: "What formats can it decode?",
        answer:
          "It can decode any image format that can be represented in a Data URL, like PNG, JPEG, GIF, or SVG.",
      },
      {
        question: "What if the string is invalid?",
        answer:
          "The tool will show an error message if the text you paste is not a valid image Data URL.",
      },
      {
        question: "What will the downloaded file be named?",
        answer:
          "It will be given a generic name like 'download.png'. You can rename it after you save it.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'box-shadow-generator': {
    introduction:
      "Stop guessing your CSS shadows and start designing them. Our visual Box Shadow Generator gives you an interactive playground to create the perfect shadow effect. Use simple sliders and color pickers to design complex, layered shadows, and get the production-ready CSS code instantly. It's the fastest way to add depth and polish to your UI.",
    explanation:
      "The tool dynamically builds a CSS `box-shadow` string by combining your inputs for horizontal/vertical offset, blur radius, spread radius, and color. This string is applied to a preview element in real-time, giving you instant feedback.",
    usageExamples: [
      "Designing modern, layered cards for a user interface.",
      "Adding a subtle, realistic depth to buttons and interactive elements.",
      "Creating trendy 'neumorphic' (soft UI) effects.",
    ],
    underlyingConcept:
      "The `box-shadow` CSS property is a powerful tool for creating depth in 2D. It allows you to apply one or more shadows to an element, each with its own position, blur, spread, and color. This generator simplifies the process of creating those layers.",
    howToUse: [
      "Use the sliders to adjust the Horizontal and Vertical Offsets.",
      "Control the softness of the shadow with the Blur slider.",
      "Increase or decrease the size of the shadow with the Spread slider.",
      "Choose a shadow color and adjust its opacity.",
      "Toggle 'Inset' to create an inner shadow for a 'pressed-in' effect.",
      "Copy the generated CSS code with a single click.",
    ],
    features: [
      "Live Visual Preview: See your shadow update in real-time.",
      "Full Control: Adjust offset, blur, spread, color, and opacity.",
      "Inset & Outset: Easily switch between inner and outer shadows.",
      "One-Click Copy: Grab the generated CSS rule instantly.",
    ],
    faqs: [
      {
        question: "Can I create multiple shadows on one element?",
        answer:
          "This version focuses on creating a single, perfect shadow layer. The ability to stack multiple shadows is planned for a future update.",
      },
      {
        question: "What units are used?",
        answer:
          "The generator uses pixels (`px`) for all length values, which is the most common unit for box shadows.",
      },
      {
        question: "Is this compatible with all browsers?",
        answer:
          "Yes, the `box-shadow` property is a standard part of CSS3 and is supported by all modern browsers.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'css-gradient-generator': {
    introduction:
      "Unleash your creativity with our intuitive CSS Gradient Generator. Effortlessly design stunning, professional-grade gradients for any project. Our visual editor provides a seamless experience, allowing you to choose from a vibrant spectrum of colors, fine-tune angles, and instantly switch between linear and radial styles. Whether you're crafting eye-catching backgrounds, creating dynamic buttons, or building breathtaking hero sections, our tool is the perfect companion for modern web design.",
    explanation:
      "Our CSS Gradient Generator simplifies the gradient creation process by providing a powerful and interactive interface. As you select and adjust colors, angles, and positions, the tool dynamically generates the corresponding CSS code in real-time. This immediate feedback loop allows you to experiment and iterate quickly, ensuring you achieve the perfect look for your design. The generator handles all the complex syntax, so you can focus on the creative aspect of your work.",
    usageExamples: [
      "Designing a vibrant, multi-toned background for a landing page to capture visitor attention.",
      "Creating subtle gradients for UI elements like cards and buttons to add depth and a modern feel.",
      "Building a dramatic, full-screen hero image with a gradient overlay for a powerful visual impact.",
      "Generating a consistent set of gradients for a design system or brand style guide.",
      "Experimenting with different color combinations and gradient types for design inspiration.",
    ],
    underlyingConcept:
      "CSS gradients are a powerful feature of modern web design, allowing for smooth and dynamic color transitions without the need for image files. Linear gradients progress along a straight line, which can be oriented at any angle. Radial gradients, on the other hand, emanate from a single point, creating circular or elliptical color spreads. Our tool leverages these native CSS capabilities to provide a flexible and powerful way to create a wide range of visual effects.",
    howToUse: [
      "Choose between Linear or Radial gradient type.",
      "For linear gradients, adjust the angle using the slider.",
      "For radial gradients, select the shape and position from the dropdowns.",
      "Click on the color stops to change colors.",
      'Click the "+" icon between color stops to add a new color.',
      "Adjust the position of each color stop with the slider.",
      "Use the presets for quick inspiration.",
      "Copy the generated CSS code from the output box.",
    ],
    features: [
      "Linear & Radial Gradients: Switch between gradient types with one click.",
      "Multi-Color Support: Add as many color stops as you need to create complex gradients.",
      "Full Control: Adjust angles, positions, and shapes for precise results.",
      "Live Preview: See your gradient come to life as you design it.",
      "Inspiring Presets: Get started quickly with a variety of pre-made gradients.",
      "Instant Code: Copy the generated CSS with a single click.",
    ],
    faqs: [
      {
        question: "How do I use the generated code?",
        answer:
          "Simply copy the code and apply it to the `background` or `background-image` property of any HTML element in your CSS.",
      },
      {
        question:
          "What's the difference between linear and radial gradients?",
        answer:
          "A linear gradient transitions colors along a straight line (at any angle). A radial gradient transitions colors outwards from a central point in a circle or ellipse.",
      },
      {
        question: "Can I animate these gradients?",
        answer:
          "While you can't directly animate the `background-gradient` property, a common technique is to create a larger gradient and animate its `background-position`. Our tool is a great starting point for creating the gradient you'll use in such an animation.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'border-radius-generator': {
    introduction:
      "Go beyond simple rounded corners. Our Border Radius Generator gives you precise, individual control over each corner of an element, allowing you to create everything from subtle curves to unique, organic shapes. It's the perfect tool for designing modern cards, buttons, and other UI elements.",
    explanation:
      "The tool maps the slider values to the `border-radius` CSS property. When you control the corners individually, it uses the long-form syntax (`border-top-left-radius`, etc.) to give you granular control.",
    usageExamples: [
      "Designing modern, friendly-looking cards and containers.",
      "Creating pill-shaped buttons and tags.",
      "Building organic, 'blob'-like shapes for visual interest.",
    ],
    underlyingConcept:
      "The `border-radius` property in CSS can accept one, two, three, or four values to control the rounding of the top-left, top-right, bottom-right, and bottom-left corners respectively. This tool provides a visual interface for that control.",
    howToUse: [
      "Use the 'All Corners' slider for a uniform radius.",
      "Uncheck 'Link all corners' to control each corner individually.",
      "Switch between `px` and `%` units for different effects.",
      "Watch the live preview update as you adjust the sliders.",
      "Copy the generated CSS code with one click.",
    ],
    features: [
      "Individual Corner Control: Fine-tune each corner separately.",
      "Uniform Radius Option: Link all corners for quick, uniform rounding.",
      "Pixel & Percent Units: Switch between absolute and relative units.",
      "Real-Time Visual Preview: See your shape come to life instantly.",
      "Instant Code: Get clean, production-ready CSS.",
    ],
    faqs: [
      {
        question: "Can I create a circle?",
        answer:
          "Yes! Just set the `border-radius` to `50%` on a square element.",
      },
      {
        question: "How do I make a pill shape?",
        answer:
          "Use a large radius value (like 9999px) on a rectangular element.",
      },
      {
        question: "Is this performant?",
        answer:
          "Yes, `border-radius` is a highly optimized CSS property and is very performant.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'text-shadow-generator': {
    introduction:
      "Make your text pop. Our Text Shadow Generator lets you visually design the perfect shadow effect for your typography. Control the position, blur, color, and opacity to create everything from subtle, readable depth to dramatic, glowing effects. It's the easiest way to add a professional touch to your headings and titles.",
    explanation:
      "The tool combines your inputs for X/Y offsets, blur radius, and color into a valid CSS `text-shadow` property. The preview text is updated in real-time, giving you instant feedback on your design.",
    usageExamples: [
      "Adding a subtle drop shadow to a heading to make it stand out from the background.",
      "Creating a 'glowing' text effect with a blurred, colored shadow.",
      "Designing a retro, 3D text effect with a hard, offset shadow.",
    ],
    underlyingConcept:
      "The `text-shadow` CSS property applies a shadow directly to the text characters of an element. It's defined by a horizontal offset, a vertical offset, an optional blur radius, and a color.",
    howToUse: [
      "Adjust the horizontal and vertical offset sliders to position the shadow.",
      "Use the blur radius slider to control the softness of the shadow.",
      "Choose a shadow color and set its opacity.",
      "Customize the text and background colors to match your design.",
      "Copy the generated CSS code with a single click.",
    ],
    features: [
      "Precise Control: Fine-tune the shadow's position and blur.",
      "Color & Opacity: Use any color and control its transparency.",
      "Customizable Preview: See how the shadow looks on your text and background colors.",
      "Real-Time Feedback: Watch the preview update instantly.",
      "Instant Code: Get a clean CSS rule ready to paste into your project.",
    ],
    faqs: [
      {
        question: "Can I create multiple shadows?",
        answer:
          "This version focuses on creating a single shadow layer. The ability to stack multiple shadows (by separating them with commas) is planned for a future update.",
      },
      {
        question: "Is this supported by all browsers?",
        answer:
          "Yes, `text-shadow` is a standard CSS property with excellent support across all modern browsers.",
      },
      {
        question: "Is this performant?",
        answer:
          "Yes, `text-shadow` is highly optimized by modern browsers and is very performant.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'glassmorphism-generator': {
    introduction:
      "Step into the future of UI design. Our generator makes it easy to create two of the most popular modern design trends: Glassmorphism (a frosted-glass effect) and Neumorphism (a soft, extruded plastic look). Use our simple controls to design beautiful, contemporary UI elements and get the CSS code in seconds.",
    explanation:
      "Glassmorphism is achieved using the `backdrop-filter` property to blur the background, combined with transparency. Neumorphism uses a clever combination of two `box-shadow` values (one light, one dark) to create the illusion of a soft, extruded surface.",
    usageExamples: [
      "Designing a sleek, frosted-glass navigation bar or sidebar.",
      "Creating a modern dashboard with glassmorphic cards.",
      "Building a soft, tactile interface with neumorphic buttons and controls.",
    ],
    underlyingConcept:
      "Glassmorphism creates a sense of depth and hierarchy by mimicking frosted glass. Neumorphism (or 'soft UI') aims for a more realistic, physical look by playing with light and shadow to make elements appear as if they are part of the background.",
    howToUse: [
      "Choose between the 'Glassmorphism' or 'Neumorphism' style.",
      "For Glassmorphism, adjust the blur and opacity to get the perfect frosted look.",
      "For Neumorphism, pick a background color and then fine-tune the shadow properties.",
      "Watch the live preview update in real-time.",
      "Copy the generated CSS code with a single click.",
    ],
    features: [
      "Two Modern Styles: Create both Glassmorphism and Neumorphism effects.",
      "Full Control: Adjust all the necessary parameters for each style.",
      "Live Visual Preview: See your design on a sample background.",
      "Instant Code: Get clean, production-ready CSS.",
      "Helpful Tips: Includes guidance on how to best use these effects.",
    ],
    faqs: [
      {
        question: "Is Glassmorphism supported everywhere?",
        answer:
          "The `backdrop-filter` property is supported by all modern browsers, but not by Internet Explorer. It's a good idea to provide a fallback background color.",
      },
      {
        question: "Is Neumorphism accessible?",
        answer:
          "It can be challenging. Because it relies on subtle shadows, it's crucial to ensure you have enough contrast for your text and borders to be readable for everyone.",
      },
      {
        question: "Is this performant?",
        answer:
          "The `backdrop-filter` used in Glassmorphism can be resource-intensive. Use it sparingly for the best performance. Neumorphism is generally very performant.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'color-palette-generator': {
    introduction:
      "Find the perfect color scheme in seconds. Our Color Palette Generator takes your base color and instantly creates a harmonious palette based on classic color theory. Whether you need a subtle monochromatic look or a bold complementary scheme, this tool provides the inspiration you need for your next design project.",
    explanation:
      "The tool uses the HSL (Hue, Saturation, Lightness) color model. Based on the scheme you choose, it calculates new colors by adjusting the hue, saturation, or lightness of your base color. For example, a complementary color is found by rotating the hue by 180 degrees.",
    usageExamples: [
      "A designer creating a color scheme for a new website.",
      "A marketer developing a consistent color palette for a brand.",
      "An artist looking for inspiration for a new piece.",
    ],
    underlyingConcept:
      "Color theory provides a set of guidelines for creating harmonious color combinations. Schemes like 'analogous' (colors next to each other on the color wheel) and 'complementary' (colors opposite each other) are proven to be aesthetically pleasing.",
    howToUse: [
      "Pick your starting color using the color picker or by entering a HEX code.",
      "Choose the type of color scheme you want from the dropdown menu.",
      "The tool will instantly generate a 5-color palette.",
      "Click on any color's HEX code to copy it to your clipboard.",
    ],
    features: [
      "Multiple Schemes: Generates Monochromatic, Analogous, Complementary, and Triadic palettes.",
      "Custom Base Color: Start from any color you like.",
      "Visual Preview: See your generated color scheme instantly.",
      "One-Click Copy: Easily copy the HEX codes for use in your designs.",
    ],
    faqs: [
      {
        question: "Can I get more than 5 colors?",
        answer:
          "This version generates a standard 5-color palette. The ability to customize the number of colors is planned for a future update.",
      },
      {
        question: "Does this check for accessibility?",
        answer:
          "No, this tool focuses on creating harmonious color schemes. You should always use a separate contrast checker to ensure your text is readable.",
      },
      {
        question: "Can I export the palette?",
        answer:
          "Currently, you can copy the individual HEX codes. A full palette export feature may be added in the future.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'color-theme-wheel': {
    introduction:
      "Visually design your next color palette with our interactive Color Wheel. Drag the picker to find your perfect base color, then choose from a variety of classic color harmony rules—like complementary, triadic, or analogous—to instantly generate a full theme. It's the most intuitive way to create beautiful, balanced color schemes for your UI, brand, or artwork.",
    howToUse: [
      "Drag the picker on the color wheel to select your base hue and saturation.",
      "Use the Lightness slider to fine-tune the brightness.",
      "Select a color harmony rule (like 'Triad' or 'Analogous') from the dropdown.",
      "Your full color palette will be generated instantly.",
      "Copy individual HEX codes, or export the entire palette as CSS variables or JSON.",
    ],
    features: [
      "Interactive Color Wheel: An intuitive way to explore hues and saturation.",
      "Classic Color Harmonies: Generate palettes with Monochromatic, Analogous, Complementary, Triadic, and more.",
      "Live Swatch Preview: See your full color palette update in real-time.",
      "Export for Devs: One-click export to CSS variables or JSON for easy integration.",
      "100% Private: All calculations happen in your browser.",
    ],
    privacy: PRIVACY_STATEMENT,
    explanation:
      "The tool maps the position of the picker on the wheel to HSL (Hue, Saturation, Lightness) values. The angle corresponds to the hue (0-360°), and the distance from the center corresponds to the saturation (0-100%). The different color harmony rules are then applied by mathematically rotating the hue on the wheel.",
    usageExamples: [
      "A UI designer building a theme for a new app by starting with a brand color and finding complementary accents.",
      "A developer exporting a full color palette as CSS variables to quickly theme a website.",
      "An artist exploring triadic color schemes for a new illustration.",
    ],
    underlyingConcept:
      "Color harmony is based on the idea that certain combinations of colors, based on their position on a color wheel, are inherently pleasing. This tool automates the mathematical relationships (like 180° for complementary colors) to make applying color theory simple and fast.",
    faqs: [
      {
        question: "Can I save my palettes?",
        answer:
          "Currently, you can export the palette as code. A feature to save palettes to your account may be added in the future.",
      },
      {
        question: "Does this support transparency (alpha)?",
        answer:
          "This tool focuses on generating solid colors. For transparency, you can use our Color Code Converter to add an alpha channel to your chosen HEX codes.",
      },
      {
        question: "Is the color wheel perceptually uniform?",
        answer:
          "No, it uses the standard HSL color model, which is great for intuitive design but is not perceptually uniform (meaning changes in value don't always correspond to how we perceive changes in brightness).",
      },
    ],
  },
  'css-color-code-converter': {
    introduction:
      "Stop juggling different color formats. Our CSS Color Code Converter is the only tool you need to instantly translate any color between HEX, RGB, and HSL. It fully supports alpha channels (transparency) and even recognizes CSS color names. It's the perfect companion for any developer or designer working on the web.",
    howToUse: [
      "Enter a color in any of the formats (HEX, RGB, or HSL).",
      "All other formats will update instantly in real-time.",
      "Use the alpha slider to adjust the transparency.",
      "You can also type a CSS color name (like 'tomato') and click 'Resolve'.",
      "Click the 'Copy' button next to any format to grab the code.",
    ],
    features: [
      "Two-Way Sync: Edit any format, and all others update instantly.",
      "Full Alpha Support: Works with HEXA, RGBA, and HSLA for transparency.",
      "CSS Color Name Resolver: Converts names like 'rebeccapurple' to their codes.",
      "Live Preview: See your color with its current transparency.",
      "Error-Proof: Validates your input and provides clear error messages.",
    ],
    privacy: PRIVACY_STATEMENT,
    explanation:
      "The converter takes your input, normalizes it into an RGBA (Red, Green, Blue, Alpha) format, and then uses standard color space formulas to calculate the equivalent values for HEX, HSL, and other formats. For CSS color names, it cleverly uses the browser to compute the exact RGB value.",
    usageExamples: [
      "A developer converting a HEX color from a design file into RGBA to add transparency.",
      "A designer taking an HSL color and converting it to HEX for use in a style guide.",
      "Quickly finding the HEX code for a standard CSS color name like 'cornflowerblue'.",
    ],
    underlyingConcept:
      "RGB, HSL, and HEX are different ways to represent colors in a digital space. RGB is based on mixing red, green, and blue light. HSL is a more intuitive model based on hue, saturation, and lightness. HEX is just a compact, hexadecimal representation of RGB. This tool provides the math to switch between them.",
    faqs: [
      {
        question: "Does it support short HEX codes like #F0C?",
        answer:
          "Yes, it supports 3-digit (e.g., #F0C) and 4-digit (e.g., #F0C8) shorthand HEX codes and will convert them correctly.",
      },
      {
        question: "What are CSS color keywords?",
        answer:
          "They are a set of 140+ standard color names (like 'tomato', 'skyblue', 'gold') that are built into CSS. Our tool can convert these names to their corresponding codes.",
      },
      {
        question: "Is my data private?",
        answer:
          "Yes, all conversions happen locally in your browser. No data is ever sent to a server.",
      },
    ],
  },
  'video-compressor': {
    introduction: "Compress video files easily.",
    howToUse: ["Upload video", "Click compress", "Download"],
    features: ["Reduce video file size without significant quality loss.", "Adjust compression level.", "Preview compressed video before downloading."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Video Compressor tool efficiently reduces the file size of video clips while striving to maintain visual quality. This is crucial for optimizing videos for web upload, email attachments, or saving storage space. By adjusting various compression parameters, users can achieve a balance between file size and acceptable quality for their specific needs, making videos easier to share and distribute.",
    usageExamples: [
      "Compressing large video files for faster uploading to YouTube, Vimeo, or social media platforms.",
      "Reducing the size of video attachments to send via email without exceeding limits.",
      "Optimizing video content for mobile viewing, ensuring quick loading times on slower connections.",
      "Saving disk space on devices by compressing stored video collections."
    ],
    underlyingConcept: "Video compression works by removing redundant information from the video stream. This can involve spatial redundancy (pixels that are identical or very similar within a single frame), temporal redundancy (pixels that remain the same across consecutive frames), and psycho-visual redundancy (information that the human eye is less likely to perceive). Common compression algorithms (codecs) like H.264 or H.265 are employed, often by re-encoding the video with a lower bitrate or by adjusting resolution, frame rate, and other parameters that directly impact file size and perceived quality.",
    faqs: [
      {
        "question": "How can I reduce the size of a video file for free?",
        "answer": "Our online video compressor allows you to upload your video, adjust the compression level, and download the smaller file. It's a simple way to shrink video files for easier sharing and storage."
      },
      {
        "question": "Will compressing a video lower its quality?",
        "answer": "Compression always involves a trade-off between file size and quality. Our tool is designed to minimize visible quality loss, and you can control the level of compression to find the right balance."
      },
      {
        "question": "Is my video uploaded to a server?",
        "answer": "No. All video compression is handled securely in your browser. Your files are never sent to our servers, ensuring your data remains private."
      }
    ],
  },
  'video-to-audio-converter': {
    introduction: "Convert video to audio.",
    howToUse: ["Upload video", "Convert", "Download MP3"],
    features: ["Extract audio tracks from video files as MP3.", "High-quality audio extraction.", "Supports various video formats."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Video to Audio Converter is a utility that extracts the audio track from a video file and converts it into a standalone audio format, typically MP3. This is highly useful for users who need only the sound portion of a video, such as for podcasts, background music, or speech analysis, without the visual component. The conversion happens client-side, ensuring privacy.",
    usageExamples: [
      "Extracting audio from a music video to create an MP3 for listening on a portable device.",
      "Converting a lecture or presentation video into an audio-only format for easier note-taking or listening on the go.",
      "Creating audio snippets from longer video clips for use in podcasts or multimedia projects.",
      "Saving storage space by keeping only the audio part of a video recording."
    ],
    underlyingConcept: "Video files contain both a video stream (visual data) and one or more audio streams (sound data), multiplexed together. This tool demultiplexes (separates) these streams, discards the video stream, and then transcodes (converts) the extracted audio stream into a desired audio format like MP3. Modern web browsers support the WebCodecs API or similar technologies which enable efficient client-side media processing for this type of conversion.",
    faqs: [
      {
        "question": "How do I convert a video to an MP3 file?",
        "answer": "Simply upload your video file, and our tool will automatically extract the audio track and convert it into a high-quality MP3 file that you can download."
      },
      {
        "question": "What video formats are supported?",
        "answer": "Our converter supports a wide range of popular video formats, so you can easily turn your MP4, MOV, AVI, and other video files into audio."
      },
      {
        "question": "Is this service free and private?",
        "answer": "Yes, it's completely free. All processing is done in your browser, meaning your video files are never uploaded to our servers, ensuring your privacy."
      }
    ],
  },
  'gif-maker': {
    introduction: "Create GIFs from video.",
    howToUse: ["Upload video", "Create GIF", "Download"],
    features: ["Convert video clips into animated GIFs.", "Set GIF duration and frame rate.", "High-quality GIF output."],
    privacy: PRIVACY_STATEMENT,
    explanation: "",
    usageExamples: [],
    underlyingConcept: "",
    faqs: [
      {
        "question": "How do I make a GIF from a video?",
        "answer": "Upload your video clip, select the start and end times for the GIF, and our tool will generate a high-quality animated GIF for you to download."
      },
      {
        "question": "Can I control the quality and size of the GIF?",
        "answer": "Yes, you can adjust the frame rate and resolution to balance the GIF's quality and file size. A higher frame rate will result in a smoother animation but a larger file."
      },
      {
        "question": "Is it free to create GIFs with this tool?",
        "answer": "Yes, our GIF maker is completely free to use. All processing is done in your browser, so your files remain private."
      }
    ],
  },
  'trim-video': {
    introduction: "Trim video clips.",
    howToUse: ["Upload video", "Set start/end", "Trim"],
    features: ["Cut and trim video files to desired length.", "Easy-to-use timeline for trimming.", "Preview trimmed video before downloading."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Trim Video tool allows users to precisely cut and shorten video clips to their desired length. This is invaluable for editing out unwanted sections, extracting specific highlights, or preparing videos for platforms with duration limits. By providing an intuitive interface to set start and end points, the tool simplifies video editing without requiring complex software.",
    usageExamples: [
      "Trimming the beginning or end of a home video to remove irrelevant footage.",
      "Extracting a short, impactful clip from a longer recording for social media sharing.",
      "Shortening a presentation video to focus on key segments.",
      "Preparing video testimonials or highlights within specific time constraints."
    ],
    underlyingConcept: "Video trimming fundamentally involves selecting a start and end timestamp within a video file and then creating a new video that only contains the frames between those two points. For client-side tools, this process often leverages web APIs such as the HTML5 `video` element and Canvas for frame manipulation, or more advanced libraries that can re-encode segments of the video. The goal is to perform this operation without re-encoding the entire video, which preserves quality and speeds up processing, only re-encoding the cut points if necessary.",
    faqs: [
      {
        "question": "How can I trim a video online for free?",
        "answer": "Our video trimmer allows you to upload your video, select the start and end points on a timeline, and cut the video to the desired length. You can then download the trimmed clip."
      },
      {
        "question": "Will trimming a video affect its quality?",
        "answer": "No, trimming a video with our tool does not re-encode it, so the quality of the trimmed portion remains the same as the original video."
      },
      {
        "question": "Are my video files secure?",
        "answer": "Yes, we prioritize your privacy. All video processing is done directly in your browser, and your files are never uploaded to our servers."
      }
    ],
  },
  'format-converter': {
    introduction: "Convert video formats.",
    howToUse: ["Upload video", "Select format", "Convert"],
    features: ["Convert videos between different formats like MP4, AVI, MOV.", "High-speed conversion.", "Supports a wide range of video formats."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Video Format Converter is a versatile tool that enables users to effortlessly change video files from one format to another (e.g., MP4 to AVI, MOV to WebM). This is essential for ensuring compatibility across various devices, media players, and online platforms, as different systems often support a limited range of video codecs and containers. The tool simplifies the transcoding process, making videos accessible wherever they need to be.",
    usageExamples: [
      "Converting a video to MP4 for universal compatibility across most devices and web browsers.",
      "Changing a video's format to meet specific upload requirements for social media platforms or video hosting sites.",
      "Transcoding older video formats (like AVI) into more modern and efficient ones (like WebM) to save storage space.",
      "Preparing video content for specialized editing software that requires a particular input format."
    ],
    underlyingConcept: "Video conversion (transcoding) involves decoding the original video file, which breaks it down into raw audio and video streams, and then re-encoding these streams into the new target format's specified codecs and container. This process can be computationally intensive but allows for significant flexibility in video usage. Client-side tools leverage browser APIs and JavaScript libraries (often WebAssembly-powered for performance) to perform this decoding and re-encoding without uploading the video to a server, ensuring user privacy and faster processing for smaller files.",
    faqs: [
      {
        "question": "How can I convert a video from one format to another?",
        "answer": "Our online video converter allows you to upload a video, select a new format (like MP4, AVI, or MOV), and convert it. You can then download the video in the new format."
      },
      {
        "question": "Will converting the video reduce its quality?",
        "answer": "The quality of the converted video depends on the format you choose. Our tool aims to provide the best possible quality for the selected format."
      },
      {
        "question": "Is this video converter free to use?",
        "answer": "Yes, you can convert your videos for free. All conversions happen in your browser, ensuring your files remain private and secure."
      }
    ],
  },
  'video-thumbnail-extractor': {
    introduction: "Extract thumbnails from video.",
    howToUse: ["Upload video", "Set time", "Extract"],
    features: ["Extract image thumbnails from specific timestamps in a video.", "Select thumbnail size.", "Download thumbnail as a PNG image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Video Thumbnail Extractor allows users to capture high-quality still images (thumbnails) from any point within a video file. This is particularly useful for creating preview images for video content, generating custom social media assets, or simply extracting memorable frames without needing to play through the entire video or use complex editing software.",
    usageExamples: [
      "Creating compelling thumbnail images for YouTube videos or other video hosting platforms to attract viewers.",
      "Extracting key frames from a tutorial or presentation video for use in documentation or slide decks.",
      "Generating custom preview images for video content shared on social media platforms.",
      "Saving a favorite moment from a home video as a high-resolution still image."
    ],
    underlyingConcept: "Video files are composed of a sequence of individual frames. This tool leverages browser APIs (like the HTML5 `video` element and Canvas) to load the video, seek to a specific timestamp, and then draw that precise video frame onto a hidden canvas element. The content of this canvas is then converted into an image file (e.g., PNG), which can be downloaded by the user. All processing occurs client-side, ensuring user privacy and fast extraction.",
    faqs: [
      {
        "question": "How can I get a thumbnail from a video?",
        "answer": "Upload your video, pause it at the frame you want to capture, and click the 'Extract' button. Our tool will generate a high-quality PNG thumbnail for you to download."
      },
      {
        "question": "Can I choose the size of the thumbnail?",
        "answer": "Yes, you can select from various thumbnail sizes before extracting the image to fit your needs."
      },
      {
        "question": "Is this tool free and private?",
        "answer": "Absolutely. The tool is free to use, and all processing happens in your browser. Your videos are never uploaded to our servers."
      }
    ],
  },
  'video-mute': {
    introduction: "Remove audio from video.",
    howToUse: ["Upload video", "Mute", "Download"],
    features: ["Remove audio track from a video file.", "Supports various video formats.", "Download muted video with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Mute Video tool provides a simple and efficient way to remove the audio track from any video file. This is particularly useful when the video's sound is unnecessary, distracting, or needs to be replaced with new audio. By stripping out the audio, the tool can also slightly reduce the overall file size, making the video more suitable for specific sharing or playback contexts.",
    usageExamples: [
      "Creating silent video loops for background elements on a website.",
      "Removing unwanted background noise or conversations from recorded footage.",
      "Preparing a video to have a new voiceover or music track added.",
      "Sharing sensitive video content without compromising privacy through accompanying audio."
    ],
    underlyingConcept: "Video files typically contain separate streams for video (visual data) and audio (sound data). When a video is muted, the tool doesn't re-encode the entire video; instead, it either removes the audio stream entirely or sets its volume to zero during the transcoding process. This ensures that the visual quality of the video remains unaffected while achieving the desired silent output. Client-side processing ensures user privacy.",
    faqs: [
      {
        "question": "How can I remove the audio from a video?",
        "answer": "Upload your video, and our tool will process it to remove the audio track completely. You can then download the silent video."
      },
      {
        "question": "Does muting a video change its quality or format?",
        "answer": "No, the video quality and format will remain the same. The tool only removes the audio stream, leaving the video track untouched."
      },
      {
        "question": "Is it safe to use this tool with my videos?",
        "answer": "Yes, your privacy is protected. The entire process happens in your browser, and your videos are never uploaded to our servers."
      }
    ],
  },
  'watermark-adder': {
    introduction: "Add watermark to images.",
    howToUse: ["Upload image", "Upload watermark", "Apply"],
    features: ["Add image or text watermarks to your photos.", "Adjust watermark opacity and position.", "Download watermarked image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Watermark Adder tool enables users to protect their images by embedding customizable text or image watermarks directly onto their photos. This is an essential feature for photographers, artists, and businesses to assert ownership, prevent unauthorized use, and promote their brand across digital platforms. The tool offers flexibility in design, allowing adjustments to position, size, and transparency.",
    usageExamples: [
      "Adding a copyright notice or logo to professional photographs before sharing online.",
      "Protecting original artwork or illustrations from unauthorized use or replication.",
      "Branding product images for e-commerce websites or digital catalogs.",
      "Creating a subtle visual signature for personal photos shared on social media."
    ],
    underlyingConcept: "Watermarking digitally modifies an image's pixel data to embed a visual identifier. For text watermarks, the tool renders the text onto a transparent layer, which is then composited onto the original image. For image watermarks (like logos), the watermark image is similarly composited. Options for opacity control the blending of the watermark with the base image. All operations are typically performed client-side using Canvas APIs, ensuring that original images are not uploaded to servers and user privacy is maintained.",
    faqs: [
      {
        "question": "How can I add a watermark to my photos online?",
        "answer": "Our free Watermark Adder tool allows you to easily upload your photo and then add either text or image watermarks. You can customize the watermark's position, size, and transparency before downloading your watermarked image."
      },
      {
        "question": "Can I add both text and image watermarks?",
        "answer": "Yes, this tool supports adding both custom text watermarks and image watermarks (like your logo) to your photos, giving you flexibility to protect your work."
      },
      {
        "question": "Is my photo secure when adding a watermark?",
        "answer": "Absolutely. All watermarking processes are done directly in your browser. Your photos are never uploaded to our servers, ensuring your privacy and security."
      }
    ],
  },
  'image-resizer': {
    introduction: "Resize images.",
    howToUse: ["Upload image", "Set size", "Download"],
    features: ["Resize images by dimensions or percentage.", "Maintain aspect ratio.", "Download resized image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Image Resizer tool provides a straightforward solution for adjusting the dimensions of images, either by specifying exact pixel values or by a percentage scale. This is vital for optimizing images for different contexts, such as web display, social media, or print, ensuring they fit within required specifications while controlling file size and maintaining visual quality.",
    usageExamples: [
      "Reducing large photos for faster website loading times without affecting page layout.",
      "Cropping or resizing images to fit specific aspect ratios for social media banners or profile pictures.",
      "Preparing images for email attachments to avoid large file sizes.",
      "Scaling down high-resolution images for use in presentations or documents."
    ],
    underlyingConcept: "Image resizing involves re-sampling the pixel data of an image to a new set of dimensions. When an image is scaled down, pixels are discarded; when scaled up, new pixels are interpolated based on neighboring pixel values. Maintaining the aspect ratio during this process is crucial to prevent stretching or squishing the image. The tool typically performs these operations client-side using Canvas APIs, allowing for direct manipulation of image data within the browser.",
    faqs: [
      {
        "question": "How can I resize an image online for free?",
        "answer": "Our free Image Resizer tool allows you to easily upload your image and then resize it by specific dimensions (width and height) or by a percentage. You can maintain the aspect ratio to prevent distortion."
      },
      {
        "question": "Will resizing my image affect its quality?",
        "answer": "When you reduce the size of an image, there is typically minimal to no loss in visible quality. However, significantly enlarging a small image can lead to pixelation. Our tool helps you balance size and quality."
      },
      {
        "question": "Is my image secure when I use this resizer?",
        "answer": "Yes, your privacy is our priority. All image resizing operations are performed directly in your browser. Your images are never uploaded to our servers, ensuring your data remains completely private."
      }
    ],
  },
  'image-converter': {
    introduction: "Convert image formats.",
    howToUse: ["Upload image", "Select format", "Convert"],
    features: ["Convert images between formats like PNG, JPG, WEBP.", "High-quality image conversion.", "Download converted image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Image Converter is a versatile tool designed to change image files from one format to another (e.g., JPG to PNG, PNG to WebP). This is crucial for ensuring compatibility across various platforms, optimizing images for web performance, or meeting specific requirements for print or other applications. The tool simplifies the conversion process, making it easy to adapt images to any digital context.",
    usageExamples: [
      "Converting high-quality PNG images to smaller JPG files for faster website loading.",
      "Changing images to WebP format to leverage modern web optimization techniques.",
      "Transforming images from less common formats into universally supported ones like JPG or PNG.",
      "Preparing images for specific software or devices that only accept certain file types."
    ],
    underlyingConcept: "Image conversion involves decoding the pixel data from the original image format and then re-encoding it into the new target format. Different image formats employ various compression algorithms (e.g., JPEG uses lossy compression, PNG uses lossless compression, WebP uses both). The tool manages these decoding and re-encoding processes, often leveraging client-side browser APIs or specialized JavaScript libraries, to produce the desired output format while attempting to preserve image quality based on the characteristics of the chosen format.",
    faqs: [
      {
        "question": "How can I convert an image to a different format online?",
        "answer": "Our free Image Converter tool allows you to easily upload your image and then select your desired output format, such as PNG, JPG, or WEBP. The conversion happens quickly, and you can then download your image in the new format."
      },
      {
        "question": "What image formats are supported for conversion?",
        "answer": "Our tool supports a wide range of popular image formats for both input and output, including JPG, PNG, WEBP, GIF, and many others. This ensures flexibility for all your conversion needs."
      },
      {
        "question": "Will converting my image reduce its quality?",
        "answer": "While some formats (like JPG) use lossy compression, our converter is designed to maintain the highest possible quality during the conversion process. For formats like PNG and WEBP, quality loss is minimal or non-existent, and you often gain smaller file sizes."
      }
    ],
  },
  'image-compressor': {
    introduction: "Compress images.",
    howToUse: ["Upload image", "Set quality", "Compress"],
    features: ["Compress images to reduce file size while maintaining quality.", "Adjust compression level.", "Preview compressed image before downloading."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Image Compressor tool efficiently reduces the file size of digital images while striving to preserve their visual quality. This optimization is crucial for improving website loading speeds, reducing bandwidth usage, and saving storage space. Users can typically adjust the compression level to achieve a desired balance between file size reduction and image fidelity, making it a valuable tool for webmasters, photographers, and digital artists.",
    usageExamples: [
      "Optimizing images for a website or blog to enhance page load performance and SEO.",
      "Reducing the size of photo attachments for email to ensure they send quickly and fit mailbox limits.",
      "Compressing large image libraries to free up storage space on devices or cloud services.",
      "Preparing images for specific platforms (e.g., social media) that have file size restrictions."
    ],
    underlyingConcept: "Image compression relies on various algorithms to eliminate redundant or less perceptually important data from an image file. Lossy compression (common in JPEG) discards some data permanently to achieve significant size reduction, while lossless compression (common in PNG) reduces file size without losing any information. The tool processes the image pixels, applies a chosen compression algorithm (often by converting to a more efficient format like WebP or by adjusting JPEG quality settings), and then generates the smaller output file.",
    faqs: [
      {
        "question": "How can I compress an image online to reduce its file size?",
        "answer": "Our free Image Compressor tool allows you to upload your image and then adjust the compression level to significantly reduce its file size. You can preview the compressed image before downloading to ensure quality."
      },
      {
        "question": "Will compressing my image affect its visual quality?",
        "answer": "Our tool is designed to provide smart compression, minimizing file size while preserving as much visual quality as possible. You can control the compression level to find the perfect balance between file size and image clarity."
      },
      {
        "question": "Is my image protected during compression?",
        "answer": "Yes, absolutely. All image compression processes occur locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security for your data."
      }
    ],
  },
  'todo-list': {
    introduction:
      "Capture your thoughts and organize your day. Our To-Do List is a clean, simple, and persistent tool to help you keep track of your tasks. Add items, mark them as complete, and filter your view to stay focused. Your list is automatically saved in your browser, so it's always here when you need it.",
    explanation:
      "The tool uses your browser's local storage (LocalStorage) to save your task list directly on your device. This means your data persists even if you close the tab or restart your browser, but it is never sent to any external server.",
    usageExamples: [
      "Keeping a daily task list.",
      "Tracking a shopping list.",
      "Managing a mini-project's steps.",
    ],
    underlyingConcept:
      "LocalStorage is a web storage API that allows JavaScript sites and apps to store key/value pairs in a web browser with no expiration date.",
    howToUse: [
      "Type a task in the input box and press Enter or click 'Add'.",
      "Click the checkbox to mark a task as complete.",
      "Use the filter buttons (All, Active, Completed) to change your view.",
      "Click the trash icon to delete a task.",
    ],
    features: [
      "Persistent Storage: Tasks are saved automatically.",
      "Filter Views: Easily see active or completed tasks.",
      "Clean Design: No distractions, just your list.",
    ],
    faqs: [
      {
        question: "Will I lose my tasks if I close the browser?",
        answer:
          "No, they are saved in LocalStorage and will be there when you come back.",
      },
      {
        question: "Can I sync this with other devices?",
        answer:
          "No, the data is stored locally on this specific device and browser.",
      },
    ],
    privacy: PRIVACY_STATEMENT,
  },
  'password-generator': {
    introduction: "Generate strong passwords.",
    howToUse: ["Set length", "Click generate"],
    features: ["Generate strong, secure passwords.", "Customize password length and character types.", "Copy generated password with a single click."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Password Generator is a utility designed to create highly secure and unique passwords. It allows users to customize the password's length and character types (uppercase, lowercase, numbers, and symbols), ensuring the generated passwords are robust against common cracking methods like brute-force attacks and dictionary attacks. This tool promotes stronger online security by making it easy to create complex and unpredictable credentials.",
    usageExamples: [
      "Creating a new, strong password for an online account or service.",
      "Generating secure, random passwords for Wi-Fi networks or encrypted archives.",
      "Educating users on the importance of password complexity and randomness.",
      "As a quick source for unique character strings for testing or development purposes."
    ],
    underlyingConcept: "Password generation relies on pseudo-random number generation to select characters from a defined set based on user preferences. The strength of the generated password is directly proportional to its length and the size of the character set (entropy). By allowing combinations of various character types, the tool increases the search space for potential attackers, making brute-force attempts computationally infeasible within a reasonable timeframe. Modern implementations often use cryptographically secure random number generators for enhanced security.",
    faqs: [
      {
        "question": "How can I generate a strong, secure password online?",
        "answer": "Our free Password Generator creates highly secure, random passwords. Simply choose your desired length and select character types (uppercase, lowercase, numbers, symbols), then click generate to get an instant strong password."
      },
      {
        "question": "What makes a password generated by this tool secure?",
        "answer": "Our tool creates passwords that are random and complex, combining various character types and lengths, which makes them extremely difficult to guess or crack by brute-force methods. The more random and longer the password, the stronger it is."
      },
      {
        "question": "Is it safe to generate passwords using an online tool?",
        "answer": "Yes, this tool is safe to use. All password generation happens locally in your browser. The generated passwords are never sent to our servers or stored anywhere, ensuring your privacy and security."
      }
    ],
  },
  'qr-code-generator': {
    introduction: "Generate QR codes.",
    howToUse: ["Enter text", "Download QR code"],
    features: ["Generate QR codes from text or URLs.", "Customize QR code color and size.", "Download QR code as a PNG image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The QR Code Generator is a digital utility that creates Quick Response (QR) codes from various types of input, such as plain text, website URLs, contact information, or Wi-Fi credentials. These matrix barcodes can be scanned by smartphones or other devices to quickly access the encoded information, bridging the gap between physical and digital worlds for marketing, information sharing, and convenience.",
    usageExamples: [
      "Generating QR codes for website links to be displayed on print materials or product packaging.",
      "Creating QR codes with Wi-Fi login details for guests at a business or home.",
      "Embedding contact information (vCard) into a QR code for easy sharing at networking events.",
      "Using QR codes for quick access to menus, promotions, or event registration."
    ],
    underlyingConcept: "QR codes are two-dimensional barcodes that can store a significant amount of data. The generator translates the input data into a standardized binary format, which is then mapped onto a grid of black and white squares. Error correction algorithms are typically applied during generation to ensure the QR code remains scannable even if partially damaged or obscured. The visual pattern is a direct representation of this encoded and error-corrected binary data.",
    faqs: [
      {
        "question": "How can I generate a QR code online for free?",
        "answer": "Our free QR Code Generator allows you to easily create QR codes from any text or URL. Simply type or paste your content, and an instant QR code image will be generated for you to download."
      },
      {
        "question": "Can I customize the appearance of my QR code?",
        "answer": "Yes, you can customize your QR code's appearance by selecting different colors and adjusting its size. This helps ensure your QR code matches your brand or design aesthetics."
      },
      {
        "question": "What can I use a generated QR code for?",
        "answer": "QR codes are versatile! You can use them to share website links, contact information, Wi-Fi credentials, app download links, or even plain text messages quickly and efficiently."
      }
    ],
  },
  'date-calculator': {
    introduction: "Calculate date differences.",
    howToUse: ["Select dates", "See result"],
    features: ["Calculate the difference between two dates.", "Add or subtract days from a date.", "Shows the difference in years, months, and days."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Date Calculator is a practical utility for performing various calculations involving dates. It allows users to quickly determine the duration between two specific dates, add or subtract days/months/years from a given date, or even find a future/past date based on a starting point and an interval. This tool is valuable for planning, scheduling, or simply understanding time spans.",
    usageExamples: [
      "Calculating the exact number of days between two events or deadlines.",
      "Determining a project's completion date by adding a certain number of working days.",
      "Finding a birth date or anniversary by subtracting an age from the current date.",
      "Planning travel itineraries or scheduling appointments with precise date calculations."
    ],
    underlyingConcept: "Date calculations are complex due to varying month lengths and the existence of leap years. The tool performs arithmetic operations on date objects, taking these factors into account. It often normalizes dates to a common reference point (like Unix epoch time) for accurate subtraction and addition, and then converts the resulting time difference back into human-readable years, months, and days, ensuring precision across different calendar scenarios.",
    faqs: [
      {
        "question": "How can I calculate the difference between two dates online?",
        "answer": "Our free Date Calculator allows you to easily find the duration between any two dates. Simply select the start and end dates, and the tool will instantly show you the difference in years, months, and days."
      },
      {
        "question": "Can this tool add or subtract days from a specific date?",
        "answer": "Yes, in addition to finding the difference, you can also use this calculator to add or subtract a specified number of days from any given date to find a future or past date."
      },
      {
        "question": "Is this date calculator accurate for all time zones?",
        "answer": "This tool performs calculations based on standard date arithmetic. While it doesn't specifically account for time zones, it provides accurate day counts. For time zone specific calculations, consider our Time Zone Converter tool."
      }
    ],
  },
  'pomodoro-timer': {
    introduction: "Focus with the Pomodoro Timer.",
    howToUse: ["Start timer", "Work", "Take break"],
    features: ["A timer to help you focus using the Pomodoro Technique.", "Customizable work and break intervals.", "Audio and visual notifications."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Pomodoro Timer is a productivity tool based on the Pomodoro Technique, a time management method that breaks down work into focused intervals, typically 25 minutes long, separated by short breaks. This structured approach helps users maintain concentration, prevent burnout, and improve overall efficiency. The timer guides users through these cycles with customizable durations and clear notifications.",
    usageExamples: [
      "Improving focus and productivity for students studying for exams or completing assignments.",
      "Enhancing work efficiency for professionals tackling complex tasks or projects.",
      "Preventing digital distractions by committing to focused work blocks.",
      "Structuring creative sessions or deep work periods to maximize output."
    ],
    underlyingConcept: "The Pomodoro Technique relies on the idea that frequent short breaks can improve mental agility and sustain focus over longer periods. The timer enforces a strict rhythm: a \"pomodoro\" (work interval) followed by a short break, and after several pomodoros, a longer break. This systematic segmentation of time helps in managing cognitive load and reinforces a cycle of concentration and rest, which is believed to optimize mental performance and reduce mental fatigue.",
    faqs: [
      {
        "question": "What is the Pomodoro Technique and how does this timer help?",
        "answer": "The Pomodoro Technique is a time management method that uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Our Pomodoro Timer helps you stick to these intervals, improving focus and productivity."
      },
      {
        "question": "Can I customize the work and break durations with this timer?",
        "answer": "Yes, our Pomodoro Timer is fully customizable. You can set your preferred lengths for both work sessions and short/long breaks to best suit your personal workflow and concentration needs."
      },
      {
        "question": "Does this timer provide notifications?",
        "answer": "Absolutely. The timer includes both audio and visual notifications to alert you when a work interval ends and a break begins (and vice versa), ensuring you transition smoothly between tasks and rests without constantly checking the clock."
      }
    ],
  },
  'meme-generator': {
    introduction: "Create memes.",
    howToUse: ["Select template", "Add text", "Download"],
    features: ["Create your own memes with popular templates.", "Add top and bottom text.", "Download the meme as a JPG image."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Meme Generator is a fun and creative tool that allows users to quickly generate popular internet memes using a selection of templates and custom text. It simplifies the process of adding top and bottom text captions to iconic images, enabling users to express humor, reactions, or commentary in a widely recognized digital format for sharing across social media and messaging platforms.",
    usageExamples: [
      "Creating humorous content for social media posts or online communities.",
      "Expressing reactions or inside jokes within chat conversations.",
      "Crafting viral marketing campaigns or engaging digital content.",
      "Participating in online meme trends and cultural discussions."
    ],
    underlyingConcept: "Memes typically combine a recognizable image (template) with custom, often witty, text. The tool operates by taking a chosen template image and overlaying user-inputted text onto predefined regions (e.g., top and bottom of the image). The text rendering involves selecting appropriate fonts, sizes, and colors for legibility, usually with a dark outline for contrast. The final output is then rendered into a standard image format (like JPG) for easy sharing.",
    faqs: [
      {
        "question": "How can I create my own memes online for free?",
        "answer": "Our free Meme Generator allows you to quickly create custom memes. Simply choose from popular meme templates, add your desired top and bottom text, and then download your unique meme as a JPG image to share with friends."
      },
      {
        "question": "Can I use my own images or only pre-loaded templates?",
        "answer": "Currently, our tool focuses on providing a wide selection of popular meme templates. Support for uploading your own images to create memes may be a feature added in the future."
      },
      {
        "question": "Is the generated meme saved with a watermark?",
        "answer": "No, memes generated using our tool are completely free of watermarks. You can download and share your creations without any branding, ensuring full creative freedom."
      }
    ],
  },
  'unit-converter': {
    introduction: "Convert units.",
    howToUse: ["Select units", "Enter value", "See result"],
    features: ["Convert between different units of measurement.", "Supports length, weight, temperature, and more.", "Easy to use interface."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The Unit Converter is a comprehensive utility designed to facilitate conversions between a vast array of measurement units across different categories. From fundamental quantities like length, mass, and time to more specialized units for temperature, volume, and data storage, this tool provides instant and accurate conversions, eliminating manual calculations and ensuring precision in various fields.",
    usageExamples: [
      "Converting kilometers to miles for travel planning or understanding international distances.",
      "Changing Celsius to Fahrenheit for weather reports or cooking recipes.",
      "Converting grams to ounces for ingredient measurements in culinary arts.",
      "Translating data sizes from megabytes to gigabytes for file management."
    ],
    underlyingConcept: "Unit conversion relies on established conversion factors between different units within the same measurement system (e.g., meters to centimeters) or across different systems (e.g., meters to inches). The tool applies these precise numerical factors: it takes an input value and its original unit, looks up the corresponding conversion factor to the target unit, and then performs the necessary multiplication or division to yield the converted value. This mathematical process ensures the equivalence of the physical quantity despite the change in its unit of measure.",
    faqs: [
      {
        "question": "How can I convert between different units of measurement online?",
        "answer": "Our free Unit Converter tool makes it simple to convert between various units. Just select the categories (like length, weight, or temperature), input your value, choose the units to convert from and to, and get an instant, accurate result."
      },
      {
        "question": "What types of units can this converter handle?",
        "answer": "This versatile tool supports a wide range of measurement categories, including length (e.g., meters to feet), weight (e.g., kilograms to pounds), temperature (e.g., Celsius to Fahrenheit), volume, area, and many more, covering most common conversion needs."
      },
      {
        "question": "Is this unit converter accurate?",
        "answer": "Yes, our Unit Converter uses precise conversion factors to ensure all calculations are highly accurate. It's designed to provide reliable results for both everyday use and professional applications."
      }
    ],
  },
  'bmi-calculator': {
    introduction: "Calculate BMI.",
    howToUse: ["Enter height and weight", "See result"],
    features: ["Calculate your Body Mass Index.", "Shows your BMI category.", "Supports metric and imperial units."],
    privacy: PRIVACY_STATEMENT,
    explanation: "Body Mass Index (BMI) is a widely used screening method for weight categories: underweight, healthy weight, overweight, and obesity. While it's not a direct measure of body fat, it correlates with various metabolic and disease outcomes. This calculation is based on your height and weight.",
    usageExamples: [
      "Screening for potential weight-related health issues.",
      "Tracking weight loss or gain progress over time.",
      "Comparing your weight status against general population standards."
    ],
    underlyingConcept: "BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters (kg/m²). For the imperial system, the formula is (weight in pounds / (height in inches x height in inches)) x 703.",
    faqs: [
      {
        "question": "How can I calculate my Body Mass Index (BMI) online?",
        "answer": "Our free BMI Calculator makes it easy to determine your Body Mass Index. Simply enter your height and weight, and the tool will instantly calculate your BMI and tell you which category it falls into (e.g., underweight, normal, overweight)."
      },
      {
        "question": "Does this BMI calculator support both metric and imperial units?",
        "answer": "Yes, our versatile BMI calculator supports both metric (kilograms and centimeters) and imperial (pounds and inches) units, allowing you to use the measurements you are most comfortable with."
      },
      {
        "question": "What does my BMI result mean?",
        "answer": "Your BMI is a screening tool that indicates whether you have a healthy weight for your height. The result places you into a category (underweight, normal weight, overweight, obese), which can help identify potential health risks, though it should be discussed with a healthcare professional."
      }
    ],
  },
  'currency-converter': {
    introduction: "Convert currencies.",
    howToUse: ["Select currencies", "Enter amount", "See result"],
    features: ["Convert between different currencies.", "Real-time exchange rates.", "Supports over 150 currencies."],
    privacy: PRIVACY_STATEMENT,
    explanation: "This tool provides real-time currency conversion rates, allowing you to quickly compare the value of different world currencies. It pulls the latest market data to ensure you get the most accurate conversion possible for travel, business, or shopping.",
    usageExamples: [
      "Calculating the cost of goods while shopping internationally online.",
      "Budgeting for a vacation in a foreign country.",
      "Converting business expenses or freelance income from another currency."
    ],
    underlyingConcept: "Exchange rates fluctuate constantly based on the foreign exchange (Forex) market, which is influenced by economic indicators like inflation, interest rates, and geopolitical stability. This tool queries a reliable financial data API to fetch these dynamic rates.",
    faqs: [
      {
        "question": "How can I convert currencies online with real-time rates?",
        "answer": "Our free Currency Converter allows you to easily convert between various world currencies using up-to-date exchange rates. Simply select your 'from' and 'to' currencies, enter the amount, and get an instant conversion result."
      },
      {
        "question": "How many currencies does this converter support?",
        "answer": "Our tool supports over 150 global currencies, including major world currencies and many local ones, ensuring you can perform nearly any currency conversion you need."
      },
      {
        "question": "Is the exchange rate data reliable?",
        "answer": "Yes, our Currency Converter uses data from reputable financial sources to provide real-time or near real-time exchange rates, making our conversions as accurate as possible for planning and estimation."
      }
    ],
  },
  'world-clock': {
    introduction: "Check world times.",
    howToUse: ["Search for city", "See time"],
    features: ["Check the time in different cities around the world.", "Add multiple cities to your dashboard.", "Shows the current date and time."],
    privacy: PRIVACY_STATEMENT,
    explanation: "The World Clock helps you stay connected with the world by displaying the current time in cities across different time zones. It automatically handles the complex rules of Daylight Saving Time (DST) for each location, so you never have to guess the time difference.",
    usageExamples: [
      "Scheduling a meeting with colleagues or clients in different time zones.",
      "Knowing the right time to call friends or family living abroad.",
      "Tracking market opening times for global stock exchanges."
    ],
    underlyingConcept: "The world is divided into 24 standard time zones, each roughly 15 degrees of longitude wide. However, local political decisions often alter these zones. This usage of the `Intl.DateTimeFormat` API ensures strict adherence to the IANA Time Zone Database, the gold standard for global timekeeping.",
    faqs: [
      {
        "question": "How can I check the current time in different cities globally?",
        "answer": "Our free World Clock tool allows you to easily find the current local time for cities across the globe. Simply search for a city by name, and its current date and time will be displayed instantly."
      },
      {
        "question": "Can I add multiple cities to track simultaneously?",
        "answer": "Yes, you can build a personalized dashboard by adding multiple cities to track. This feature is perfect for coordinating with international teams, family abroad, or planning global events."
      },
      {
        "question": "Does the World Clock automatically adjust for Daylight Saving Time (DST)?",
        "answer": "Yes, our World Clock automatically accounts for Daylight Saving Time changes in each respective city, ensuring the displayed times are always accurate without you needing to manually adjust."
      }
    ],
  },
  'timers-and-stopwatch': {
    introduction: "Use a timer or stopwatch.",
    howToUse: ["Start", "Stop", "Reset"],
    features: ["A simple timer and stopwatch.", "Set a countdown timer.", "Record laps with the stopwatch."],
    privacy: PRIVACY_STATEMENT,
    explanation: "This dual-purpose tool offers a countdown timer for time management and a stopwatch for measuring elapsed time. Whether you need to time a workout interval, limit a brainstorming session, or track how long a task takes, this tool captures time with precision.",
    usageExamples: [
      "Using the Pomodoro technique (25-minute work blocks) for productivity.",
      "Timing rest intervals during a gym workout.",
      "Measuring the speed of code execution or other time-sensitive tasks.",
      "Boiling an egg or baking with a precise countdown."
    ],
    underlyingConcept: "The tool utilizes the browser's `performance.now()` API for high-precision timestamping, ensuring accuracy down to the millisecond. This prevents the 'drift' that can occur with simple `setInterval` based timers over long periods.",
    faqs: [
      {
        "question": "How can I use the online stopwatch and timer functions?",
        "answer": "Our free Timers and Stopwatch tool provides both a simple countdown timer and a precise stopwatch. For the timer, set your desired duration and click start. For the stopwatch, simply click start, stop, and reset to measure elapsed time or record laps."
      },
      {
        "question": "Can I set multiple timers or record laps with the stopwatch?",
        "answer": "This tool offers a single, easy-to-use countdown timer. For the stopwatch function, you can indeed record multiple laps, making it convenient for tracking intervals during workouts or tasks."
      },
      {
        "question": "Is this tool suitable for precise timing, like for sports or experiments?",
        "answer": "While our digital stopwatch is designed for accuracy, it relies on your browser's performance. For highly critical, scientific, or professional sports timing where milliseconds are paramount, dedicated hardware might be more appropriate."
      }
    ],
  },
  'keyword-density-analyzer': {
    introduction: "Analyze keyword density.",
    howToUse: ["Paste text", "See results"],
    features: ["Analyze the keyword density of a text.", "Shows one, two, and three-word keyword densities.", "Exclude certain words from the analysis."],
    privacy: PRIVACY_STATEMENT,
    explanation: "Keyword Density is the percentage of times a keyword or phrase appears on a web page compared to the total number of words. This tool helps copywriters and SEO specialists analyze their content to ensure it's optimized for search engines without being 'spammy' (keyword stuffing).",
    usageExamples: [
      "Checking a blog post to ensure the main topic keyword is used enough.",
      "Analyzing a competitor's page to see which keywords they are targeting.",
      "Avoiding keyword stuffing penalties by keeping density within a natural range (typically 1-2%)."
    ],
    underlyingConcept: "The analyzer tokenizes the input text (breaks it into words), filters out common stop words (like 'the', 'and', 'is'), and then counts the frequency of each unique word or phrase (n-grams). The density is calculated as (Keyword Count / Total Word Count) * 100.",
    faqs: [
      {
        "question": "How can I analyze the keyword density of my text online?",
        "answer": "Our free Keyword Density Analyzer allows you to easily check how frequently certain keywords appear in your content. Simply paste your text into the analyzer, and it will instantly calculate the density for one, two, and three-word phrases."
      },
      {
        "question": "Why is keyword density important for SEO?",
        "answer": "Keyword density is a factor in Search Engine Optimization (SEO) as it helps search engines understand what your content is about. Maintaining an optimal keyword density can improve your content's relevance for target queries and enhance its search engine ranking."
      },
      {
        "question": "Can I exclude specific words from the keyword density analysis?",
        "answer": "Yes, our tool provides an option to exclude common words (like \"and,\" \"the,\" \"is\") or any other specific words you deem irrelevant from the analysis. This helps you focus on the most impactful keywords in your content."
      }
    ],
  },
};
