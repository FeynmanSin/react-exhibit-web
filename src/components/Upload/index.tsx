import React, { useState, FC, useRef, useEffect } from 'react';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import SparkMD5 from 'spark-md5';
import { message } from 'antd';
import { prettyCls } from '@/utils/prettyCls';
import './index.less';

interface Chunk {
  chunk: Blob,//  File分片之后的Blob
  name: string,
  size: number
};


const cls = prettyCls('upload-wrapper');

const axios = window.axios;

const Progress: FC<{ file: File }> = ({ file }) => {
  const [uploadedSize, setUploadedSize] = useState(0);// 存放当前已上传size
  const chunkSize = 50 * 1024 * 1024;//  分片大小设置为10M一个
  useEffect(() => {
    uploadRequest(file, chunkSize);
  }, [file]);

  // todo: 创建文件分片数组
  const createFileChunks = (file: File, chunkSize: number, hash: string) => {
    let index = 0;//  记录是第几片
    let cur = uploadedSize;
    const chunks = [];
    while (cur < file.size) {
      chunks.push({
        name: `${hash}-${index}${file.name.substring(file.name.lastIndexOf('.'))}`,
        chunk: file.slice(cur, cur + chunkSize),
        size: file.slice(cur, cur + chunkSize).size,
      });
      cur += chunkSize;
      index++;
    }
    return chunks;
  }

  // todo: 计算文件hash值,用于识别文件唯一性
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
          chunks.push(file.slice(cur, cur + offset));// 最后一个区块切片全部内容
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
  const uploadChunks = async (chunks: Chunk[], hash: string, file: File) => {
    // 循环chunks分片数组,为其每一块分片创建FormData类型数据
    const request = chunks.map(item => {
      const formData = new FormData();
      formData.append('chunk', item.chunk);
      formData.append('name', item.name);
      formData.append('size', `${item.size}`);
      formData.append('hash', hash);
      return { formData };
    });
    // 循环request数组,为每一块分片发送请求
    // 考虑浏览器的并发问题,请求数为6
    const max = 6;
    let taskPool: Array<Promise<any>> = [];// 任务执行池

    for (let i = 0; i < request.length; i++) {
      const task = axios.post('/upload', request[i].formData);
      task.then(() => {
        setUploadedSize(prev => {
          const nextSize = Number(request[i].formData.get('size')) + prev;
          localStorage.setItem(hash, `${nextSize}`);// 将当前上传进度保存到localStorage中用于断点续传
          return nextSize;
        });
        taskPool.splice(taskPool.findIndex(i => i === task));// 请求完成后,将其请求任务从任务执行池中移除
      });
      taskPool.push(task);// 每次发送请求时将其放入任务执行池中
      if (max === taskPool.length) {// 任务执行池中已超过最大请求并发数量时
        await Promise.race(taskPool);// 使用Promise.race等待任务执行池至少有一个完成时才继续
      }
    }

    const ext = file.name.substring(file.name.lastIndexOf('.'));
    // 当所有分片上传完成后,发送合并请求
    await Promise.all(taskPool);
    await axios.post('/mergeFile', { hash, ext, name: file.name });
    message.success('上传成功');
  };


  // todo: 发送上传请求
  const uploadRequest = async (file: File, chunksSize: number,) => {
    const hash = await calcFileHash(file);
    const res = await axios.post('/checkFile', { hash });
    console.log(">>>>res", res)
    if (localStorage.getItem(hash)) {// 如果localStorage中有此文件的上一次上传进度
      setUploadedSize(Number(localStorage.getItem(hash)));//将上一次的上传进度复制到当前上传进度,实现断点续传
    }
    const chunks = await createFileChunks(file, chunksSize, hash);
    uploadChunks(chunks, hash, file);
  }

  return (
    <div className={cls('file-list-item')} key={file.name}>
      <div className={cls('file-list-item-name')}>{file.name}</div>
      <progress max={file.size} value={file.size === 0 ? '100' : uploadedSize} />
    </div>
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
          fileList?.map(file => (<Progress file={file} key={file.name} />))
        }
      </div>
    </div>
  )
}

export default Upload;