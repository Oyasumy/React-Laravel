import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useToast } from '@hooks';
import { FILE_TYPE, MAX_SIZE_FILE, MESSAGE } from '@constants';
import { useUploadContext } from '../hooks/context';

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  file: UploadFile<any>;
}

type TUploadFiles = {
  formRef: any;
  uploadRef: any;
};

const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? 'is-dragging' : ''}
      //   className={'is-dragging'}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadFiles: React.FC<TUploadFiles> = (props) => {
  /**
   * Hook
   */
  // State
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  //   Hook
  const { toastError } = useToast();

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  // Context
  const { fileList, setFileList } = useUploadContext();

  /**
   *  Effects
   */

  // When leave component will remove all List Image
  useEffect(() => {
    return () => {
      setFileList([]);
    };
  }, []);

  /**
   *
   * Functions
   */
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    console.log({ newFileList });

    // // Set list File to form
    // props.formRef.current?.setFieldsValue({
    //   main_image: newFileList?.[0]?.originFileObj,
    //   'sub_images[0]': newFileList?.[1]?.originFileObj,
    //   'sub_images[1]': newFileList?.[2]?.originFileObj,
    //   'sub_images[2]': newFileList?.[3]?.originFileObj,
    // });
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  //   Before upload check validations file
  const beforeUpload = (file: UploadFile) => {
    const isValidType = FILE_TYPE.includes(file.type ?? '');
    const isValidSize = (file.size ?? 1) / 1024 / 1024 <= MAX_SIZE_FILE;

    // Check File Type
    if (!isValidType) {
      toastError(`${file.name} ${MESSAGE.ME012}`);
    }
    // Check File Size
    if (!isValidSize) {
      toastError(`${file.name} ${MESSAGE.ME013}`);
    }
    // return isValidType || Upload.LIST_IGNORE;
    return false;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
        <Upload
          action=''
          fileList={fileList}
          listType='picture-card'
          ref={props.uploadRef}
          onChange={onChange}
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          accept={FILE_TYPE.toString()}
          itemRender={(originNode, file) => <DraggableUploadListItem originNode={originNode} file={file} />}
          maxCount={4}
          multiple
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        {/* Modal upload */}
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt='preview-image-upload' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </SortableContext>
    </DndContext>
  );
};

export default UploadFiles;
