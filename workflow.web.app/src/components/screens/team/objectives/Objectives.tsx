import OpenObjectives from "./OpenObjectives.tsx";
import {useGetObjectivesByUserQuery} from "../../../../store/apis/objective/objectiveApi.ts";
import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import './style.scss'
import CloseObjectives from "./CloseObjectives.tsx";

const Objectives = () => {
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

    return (
        <div className='objectives-tab-container'>
            <OpenObjectives objectives={openObjectives} loading={isLoading}/>
            <CloseObjectives objectives={closeObjectives} loading={isLoading}/>
        </div>
    );
};

export default Objectives;