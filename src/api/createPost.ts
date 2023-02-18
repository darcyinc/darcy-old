import { axios } from "./axios";

const doRequest = (formData: FormData) => {
  axios
    .post("/posts", formData)
    .then(console.log)
    .catch(console.log);
};

export default function createPost(content: string, files: File[]) {
  const formData = new FormData();
  formData.append("content", content);

  if (files.length === 0) {
    doRequest(formData);
    return;
  }

  for (const [index, file] of files.entries()) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result?.toString();
      if (base64) formData.append("files", base64);

      if (files.length === Number(index) + 1) doRequest(formData);
    };
  }
}
