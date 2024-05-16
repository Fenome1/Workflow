import {IAgency} from "../../../../../../features/models/IAgency.ts";
import {FC} from "react";
import {IUser} from "../../../../../../features/models/IUser.ts";
import {DeleteOutlined, EditOutlined, ProductFilled, ProductOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import DeleteAgencyModal from "./modals/modals/DeleteAgencyModal.tsx";
import UpdateAgencyModal from "./modals/modals/UpdateAgencyModal.tsx";
import SettingsAgencyModal from "./modals/SettingsAgencyModal.tsx";
import LeaveButton from "./LeaveButton.tsx";
import {message} from "antd";

interface AgencyItemProps {
    agency: IAgency
    currentUser: IUser | null
    isAgencyLast: boolean
}

const AgencyItem: FC<AgencyItemProps> = ({agency, currentUser, isAgencyLast}) => {

    const isOwnedAgency = currentUser?.userId === agency.ownerId;

    const deleteAgencyDialog = useDialog()
    const updateAgencyDialog = useDialog()
    const settingAgencyDialog = useDialog()

    const handleDelete = () => {
        if (isAgencyLast) {
            message.error("Не возможно удалить последнее агенство!")
            return
        }
        deleteAgencyDialog.show()
    }

    return (
        <>
            <div className='agency-dashboard-container' onClick={settingAgencyDialog.show}>
                <div className='agency-dashboard-header'>
                    {isOwnedAgency ? <ProductFilled className='agency-dashboard-icon'/> :
                        <ProductOutlined className='agency-dashboard-icon'/>}
                    <span className='agency-dashboard-name'>{agency.name}</span>
                </div>
                <div className='agency-dashboard-buttons'>
                    {isOwnedAgency ?
                        <>
                            <EditOutlined className='agency-dashboard-button' onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                updateAgencyDialog.show()
                            }}/>
                            <DeleteOutlined className='agency-dashboard-button-delete'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleDelete()
                                            }}/>
                        </> :
                        <>
                            <LeaveButton agency={agency} currentUser={currentUser}/>
                        </>}
                </div>

            </div>
            <DeleteAgencyModal agencyId={agency.agencyId} dialog={deleteAgencyDialog}/>
            <UpdateAgencyModal dialog={updateAgencyDialog} agency={agency}/>
            <SettingsAgencyModal agency={agency} dialog={settingAgencyDialog} currentUserId={currentUser?.userId}/>
        </>

    );
};

export default AgencyItem;