import { axios } from './axios';

interface CreatePostData {
  content: string;
  files: string[];
  replyPrivacy: 'everyone' | 'following';
}

interface PostData extends Omit<CreatePostData, 'files'> {
  files: File[];
}

const doRequest = (finalData: CreatePostData) => {
  axios.post('/posts', finalData).then(console.log).catch(console.log);
};

export default function createPost(data: PostData) {
  const { content, files, replyPrivacy } = data;
  const finalData: CreatePostData = {
    content,
    replyPrivacy,
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
