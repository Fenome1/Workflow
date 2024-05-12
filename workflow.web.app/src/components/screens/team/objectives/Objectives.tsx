import {FC} from 'react';
import OpenObjectives from "./OpenObjectives.tsx";
import {IUser} from "../../../../features/models/IUser.ts";
import {useGetObjectivesByUserQuery} from "../../../../store/apis/objective/objectiveApi.ts";
import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import './style.scss'
import CloseObjectives from "./CloseObjectives.tsx";

interface ObjectivesProps {
    currentUser: IUser | null
}

const Objectives: FC<ObjectivesProps> = ({currentUser}) => {
    const selectedAgencyIdRedux = useTypedSelector((state) => state.agency?.selectedAgencyId);
    const {data: objectives, isLoading} = useGetObjectivesByUserQuery({
            userId: currentUser?.userId ?? 0,
            agencyId: selectedAgencyIdRedux
        },
        {skip: selectedAgencyIdRedux === null})

    const openObjectives = objectives?.filter(obj => !obj.status) || [];
    const closeObjectives = objectives?.filter(obj => obj.status) || [];

    return (
        <div className='objectives-tab-container'>
            <OpenObjectives objectives={openObjectives} loading={isLoading}/>
            <CloseObjectives objectives={closeObjectives} loading={isLoading}/>
        </div>
    );
};

export default Objectives;