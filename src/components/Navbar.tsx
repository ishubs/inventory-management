import { Divider, Switch } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleAdmin } from '../module/user/slice';

export default function Navbar() {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    const handleToggle = () => {
        dispatch(toggleAdmin());
    };

    return (
        <div className="p-4 border-b-[#303030] border-b-[1px] flex w-full justify-end">
            <div className="flex gap-4">
                <div className="flex gap-2 justify-center items-center">
                    <div>admin</div>
                    <Switch checked={!isAdmin} onChange={handleToggle} />
                    <div>user</div>
                </div>
                <div>
                    <Divider type="vertical" />
                    <LogoutOutlined />
                </div>
            </div>
        </div>
    );
}
