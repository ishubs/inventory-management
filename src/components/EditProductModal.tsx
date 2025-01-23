import React from 'react';
import { Modal, Input, Button, Form } from 'antd';

interface EditProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: { id: string, category: string; price: string; quantity: number; value: string }) => void;
    productId: string;
    productName: string;
}


const EditProductModal: React.FC<EditProductModalProps> = ({ visible, onCancel, onSave, productId, productName }) => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                values.id = productId;
                values.price = `$${values.price}`;
                values.value = `$${values.value}`;
                onSave(values);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleValuesChange = (changedValues: {
        category?: string;
        price?: number;
        quantity?: number;
        value?: number;
    }, allValues: {
        category: string;
        price: number;
        quantity: number;
        value: number;
    }) => {
        console.log(allValues);
        const { price, quantity } = allValues;
        if (price && quantity) {
            form.setFieldsValue({ value: price * quantity });
        }
    };

    return (
        <Modal
            title={<div className='text-4xl'>Edit product</div>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <h2 className="text-lg font-semibold text-gray-300 my-4">{`${productName}`}</h2>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    category: '',
                    price: '',
                    quantity: '',
                    value: '',
                }}
                onValuesChange={handleValuesChange}
            >
                <div className="flex justify-between gap-2">
                    <Form.Item
                        className="w-1/2"
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please input the category!' }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        className="w-1/2"
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input size="large" type="number" />
                    </Form.Item>
                </div>
                <div className="flex justify-between gap-2">
                    <Form.Item
                        className="w-1/2"
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <Input size="large" type="number" />
                    </Form.Item>
                    <Form.Item
                        className="w-1/2"
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Please input the value!' }]}
                    >
                        <Input disabled size="large" type="number" />
                    </Form.Item>
                </div>
                <div className='flex justify-end'>
                    <Form.Item>
                        <Button type='text' onClick={onCancel} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default EditProductModal;
