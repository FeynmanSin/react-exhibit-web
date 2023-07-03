import React, { useState, FC, useRef, useEffect } from 'react';
import SparkMD5 from 'spark-md5';
import { } from './utils/upload';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { message } from 'antd';
import { prettyCls } from '@/utils/prettyCls';
import './index.less';

const cls = prettyCls('upload-wrapper');
const axios = window.axios;


interface Chunk {
  chunk: Blob,//  File分片之后的Blob
  name: string
}

const Progress: FC<{ file: File }> = ({ file }) => {
  const [uploadedSize, setUploadedSize] = useState(0);// 存放当前已上传size
  const ChunkSize = 10 * 1024 * 1024;//  分片大小设置为10M一个
  useEffect(() => {
    // // 已上传size小于文件总size时继续切片上传
    // if (uploadedSize < file.size) {
    //   // readFile();
    //   // uploadChunk(fileChunk);
    // } else {
    //   message.success('上传成功');
    // }
    if (file) {
      // const chunks = createFileChunks();
      // console.log(">>>>>chunks", chunks);
      ; (async () => {
        const hash = await calcFileHash(file);
        console.log(">>>>>hash", hash)
        // c9e903c51301bf81bad6a183483301d4
      })();
    }
  }, [file]);

  // todo: 创建文件分片数组
  const createFileChunks = (file: File, size = ChunkSize) => {
    const fileChunk = file.slice(uploadedSize, uploadedSize + ChunkSize);// 将文件切片
    let cur = 0;
    const chunks = [];
    const index = 0;//  要记录是第几片
    while (cur < file.size) {
      chunks.push({
        name: `${hash - ${ index }${ file.}} `,
        chunk: file.slice(cur, cur + ChunkSize)
      });
      cur += ChunkSize
    }
    return chunks;
  }

  // todo: 创建文件hash值,用于识别文件唯一性
  const calcFileHash = async (file: File): Promise<string> => {
    return new Promise(resolve => {
      const spark = new SparkMD5.ArrayBuffer();//  创建一个spark md5计算arrayBuffer的对象
      const reader = new FileReader();//  创建fileReader对象
      const size = file.size;
      const offset = 2 * 1024 * 1024;// 文件切成2M的切片
      const chunks = [file.slice(0, offset)];
      let cur = offset;
      while (cur < size) {
        if (cur + offset >= size) {
          // 最后一个区块切片全部内容
          chunks.push(file.slice(cur, cur + offset));
        } else {
          // 中间的区块
          const mid = cur + offset / 2;
          const end = cur + offset;
          chunks.push(file.slice(cur, cur + 2));
          chunks.push(file.slice(mid, mid + 2));
          chunks.push(file.slice(end, end + 2));
        }
        cur += offset;
      }
      reader.readAsArrayBuffer(new Blob(chunks));// 读取文件
      reader.onload = (e => {// 获取读取文件后的结果并append进sparkMD5 返回MD5字符串
        spark.append(e.target?.result as ArrayBuffer);
        resolve(spark.end());
      });
    });
  }

  // todo: 上传文件分片
  const uploadChunk = async (chunks: Chunk[]) => {
    const { name, type, size } = file;
    // 生成上传文件 FormData类型
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('size', `${ size } `);
    formData.append('uploadedSize', `${ uploadedSize } `);
    formData.append('file', fileChunk);

    try {
      await axios.post('/upload', formData);
      setUploadedSize((prev) => prev + fileChunk.size);// 将本次上传的size累加到已上传size
    } catch (error) {
      message.error('上传失败');
    }

  };
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