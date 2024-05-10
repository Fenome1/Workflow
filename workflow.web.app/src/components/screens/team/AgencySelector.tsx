import {FC, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/hooks.ts";
import {useGetAgencyByUserQuery} from "../../../store/apis/agency/agencyApi.ts";
import {selectAgency} from "../../../store/slices/agencySlice.ts";
import {selectProject} from "../../../store/slices/projectSlice.ts";
import './style.scss'
import {IUser} from "../../../features/models/IUser.ts";
import SkeletonInput from "antd/es/skeleton/Input";

interface AgencySelectorProps {
    currentUser: IUser | null
}

const AgencySelector: FC<AgencySelectorProps> = ({currentUser}) => {
    const dispatch = useAppDispatch();
    const {data: agencies, isLoading} = useGetAgencyByUserQuery(currentUser?.userId ?? 0, {skip: currentUser === null});

    const selectedAgencyIdRedux = useTypedSelector((state) => state.agency?.selectedAgencyId);

    const handleAgencyChange = async (agencyId: number) => {
        await dispatch(selectAgency(agencyId));
        await dispatch(selectProject(null))
    };

    useEffect(() => {
        if (selectedAgencyIdRedux === null && agencies && agencies.length > 0) {
            dispatch(selectAgency(agencies[0]?.agencyId));
        }
    }, [dispatch, selectedAgencyIdRedux, agencies]);

    return (
        <> {isLoading ? (<SkeletonInput active/>) :
            <Form.Select value={selectedAgencyIdRedux || ''}
                         onChange={(e) =>
                             handleAgencyChange(parseInt(e.target.value))}>
                {agencies?.map((agency) => (
                    <option key={agency.agencyId} value={agency.agencyId}>
                        {agency.name}
                    </option>
                ))}
            </Form.Select>}
        </>
    );
};

export default AgencySelector;