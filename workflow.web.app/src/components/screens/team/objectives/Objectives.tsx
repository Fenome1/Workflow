import OpenObjectives from "./OpenObjectives.tsx";
import {useGetObjectivesByUserQuery} from "../../../../store/apis/objective/objectiveApi.ts";
import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import './style.scss'
import CloseObjectives from "./CloseObjectives.tsx";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {useDownloadUserObjectivesMutation} from "../../../../store/apis/export/exportApi.ts";

const Objectives = () => {
    const [downloadObjectives] = useDownloadUserObjectivesMutation()

    const {selectedAgencyId} = useTypedSelector((state) => state.agency);
    const {user} = useTypedSelector(state => state.user)

    const {data: objectives, isLoading} = useGetObjectivesByUserQuery({
        userId: user?.userId ?? 0,
        agencyId: selectedAgencyId ?? 0
    }, {
        skip: selectedAgencyId === null
    })

    const openObjectives = objectives?.filter(obj => !obj.status) || [];
    const closeObjectives = objectives?.filter(obj => obj.status) || [];

    const handleDownload = () => {
        if(!user)
            return

        downloadObjectives(user.userId)
    }

    return (
        <div className='objectives-tab-container'>
            <OpenObjectives objectives={openObjectives} loading={isLoading}/>
            <CloseObjectives objectives={closeObjectives} loading={isLoading}/>
            <Button type='link' icon={<DownloadOutlined/>}
                    className='export-user-objectives-button'
                    onClick={handleDownload}>Загрузить задачи</Button>
        </div>
    );
};

export default Objectives;