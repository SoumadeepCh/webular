"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";

interface CodeEditorProps {
	code: string;
	language: string;
	theme: "light" | "dark";
	editorSettings: any;
	onCodeChange: (code: string) => void;
	onEditorMount: (editor: any, monaco: any) => void;
}

export default function CodeEditor({
	code,
	language,
	theme,
	editorSettings,
	onCodeChange,
	onEditorMount,
}: CodeEditorProps) {
	return (
		<Editor
			height="100%"
			language={language}
			value={code}
			onChange={(value) => onCodeChange(value || "")}
			onMount={onEditorMount}
			theme={theme === "dark" ? "vs-dark" : "light"}
			options={{
				minimap: {
					enabled: editorSettings.minimap,
				},
				fontSize: editorSettings.fontSize,
				lineNumbers: editorSettings.lineNumbers ? "on" : "off",
				roundedSelection: false,
				scrollBeyondLastLine: false,
				automaticLayout: true,
				padding: { top: 16, bottom: 16 },
				fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
				wordWrap: editorSettings.wordWrap ? "on" : "off",
				tabSize: editorSettings.tabSize,
				insertSpaces: true,
				selectOnLineNumbers: true,
				readOnly: false,
				suggestOnTriggerCharacters: editorSettings.autoComplete,
				quickSuggestions: editorSettings.autoComplete,
				formatOnType: editorSettings.formatOnType,
				formatOnPaste: editorSettings.formatOnPaste,
				mouseWheelZoom: true,
				smoothScrolling: true,
				cursorBlinking: "smooth",
				cursorSmoothCaretAnimation: "on",
			}}
		/>
	);
}