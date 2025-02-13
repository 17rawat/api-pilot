import toast from "react-hot-toast";

export const handleCopy = (item) => {
  navigator.clipboard
    .writeText(item)
    .then(() => toast.success("Copied to clipboard!"))
    .catch(() => toast.error("Failed to copy"));
};
