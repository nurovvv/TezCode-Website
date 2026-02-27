import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, onRun, language = 'python', theme = 'vs-dark' }) => {
    const handleEditorChange = (newValue) => {
        onChange(newValue);
    };

    const handleEditorDidMount = (editor, monaco) => {
        if (onRun) {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                onRun();
            });
        }
    };

    return (
        <div style={{ height: '100%', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={value}
                theme={theme}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                    fontWeight: '500',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    readOnly: false,
                    cursorStyle: 'line',
                    automaticLayout: true,
                    tabSize: 4,
                    padding: { top: 16, bottom: 16 }
                }}
            />
        </div>
    );
};

export default CodeEditor;
