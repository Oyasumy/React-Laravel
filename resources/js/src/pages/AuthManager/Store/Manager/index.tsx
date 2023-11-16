import { Button, Space, Typography, Radio, Checkbox, Input, Form, Select, InputNumber } from 'antd';
import ComponentWrap, { TComponentWrap } from './container';
import { useNavigation, useRedux } from '@hooks';
import { selectAccessToken } from '@reducer/reducer/app';
import { BoxFlex } from '@components/Box';
import { COLOR, PAGE_URL } from '@constants';
import UploadFiles from './Components/uploadFiles';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Text, Title } = Typography;

const { TextArea } = Input;

const ManagerUser = (props: TComponentWrap) => {
  // Navigation
  const { gotoPage, searchParams, goBack } = useNavigation();
  // Hook
  // Props
  const { store, infoStore, cities, towns, showBtnApprove, formInstance } = props.state;
  const { createStore, updateStore, searchPostCode, approveStore } = props.handle;

  // Values
  const idStore = store?.id;
  const isApprove = store?.is_public === 0 ? false : true;
  const { form, formRef, uploadRef } = formInstance;

  // Functions
  const onFinish = (values: any) => {
    values.phone = values.phone?.toString();
    if (!idStore) {
      // Create User
      createStore(values);
    } else {
      // Update User
      updateStore(values);
    }
  };

  const onError = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form
        {...layout}
        colon={false}
        ref={formRef}
        form={form}
        name='control-hooks'
        className='hiddenLabel'
        onFinish={onFinish}
        onFinishFailed={onError}
        style={{ paddingBottom: 20 }}
      >
        <BoxFlex className='flexWrap justifyContentCenter' style={{ marginBottom: 50 }}>
          {/* Title */}
          <Title level={3} style={{ color: COLOR.PRIMARY, flex: 1, minWidth: 150, margin: '24px auto' }}>
            {idStore ? 'Edit Store' : 'Add Store'}
          </Title>
          {/* Buttons */}
          <BoxFlex className='widthAuto btnActions flexWrap alignItemsCenter'>
            <Space>
              <Button size='large' ghost className='bolder btnAction' onClick={() => goBack()}>
                キャンセル
              </Button>
              <Button size='large' className='btnSecondary bolder btnAction' htmlType='submit'>
                {'保存'}
              </Button>
              {showBtnApprove ? (
                <Button disabled={isApprove} size='large' className='btnSecondary bolder btnAction' onClick={() => approveStore()}>
                  {isApprove ? 'Approved' : 'Approve'}
                </Button>
              ) : null}
            </Space>
          </BoxFlex>
        </BoxFlex>

        {/* Name */}
        <Form.Item name='name' label='ユーザー名' rules={[{ required: true }]}>
          <Input placeholder='ユーザー名' />
        </Form.Item>

        {/* Category */}
        <Form.Item name='category_id' label='Category' rules={[{ required: true }]}>
          <Select placeholder='Category' style={{ width: 220 }} onChange={(value) => searchPostCode('cate', value)} options={infoStore?.categories} />
        </Form.Item>

        {/* Prefectures */}
        <Form.Item name='prefectures' label='Prefectures' rules={[{ required: true }]}>
          <Select placeholder='Prefectures' style={{ width: 220 }} onChange={(value) => searchPostCode('city', value)} options={infoStore?.prefectures} />
        </Form.Item>

        {cities && cities?.length > 0 ? (
          <Form.Item name='cities' label='Cities' rules={[{ required: true }]}>
            <Select placeholder='Cities' style={{ width: 220 }} onChange={(value) => searchPostCode('town', value)} options={cities} />
          </Form.Item>
        ) : null}

        {towns && towns?.length > 0 ? (
          <Form.Item name='postal_code_id' label='Towns' rules={[{ required: true }]}>
            <Select placeholder='Towns' style={{ width: 220 }} onChange={(value) => searchPostCode('code', value)} options={towns} />
          </Form.Item>
        ) : null}

        {/* Address */}
        <Form.Item name='address' label='Address' rules={[{ required: true }]}>
          <Input placeholder='Address' />
        </Form.Item>

        {/* Phone */}
        <Form.Item name='phone' label='Phone' rules={[{ required: true, type: 'number' }]}>
          <InputNumber<number> placeholder='Phone' />
        </Form.Item>

        {/* Url */}
        <Form.Item name='url' label='Url' rules={[{ required: true, type: 'url' }]}>
          <Input placeholder='Url' type='url' />
        </Form.Item>

        {/* Comment */}
        <Form.Item name='comment' label='Comment' rules={[{ required: true }]}>
          <TextArea rows={4} placeholder='Comment' style={{ height: 'auto' }} />
        </Form.Item>

        {/* Upload files */}
        <Form.Item name='main_image' label='Images' rules={[{  }]}>
          <UploadFiles formRef={formRef} uploadRef={uploadRef} />
        </Form.Item>

        {/* List Images */}
        {/* <Form.Item name='sub_images[0]' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='sub_images[1]' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='sub_images[2]' hidden>
          <Input />
        </Form.Item> */}
      </Form>
    </>
  );
};

export default ComponentWrap(ManagerUser);
