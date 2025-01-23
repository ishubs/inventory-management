import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setProducts, editProduct, deleteProduct, disableProduct, Product } from './slice';
import { fetchInventory } from '../../api/inventoryAPI';
import { useQuery } from '@tanstack/react-query';
import {
    DeleteFilled,
    DollarOutlined,
    EditFilled,
    EyeFilled,
    EyeInvisibleOutlined,
    PieChartOutlined,
    ShoppingCartOutlined,
    StrikethroughOutlined,
} from '@ant-design/icons';
import StatsCard from '../../components/StatsCard';
import { Table } from 'antd';
import EditProductModal from '../../components/EditProductModal';

const InventoryView: React.FC = () => {
    const dispatch = useDispatch();
    const { products, totalProducts, totalValue, outOfStockCount, totalCategories } = useSelector(
        (state: RootState) => state.inventory
    );
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    const [editingProductId, setEditingProductId] = useState<string>('');
    const [isEditProductVisible, setIsEditProductVisible] = useState<boolean>(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['inventory'],
        queryFn: fetchInventory,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            dispatch(setProducts(data));
        }
    }, [isLoading, data, dispatch]);

    const stats = useMemo(
        () => [
            { label: 'Total Products', icon: <ShoppingCartOutlined />, value: totalProducts },
            { label: 'Total Store Value', icon: <DollarOutlined />, value: totalValue },
            { label: 'Out of Stocks', icon: <StrikethroughOutlined />, value: outOfStockCount },
            { label: 'No. of Categories', icon: <PieChartOutlined />, value: totalCategories },
        ],
        [totalProducts, totalValue, outOfStockCount, totalCategories]
    );

    const handleEditClick = useCallback(
        (record: Product) => {
            if (!record.disabled && isAdmin) {
                setEditingProductId(record.id);
                setIsEditProductVisible(true);
            }
        },
        [isAdmin]
    );

    const handleDisableClick = useCallback(
        (record: Product) => {
            if (isAdmin) {
                dispatch(disableProduct(record.id));
            }
        },
        [isAdmin, dispatch]
    );

    const handleDeleteClick = useCallback(
        (record: Product) => {
            if (isAdmin) {
                dispatch(deleteProduct(record.id));
            }
        },
        [isAdmin, dispatch]
    );

    const columns = useMemo(
        () => [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Category', dataIndex: 'category', key: 'category' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            {
                title: 'Action',
                key: 'action',
                render: (_: any, record: Product) => (
                    <div className="flex gap-2 text-gray-400">
                        <EditFilled
                            className={`${!record.disabled && isAdmin ? 'cursor-pointer text-green-400' : 'disabled-icon'}`}
                            onClick={() => handleEditClick(record)}
                        />
                        {record.disabled ? (
                            <EyeInvisibleOutlined
                                onClick={() => handleDisableClick(record)}
                                className={isAdmin ? 'cursor-pointer' : 'disabled-icon'}
                            />
                        ) : (
                            <EyeFilled
                                className={`${isAdmin ? 'cursor-pointer text-pink-500' : 'disabled-icon'}`}
                                onClick={() => handleDisableClick(record)}
                            />
                        )}
                        <DeleteFilled
                            className={`${isAdmin ? 'cursor-pointer text-red-600' : 'disabled-icon'}`}
                            onClick={() => handleDeleteClick(record)}
                        />
                    </div>
                ),
            },
        ],
        [handleEditClick, handleDisableClick, handleDeleteClick, isAdmin]
    );

    const onSave = useCallback(
        (values: { id: string; category: string; price: string; quantity: number; value: string }) => {
            dispatch(editProduct({ id: values.id, updates: values }));
            setIsEditProductVisible(false);
        },
        [dispatch]
    );

    if (isLoading) return <div>Loading inventory data...</div>;
    if (error instanceof Error) return <div>Error loading inventory: {error.message}</div>;

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="my-4 text-4xl">Inventory Stats</h1>
            <div className="flex gap-4 my-4">
                {stats.map((stat) => (
                    <StatsCard key={stat.label} label={stat.label} icon={stat.icon} value={stat.value} />
                ))}
            </div>
            <EditProductModal
                visible={isEditProductVisible}
                onCancel={() => setIsEditProductVisible(false)}
                onSave={onSave}
                productId={editingProductId}
                productName={products.find((product) => product.id === editingProductId)?.name || 'Unknown Product'}
            />
            <Table rowClassName={(record) => (record.disabled ? 'disabled-row' : '')} columns={columns} dataSource={products} />
        </div>
    );
};

export default InventoryView;