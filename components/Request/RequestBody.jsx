import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const RequestBody = ({ body, setBody }) => {
  // console.log(body);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <AceEditor
          mode="json"
          theme="github"
          value={body}
          onChange={setBody}
          name="json-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100%"
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          className="rounded-md border border-gray-200"
          placeholder="Enter request body (JSON)"
        />
      </div>
    </div>
  );
};

export default RequestBody;
