import { axios } from "./axios";

interface PostData {
  content: string;
  files: string[];
}

const doRequest = (finalData: PostData) => {
  axios.post("/posts", finalData).then(console.log).catch(console.log);
};

export default function createPost(content: string, files: File[]) {
  const finalData: PostData = {
    content,
    files: [],
  };

  if (files.length === 0) {
    doRequest(finalData);
    return;
  }

  for (const [index, file] of files.entries()) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result?.toString();
      if (base64) finalData.files.push(base64);

      if (files.length === Number(index) + 1) doRequest(finalData);
    };
  }
}
