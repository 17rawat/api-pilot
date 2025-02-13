export const handleDownload = (data) => {
  let blob;
  let fileName;

  const format = typeof data === "object" ? "json" : "text";

  if (format === "json") {
    const jsonString = JSON.stringify(data, null, 2);
    blob = new Blob([jsonString], { type: "application/json" });
    fileName = "data.json";
  } else {
    const textString =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    blob = new Blob([textString], { type: "text/plain" });
    fileName = "data.txt";
  }

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
