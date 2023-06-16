import React, { useState, FC, useRef, useEffect } from 'react'
import sparkMD5 from 'spark-md5';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { message } from 'antd';
import { prettyCls } from '@/utils/prettyCls';
import './index.less';

const cls = prettyCls('upload-wrapper');
const axios = window.axios;

type CreateFormDataType = (data: {
  name: string,
  type: string,
  size: number,
  uploadedSize: number,
  file: Blob
}) => FormData;

const Progress: FC<{ file: File }> = ({ file }) => {
  const [uploadedSize, setUploadedSize] = useState(0);// 存放当前已上传size
  const { name, type, size } = file;

  useEffect(() => {
    // 已上传size小于文件总size时继续切片上传
    if (uploadedSize < file.size) {
      readFile();
      const fileChunk = file.slice(uploadedSize, uploadedSize + 64 * 1024);// 文件切片内容
      const formData = createFormData({
        name,
        type,
        size,
        uploadedSize,
        file: fileChunk,
      });
      (async () => {
        try {
          await axios.post('/upload', formData);
          setUploadedSize((prev) => prev + fileChunk.size);// 将本次上传的size累加到已上传size
        } catch (error) {
          message.error('上传失败');
        }
      })();
    } else {
      message.success('上传成功');
    }
  }, [uploadedSize]);

  const readFile = () => {
    const reader = new FileReader();
    console.log(">>>>>reader", reader)
  }


  // todo: 创建上传文件表单对象
  const createFormData: CreateFormDataType = ({
    name,
    type,
    size,
    uploadedSize,
    file,
  }) => {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('type', type);
    fd.append('size', `${size}`);
    fd.append('uploadedSize', `${uploadedSize}`);
    fd.append('file', file);
    return fd;
  }

  return (
    <progress max={file.size} value={file.size === 0 ? '100' : uploadedSize} />
  )
}
const Upload = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  // const storage = getStorage();
  // const beforeUpload = async (file: RcFile, fileList: RcFile[]) => {
  //   const listRef = ref(storage, 'image/');
  //   const res = await listAll(listRef);
  //   const storageRef = ref(storage, 'image/' + file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type ? file.type : 'unknown' });
  // }

  const onClick = () => {

  }
  const onDrop = () => {

  }
  const onPaste = () => {

  }

  const onChange = () => {
    if (fileRef.current?.files) {
      const files = Object.values(fileRef.current?.files);
      setFileList(prev => [...files, ...prev]);
    }
  }

  return (
    <div className={cls()}  >
      <input ref={fileRef} type="file" onChange={onChange} multiple={true} />
      <div className={cls('file-list')} >
        {
          fileList?.map(file => (
            <div className={cls('file-list-item')} key={file.name}>
              <div className={cls('file-list-item-name')}>{file.name}</div>
              <Progress file={file} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Upload;