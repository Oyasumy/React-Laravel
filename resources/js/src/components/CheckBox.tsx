import { Checkbox, CheckboxProps, Flex, Space } from 'antd';

type TCheckBox = {
  width?: number | string;
  height?: number | string;
  children: string | React.ReactNode;
} & CheckboxProps;
const CheckBox = ({ height = '30px', width = '100%', children, ...rest }: TCheckBox) => {
  return (
    <Flex className='checkBox' style={{ height, width }}>
      <Space>
        <Checkbox {...rest}>{children}</Checkbox>;
      </Space>
    </Flex>
  );
};
export default CheckBox;
